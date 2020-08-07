/* global process URL */

import Path from 'path';
import Glob from 'glob';
import FS from 'fs';
import YAML from 'js-yaml';
import dotenv from 'dotenv';
import _startCase from 'lodash/startCase.js';
import _uniq from 'lodash/uniq.js';
import _uniqBy from 'lodash/uniqBy.js';
import _mapValues from 'lodash/mapValues.js';
import _isArray from 'lodash/isArray.js';
import _sortBy from 'lodash/sortBy.js';
import _reverse from 'lodash/reverse.js';
import _startsWith from 'lodash/startsWith.js';
import omitNull from './utils/omitNull.js';
import { writeFiles, writeFilesForEach, writeFilesIndex } from './utils/writeFiles.js';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;
const appHost = process.env.APP_HOST || 'https://natureshare.org.au/';
const contentHost = process.env.CONTENT_HOST || 'https://files.natureshare.org.au/';

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const userUrl = (userDir) =>
    `${appHost}items?i=${encodeURIComponent(
        new URL(Path.join('.', userDir, '_index', 'items', 'index.json'), contentHost),
    )}`;

const idNames = (ary) =>
    _uniq(
        ary
            .map((i) => (typeof i === 'object' ? i.name : i))
            .filter((i) => typeof i === 'string')
            .map((i) => i.trim())
            .filter((i) => i.length !== 0),
    );

const loadItem = (userDir, f) => {
    const filePath = Path.join(userDir, 'items', f);

    const {
        datetime,
        created_at: createdAt,
        updated_at: updatedAt,
        id: identifications,
        description,
        photos,
        videos,
        audio,
        latitude,
        longitude,
        tags,
        collections,
    } = YAML.safeLoad(FS.readFileSync(Path.join(cwd, filePath)));

    const id = new URL(Path.join('.', filePath), contentHost).href;

    const url = `${appHost}item?i=${encodeURIComponent(id)}`;

    const title =
        (_isArray(identifications) &&
            ((identifications.length > 2 && `${identifications.length} species`) ||
                idNames(identifications).join(', '))) ||
        'Unidentified';

    const image =
        photos && photos.length !== 0
            ? (photos.filter((i) => i.primary)[0] || photos[0]).thumbnail_url
            : null;

    const item = omitNull({
        id,
        url,
        title,
        content_text: description || '-',
        image,
        date_published: createdAt,
        date_modified: updatedAt,
        tags: [
            ...(_isArray(identifications) && identifications.length !== 0
                ? _uniq(idNames(identifications))
                      .sort()
                      .map((i) => `id=${i}`)
                : ['id=Unidentified']),
            ...(_isArray(tags) && tags.length !== 0
                ? _uniq(tags)
                      .sort()
                      .map((i) => `tag=${i}`)
                : []),
        ],
        _geo: {
            coordinates: coord([longitude, latitude]),
        },
        _meta: omitNull({
            date: (datetime && datetime.split('T')[0]) || null,
            imageCount: (photos && photos.length) || null,
            videoCount: (videos && videos.length) || null,
            audioCount: (audio && audio.length) || null,
        }),
    });

    return { item, collections };
};

const dirStr = (i) => i.toLowerCase().replace(/\s/g, '_');

const sortFeedItems = (items) =>
    _reverse(
        _sortBy(items, [
            (i) => (i._meta && i._meta.featured ? 1 : 0),
            'date_published',
            'date_modified',
        ]),
    );

const pushTags = (collection, tags) => {
    if (tags && tags.length !== 0) collection.tags = _uniq(collection.tags.concat(tags));
};

const build = (userDir) => {
    console.log(userDir);

    const itemsDir = Path.join(cwd, userDir, 'items');
    const collectionsDir = Path.join(cwd, userDir, 'collections');

    if (FS.existsSync(itemsDir)) {
        const feedItems = [];
        const collectionsIndex = {};

        // Load collection meta-data:

        Glob.sync(Path.join('*.yaml'), { cwd: collectionsDir }).forEach((f) => {
            const name = f.replace(/\.yaml$/, '');

            const meta = YAML.safeLoad(FS.readFileSync(Path.join(collectionsDir, f)));

            collectionsIndex[name] = {
                title: meta.title || _startCase(name),
                description: (meta.description || '').slice(0, 1000),
                latitude: meta.latitude,
                longitude: meta.longitude,
                featured: meta.featured,
                extraItems: _uniq(meta.extra_items || []),
                members: _uniq((meta.admins || []).concat(meta.members || [])).filter(
                    (m) => m !== userDir,
                ),
                items: [],
                tags: [],
            };
        });

        // Load each item:

        Glob.sync(Path.join('*', '*', '*.yaml'), { cwd: itemsDir }).forEach((f) => {
            const { item, collections } = loadItem(userDir, f);

            feedItems.push(item);

            if (collections) {
                collections.forEach((i) => {
                    if (collectionsIndex[i] === undefined) {
                        collectionsIndex[i] = {
                            title: _startCase(i),
                            extraItems: [],
                            members: [],
                            items: [],
                            tags: [],
                        };
                    }

                    const itemWithAuthor = {
                        ...item,
                        author: {
                            name: userDir,
                            url: userUrl(userDir),
                        },
                    };

                    collectionsIndex[i].items.push(itemWithAuthor);

                    pushTags(collectionsIndex[i], item.tags);
                });
            }
        });

        // Items:

        writeFiles({
            userDir,
            subDir: 'items',
            _title: 'Items',
            feedItems: sortFeedItems(feedItems),
        });

        // User's collection items, one file for each collection:

        writeFilesForEach({
            index: _mapValues(collectionsIndex, (i) => sortFeedItems(i.items)),
            userDir,
            subDirCb: (i) => Path.join('collections', dirStr(i)),
            titleCb: (i) => collectionsIndex[i].title,
            descriptionCb: (i) => collectionsIndex[i].description,
        });

        // Aggregate collection items, one file for each collection:

        Object.keys(collectionsIndex).forEach((c) => {
            // Load in extra items manually added to the YAML file:

            collectionsIndex[c].extraItems.forEach((e) => {
                const [u, , ...f] = e.split(Path.sep);
                const { item } = loadItem(u, `${Path.join(...f)}.yaml`);

                item.author = {
                    name: u,
                    url: userUrl(u),
                };

                collectionsIndex[c].items.push(item);

                pushTags(collectionsIndex[c], item.tags);
            });

            // Load in item indexes for each member:

            collectionsIndex[c].members.forEach((m) => {
                let page = 1;
                let pageCount = 1;
                do {
                    const f = Path.join(
                        cwd,
                        m,
                        '_index',
                        'collections',
                        c,
                        `index${page === 1 ? '' : `_${page}`}.json`,
                    );
                    if (FS.existsSync(f)) {
                        if (page !== 1) console.log('--> page: ', page);
                        const memberFeed = JSON.parse(FS.readFileSync(f));
                        memberFeed.items.forEach((item) => {
                            collectionsIndex[c].items.push(item);
                            pushTags(collectionsIndex[c], item.tags);
                        });
                        pageCount = memberFeed.pageCount;
                    }
                    page += 1;
                } while (page <= pageCount);
            });

            collectionsIndex[c].items = sortFeedItems(_uniqBy(collectionsIndex[c].items, 'id'));

            // Aggregate index:

            writeFiles({
                userDir,
                subDir: Path.join('collections', dirStr(c), 'aggregate'),
                feedItems: collectionsIndex[c].items,
                _title: collectionsIndex[c].title,
                _description: collectionsIndex[c].description,
            });
        });

        // Index of all collections (this must be AFTER aggregation for accurate counts):

        writeFilesIndex({
            index: _mapValues(collectionsIndex, 'items'),
            userDir,
            subDir: 'collections',
            _title: 'Collections',
            metaCb: (i) => {
                const filePath = Path.join(
                    userDir,
                    '_index',
                    'collections',
                    dirStr(i),
                    'aggregate',
                    'index.json',
                );
                const id = new URL(Path.join('.', filePath), contentHost).href;
                return omitNull({
                    id,
                    url: `${appHost}items?i=${encodeURIComponent(id)}`,
                    title: collectionsIndex[i].title,
                    _geo: omitNull({
                        coordinates: coord([
                            collectionsIndex[i].longitude,
                            collectionsIndex[i].latitude,
                        ]),
                    }),
                    _meta: omitNull({
                        featured: collectionsIndex[i].featured || null,
                        idCount: collectionsIndex[i].tags.filter((t) => _startsWith(t, 'id='))
                            .length,
                        tagCount: collectionsIndex[i].tags.filter((t) => _startsWith(t, 'tag='))
                            .length,
                    }),
                });
            },
        });
    }
};

if (process.argv.length === 3) {
    build(process.argv[2]);
} else {
    Glob.sync('*', { cwd })
        .filter((f) => f !== '_index' && FS.lstatSync(Path.join(cwd, f)).isDirectory())
        .slice(0, 100000)
        .forEach(build);
}

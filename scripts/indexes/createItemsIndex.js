/* global process URL */

import Path from 'path';
import Glob from 'glob';
import FS from 'fs';
import MkDir from 'mkdirp';
import YAML from 'js-yaml';
import dotenv from 'dotenv';
import _startCase from 'lodash/startCase.js';
import _uniq from 'lodash/uniq.js';
import _mapValues from 'lodash/mapValues.js';
import _isArray from 'lodash/isArray.js';
import omitNull from './utils/omitNull.js';
import { writeFiles, writeFilesForEach, writeFilesIndex } from './utils/writeFiles.js';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;
const appName = process.env.APP_NAME || 'NatureShare';
const appHost = process.env.APP_HOST || 'https://natureshare.org.au';
const contentHost = process.env.CONTENT_HOST;

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const userUrl = (userDir) =>
    `${appHost}profile?i=${encodeURIComponent(
        new URL(Path.join('.', userDir, 'profile.yaml'), contentHost),
    )}`;

const idNames = (ary) =>
    _uniq(
        ary
            .map((i) => (typeof i === 'object' ? i.name : i))
            .filter((i) => typeof i === 'string')
            .map(
                (i) => i.split('/', 1)[0], // Binomial Name / Commmon Name
            )
            .filter(Boolean)
            .map((i) => i.trim()),
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

    const id = new URL(Path.join('.', filePath).replace(/\.yaml$/, ''), contentHost).href;

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
        tags: tags && tags.length !== 0 ? _uniq(tags) : null,
        _meta: omitNull({
            ids: _isArray(identifications) && idNames(identifications),
            date: (datetime && datetime.split('T')[0]) || null,
            imageCount: (photos && photos.length) || null,
            videoCount: (videos && videos.length) || null,
            audioCount: (audio && audio.length) || null,
            coordinates: coord([longitude, latitude]),
        }),
    });

    return { item, collections };
};

const push = (obj, k, i) => {
    if (obj[k] === undefined) obj[k] = [];
    obj[k].push(i);
};

const identificationsSubDir = (i) =>
    Path.join(
        'ids',
        i[0].toLowerCase(),
        i.split(' ', 1)[0].toLowerCase(),
        i.replace(/\//g, '~').replace(/\./g, ''),
    );

const build = (userDir) => {
    console.log(userDir);

    const itemsDir = Path.join(cwd, userDir, 'items');

    if (FS.existsSync(itemsDir)) {
        const feedItems = [];
        const collectionsIndex = {};
        const idIndex = {};
        const tagsIndex = {};

        Glob.sync(Path.join('**', '*.yaml'), { cwd: itemsDir }).forEach((f) => {
            const { item, collections } = loadItem(userDir, f);

            feedItems.push(item);

            if (item._meta.ids) {
                item._meta.ids.forEach((k) => push(idIndex, k, item));
            }

            if (item.tags) {
                item.tags.forEach((k) => push(tagsIndex, k, item));
            }

            if (collections) {
                collections.forEach((i) => {
                    if (collectionsIndex[i] === undefined) {
                        const collectionPath = Path.join(cwd, userDir, 'collections', `${i}.yaml`);

                        const meta = FS.existsSync(collectionPath)
                            ? YAML.safeLoad(FS.readFileSync(collectionPath))
                            : {};

                        collectionsIndex[i] = {
                            title: meta.title || _startCase(i),
                            description: (meta.description || '').slice(0, 1000),
                            image: meta.thumbnail_url, // todo
                            latitude: meta.latitude,
                            longitude: meta.longitude,
                            featured: meta.featured,
                            extraItems: _uniq(meta.extra_items || []),
                            members: _uniq((meta.admins || []).concat(meta.members || [])).filter(
                                (m) => m !== userDir,
                            ),
                            items: [],
                            idIndex: {},
                            tagsIndex: {},
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

                    if (item._meta.ids) {
                        idNames(item._meta.ids).forEach((k) =>
                            push(collectionsIndex[i].idIndex, k, item),
                        );
                    }

                    if (item.tags) {
                        item.tags
                            .filter(Boolean)
                            .forEach((k) => push(collectionsIndex[i].tagsIndex, k, item));
                    }
                });
            }
        });

        // Items:

        writeFiles({
            userDir,
            subDir: 'items',
            appView: 'items',
            _title: 'Items',
            feedItems,
        });

        // Identifications:

        writeFilesForEach({
            index: idIndex,
            userDir,
            subDirCb: identificationsSubDir,
            appView: 'id',
        });

        writeFilesIndex({
            index: idIndex,
            userDir,
            subDir: 'ids',
            appView: 'ids',
            _title: 'Identifications',
            metaCb: (i) => {
                const filePath = Path.join(userDir, '_index', identificationsSubDir(i));
                const id = new URL(Path.join('.', filePath), contentHost).href;
                return {
                    id,
                    url: `${appHost}id?i=${encodeURIComponent(id)}`,
                };
            },
        });

        // Tags:

        writeFilesForEach({
            index: tagsIndex,
            userDir,
            subDirCb: (i) => Path.join('tags', i),
            appView: 'tag',
        });

        writeFilesIndex({
            index: tagsIndex,
            userDir,
            subDir: 'tags',
            appView: 'tags',
            _title: 'Tags',
            metaCb: (i) => {
                const filePath = Path.join(userDir, '_index', 'tags', i);
                const id = new URL(Path.join('.', filePath), contentHost).href;
                return {
                    id,
                    url: `${appHost}tag?i=${encodeURIComponent(id)}`,
                };
            },
        });

        // User's collection items, one file for each collection:

        writeFilesForEach({
            index: _mapValues(collectionsIndex, 'items'),
            userDir,
            subDirCb: (i) => Path.join('collections', i),
            appView: 'collection',
            titleCb: (i) => collectionsIndex[i].title,
            descriptionCb: (i) => collectionsIndex[i].description,
        });

        // Aggregate collection items, one file for each collection:

        Object.keys(collectionsIndex).forEach((c) => {
            // Load in extra items manually added to the YAML file:

            collectionsIndex[c].extraItems.forEach((e) => {
                const [u, , ...f] = e.split(Path.sep);
                if (u !== userDir) {
                    const { item } = loadItem(u, `${Path.join(...f)}.yaml`);

                    item.author = {
                        name: u,
                        url: userUrl(u),
                    };

                    collectionsIndex[c].items.push(item);

                    if (item._meta.ids) {
                        item._meta.ids.forEach((k) => push(collectionsIndex[c].idIndex, k, item));
                    }

                    if (item.tags) {
                        item.tags.forEach((k) => push(collectionsIndex[c].tagsIndex, k, item));
                    }
                }
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

                            if (item._meta.ids) {
                                item._meta.ids.forEach((k) =>
                                    push(collectionsIndex[c].idIndex, k, item),
                                );
                            }

                            if (item.tags) {
                                item.tags.forEach((k) =>
                                    push(collectionsIndex[c].tagsIndex, k, item),
                                );
                            }
                        });
                        pageCount = memberFeed.pageCount;
                    }
                    page += 1;
                } while (page <= pageCount);
            });

            // Aggregate indexes:

            writeFiles({
                userDir,
                subDir: Path.join('collections', c, 'aggregate'),
                appView: 'collection',
                feedItems: collectionsIndex[c].items,
                _title: collectionsIndex[c].title,
                _description: collectionsIndex[c].description,
            });

            // Identifications:

            writeFilesForEach({
                index: collectionsIndex[c].idIndex,
                userDir,
                subDirCb: (i) => Path.join('collections', c, 'aggregate', identificationsSubDir(i)),
                appView: 'id',
                titleCb: (i) => `${collectionsIndex[c].title} / ${i}`,
            });

            writeFilesIndex({
                index: collectionsIndex[c].idIndex,
                userDir,
                subDir: Path.join('collections', c, 'aggregate', 'ids'),
                appView: 'ids',
                _title: `${collectionsIndex[c].title} / Identifications`,
                metaCb: (i) => {
                    const filePath = Path.join(
                        userDir,
                        '_index',
                        'collections',
                        c,
                        'aggregate',
                        identificationsSubDir(i),
                    );
                    const id = new URL(Path.join('.', filePath), contentHost).href;
                    return {
                        id,
                        url: `${appHost}id?i=${encodeURIComponent(id)}`,
                    };
                },
            });

            // Tags:

            writeFilesForEach({
                index: collectionsIndex[c].tagsIndex,
                userDir,
                subDirCb: (i) => Path.join('collections', c, 'aggregate', 'tags', i),
                appView: 'tag',
                titleCb: (i) => `${collectionsIndex[c].title} / ${i}`,
            });

            writeFilesIndex({
                index: collectionsIndex[c].tagsIndex,
                userDir,
                subDir: Path.join('collections', c, 'aggregate', 'tags'),
                appView: 'tags',
                _title: `${collectionsIndex[c].title} / Tags`,
                metaCb: (i) => {
                    const filePath = Path.join(
                        userDir,
                        '_index',
                        'collections',
                        c,
                        'aggregate',
                        'tags',
                        i,
                    );
                    const id = new URL(Path.join('.', filePath), contentHost).href;
                    return {
                        id,
                        url: `${appHost}tag?i=${encodeURIComponent(id)}`,
                    };
                },
            });
        });

        // Index of all collections (this must be AFTER aggregation for accurate counts):

        writeFilesIndex({
            index: _mapValues(collectionsIndex, 'items'),
            userDir,
            subDir: 'collections',
            appView: 'collections',
            _title: 'Collections',
            metaCb: (i) => {
                const filePath = Path.join(userDir, '_index', 'collections', i, 'aggregate');
                const id = new URL(Path.join('.', filePath), contentHost).href;
                return omitNull({
                    id,
                    url: `${appHost}tag?i=${encodeURIComponent(id)}`,
                    title: collectionsIndex[i].title,
                    _meta: omitNull({
                        featured: collectionsIndex[i].featured || null,
                        idCount: Object.keys(collectionsIndex[i].idIndex).length,
                        tagCount: Object.keys(collectionsIndex[i].tagsIndex).length,
                        coordinates: coord([
                            collectionsIndex[i].longitude,
                            collectionsIndex[i].latitude,
                        ]),
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

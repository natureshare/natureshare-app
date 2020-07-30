/* global process URL */

import Path from 'path';
import MkDir from 'mkdirp';
import jsonschema from 'jsonschema';
import dotenv from 'dotenv';
import FS from 'fs';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';
import _startCase from 'lodash/startCase.js';
import _sortBy from 'lodash/sortBy.js';
import _reverse from 'lodash/reverse.js';
import _range from 'lodash/range.js';
import omitNull from './omitNull.js';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;
const appName = process.env.APP_NAME || 'NatureShare';
const appHost = process.env.APP_HOST || 'https://natureshare.org.au';
const contentHost = process.env.CONTENT_HOST;

const validator = new jsonschema.Validator();
const geoSchema = JSON.parse(FS.readFileSync('./scripts/schemas/geo.json'));
const feedSchema = JSON.parse(FS.readFileSync('./scripts/schemas/feed.json'));

const validate = (obj, schema) => {
    const result = validator.validate(obj, schema, { throwError: false });
    if (result.errors && result.errors.length !== 0) {
        ['property', 'message', 'instance', 'schema'].forEach((i) =>
            console.log(JSON.stringify(result.errors[0][i], null, 4)),
        );
        throw new Error('Failed validation!');
    }
};

const getFirst = (ary, prop) => {
    try {
        return ary.filter((x) => x[prop])[0][prop];
    } catch (e) {
        return null;
    }
};

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const average = (ary) => ary.reduce((a, b) => a + b, 0) / ary.length;

export const averageCoord = (items) => {
    const coordAry = items.map((i) => i._meta.coordinates).filter(Boolean);

    return coord([average(coordAry.map((i) => i[0])), average(coordAry.map((i) => i[1]))]);
};

const PER_PAGE = 1000;

export const writeFiles = ({
    userDir,
    subDir,
    appView,
    feedItems,
    _title,
    _description,
    _homePageUrl,
    _userUrl,
}) => {
    const fileDir = Path.join(userDir, '_index', subDir);
    const feedUrl = new URL(Path.join('.', fileDir, 'index.json'), contentHost).href;
    const homePageUrl = `${appHost}${appView}?i=${encodeURIComponent(
        new URL('.', feedUrl).href.replace(/\/$/, ''),
    )}`;
    const userUrl = `${appHost}profile?i=${encodeURIComponent(
        new URL(Path.join('.', userDir), contentHost).href,
    )}`;

    const feedItemsSorted = _reverse(
        _sortBy(feedItems, [
            (i) => (i._meta && i._meta.featured ? 1 : 0),
            'date_published',
            '_meta.itemCount',
            'date_modified',
        ]),
    );

    MkDir.sync(Path.join(cwd, fileDir));

    _range(1, Math.ceil(feedItemsSorted.length / PER_PAGE) + 1).forEach((page) => {
        const fileName = `index${page === 1 ? '' : `_${page}`}`;

        const feed = {
            version: 'https://jsonfeed.org/version/1',
            title: _title || fileDir,
            description: _description || '',
            author: {
                name: userDir,
                url: _userUrl || userUrl,
            },
            home_page_url: _homePageUrl || homePageUrl,
            feed_url: feedUrl,
            next_url: new URL(Path.join('.', fileDir, `index_${page + 1}.json`), contentHost).href,
            items: feedItemsSorted.slice((page - 1) * PER_PAGE, page * PER_PAGE),
            _meta: {
                itemCount: feedItems.length,
                pageNumber: page,
                pageCount: Math.ceil(feedItems.length / PER_PAGE),
            },
        };

        if (page === 1) {
            validate(feed, feedSchema);
        }

        FS.writeFileSync(
            Path.join(cwd, fileDir, `${fileName}.json`),
            JSON.stringify(feed, null, 1),
        );

        FS.writeFileSync(
            Path.join(cwd, fileDir, `${fileName}.rss.xml`),
            jsonfeedToRSS(feed, {
                feedURLFn: (feedURL, jf) => feedURL.replace(/\.json\b/, '.rss.xml'),
            }),
        );

        FS.writeFileSync(
            Path.join(cwd, fileDir, `${fileName}.atom.xml`),
            jsonfeedToAtom(feed, {
                feedURLFn: (feedURL, jf) => feedURL.replace(/\.json\b/, '.atom.xml'),
            }),
        );
    });

    if (feedItems.length !== 0) {
        const geo = {
            type: 'FeatureCollection',
            features: feedItems
                .filter(({ _meta }) => _meta.coordinates)
                .map(({ id, url, title: itemTitle, image, _meta }) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: _meta.coordinates,
                    },
                    properties: omitNull({
                        id,
                        url,
                        date: _meta.date,
                        title: itemTitle,
                        image,
                    }),
                })),
        };

        validate(geo, geoSchema);

        FS.writeFileSync(Path.join(cwd, fileDir, 'index.geo.json'), JSON.stringify(geo, null, 1));
    }
};

export const writeFilesForEach = ({ index, userDir, subDirCb, appView, titleCb, descriptionCb }) =>
    Object.keys(index).forEach((i) => {
        writeFiles({
            userDir,
            subDir: subDirCb(i),
            appView,
            feedItems: index[i],
            _title: (titleCb && titleCb(i)) || i,
            _description: descriptionCb && descriptionCb(i),
        });
    });

export const writeFilesIndex = ({ index, userDir, subDir, appView, _title, metaCb }) =>
    writeFiles({
        userDir,
        subDir,
        appView,
        _title,
        feedItems: Object.keys(index).map((i) => {
            const { _meta, ...mixin } = metaCb ? metaCb(i) : {};
            return omitNull({
                title: i.replace(/_/g, ' '),
                content_text: `${index[i].length} items`,
                image: getFirst(index[i], 'image'),
                date_published: getFirst(index[i], 'date_published'),
                date_modified: getFirst(index[i], 'date_published'),
                _meta: {
                    itemCount: index[i].length,
                    date: getFirst(index[i], 'date_published').split('T', 1)[0],
                    coordinates: averageCoord(index[i]),
                    ...(_meta || {}),
                },
                ...mixin,
            });
        }),
    });

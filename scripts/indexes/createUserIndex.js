/* global process URL */

import Path from 'path';
import Glob from 'glob';
import FS from 'fs';
import YAML from 'js-yaml';
import MkDir from 'mkdirp';
import dotenv from 'dotenv';
import _sortBy from 'lodash/sortBy.js';
import _reverse from 'lodash/reverse.js';
import _pickBy from 'lodash/pickBy.js';
import Moment from 'moment';
import { writeFiles, averageCoord } from './utils/writeFiles.js';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;
const appName = process.env.APP_NAME || 'NatureShare';
const appHost = process.env.APP_HOST || 'https://natureshare.org.au';
const contentHost = process.env.CONTENT_HOST;

const items = [];

Glob.sync(Path.join('*'), { cwd })
    .filter((f) => f !== '_index' && FS.lstatSync(Path.join(cwd, f)).isDirectory())
    .slice(0, 100000)
    .forEach((username) => {
        const filePath = Path.join(username, 'profile.yaml');

        if (!FS.existsSync(Path.join(cwd, filePath))) {
            console.log(username);
            console.log(' --> Profile not found!');
        } else {
            const profile = YAML.safeLoad(FS.readFileSync(Path.join(cwd, filePath)));

            const id = new URL(Path.join('.', username), contentHost).href;

            let image = null;
            let datePublished = (profile.joined
                ? Moment([parseInt(profile.joined, 10), 0, 1, 0, 0, 0])
                : Moment()
            ).toISOString(true);
            let dateModified = datePublished;
            let itemCount = 0;
            let coordinates = null;

            const indexFile = Path.join(cwd, username, '_index', 'items', 'index.json');

            if (FS.existsSync(indexFile)) {
                const { items: recentItems, _meta: meta } = JSON.parse(FS.readFileSync(indexFile));
                datePublished = recentItems[0].date_published;
                dateModified = recentItems[0].date_modified;
                image = (recentItems.filter((i) => i.image)[0] || {}).image;
                itemCount = (meta && meta.itemCount) || 0;
                coordinates = averageCoord(recentItems);
            }

            items.push(
                _pickBy(
                    {
                        id,
                        url: `${appHost}profile?i=${encodeURIComponent(id)}`,
                        title: profile.name || username,
                        image,
                        content_text: (profile.bio || '-').slice(0, 255),
                        date_published: datePublished,
                        date_modified: dateModified,
                        _meta: _pickBy(
                            {
                                itemCount,
                                date: (dateModified && dateModified.split('T', 1)[0]) || null,
                                coordinates,
                            },
                            Boolean,
                        ),
                    },
                    Boolean,
                ),
            );
        }
    });

writeFiles({
    userDir: appName,
    subDir: '../..', // bit of hack
    appView: 'profile',
    feedItems: items,
    _title: appName,
    _homePageUrl: appHost,
    _userUrl: appHost,
});

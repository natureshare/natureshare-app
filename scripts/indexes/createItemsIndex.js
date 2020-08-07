/* global process */

import Path from 'path';
import Glob from 'glob';
import FS from 'fs';
import dotenv from 'dotenv';
import _startCase from 'lodash/startCase.js';
import _pickBy from 'lodash/pickBy.js';
import _mapValues from 'lodash/mapValues.js';
import { writeFiles, writeFilesForEach } from './utils/writeFiles.js';
import loadItem from './utils/loadItem.js';
import { userUrl, dirStr, sortFeedItems } from './utils/utils.js';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;

const build = (userDir) => {
    console.log(userDir);

    const itemsDir = Path.join(cwd, userDir, 'items');

    if (FS.existsSync(itemsDir)) {
        const feedItems = [];
        const collectionsIndex = {};

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
            index: _pickBy(
                _mapValues(collectionsIndex, (i) => sortFeedItems(i.items)),
                (i) => i.length !== 0,
            ),
            userDir,
            subDirCb: (i) => Path.join('collections', dirStr(i)),
            titleCb: (i) => collectionsIndex[i].title,
            descriptionCb: (i) => collectionsIndex[i].description,
        });
    }
};

if (process.argv.length === 3) {
    build(process.argv[2]);
} else {
    Glob.sync('*', { cwd })
        .filter(
            (f) =>
                f !== '_index' && f !== '_scripts' && FS.lstatSync(Path.join(cwd, f)).isDirectory(),
        )
        .slice(0, 100000)
        .forEach(build);
}

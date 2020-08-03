/* global process URL */

import path from 'path';
import glob from 'glob';
import fs from 'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fetch from 'isomorphic-unfetch';
import yaml from 'js-yaml';
import _sortBy from 'lodash/sortBy.js';
import jsonschema from 'jsonschema';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';

dotenv.config();

const cwd = process.env.CONTENT_FILE_PATH;
const apiHost = process.env.API_HOST;
const contentHost = process.env.CONTENT_HOST;

const validator = new jsonschema.Validator();
const feedSchema = JSON.parse(fs.readFileSync('./scripts/schemas/feed.json'));

const actions = {
    itemComment: ({ id, date_published: date, author, _meta: meta, content_text: yamlText }) => {
        const { comment } = yaml.safeLoad(yamlText);
        const { name: sender } = author;
        const { recipient, target } = meta;
        if (comment) {
            const targetFile = path.join(cwd, new URL(target).pathname);
            if (fs.existsSync(targetFile)) {
                console.log('--> file exists');
                const item = yaml.safeLoad(fs.readFileSync(targetFile));
                item.comments = (item.comments || []).filter((i) => i.ref !== id);
                item.comments.push({
                    ref: id,
                    created_at: date,
                    username: sender,
                    text: comment,
                });
                item.comments = _sortBy(item.comments, 'created_at');
                fs.writeFileSync(
                    targetFile,
                    yaml.safeDump(item, {
                        lineWidth: 1000,
                        noRefs: true,
                        sortKeys: false,
                        skipInvalid: true,
                    }),
                );
            }
        }
    },
};

const run = async () => {
    const response = await fetch(new URL('/actions', apiHost).href);
    if (response.ok) {
        const feed = await response.json();

        feed.feed_url = new URL(path.join('.', 'actions.json'), contentHost).href;

        validator.validate(feed, feedSchema, { throwError: true });

        fs.writeFileSync(path.join(cwd, 'updates.json'), JSON.stringify(feed, null, 1));

        fs.writeFileSync(
            path.join(cwd, 'updates.rss.xml'),
            jsonfeedToRSS(feed, {
                feedURLFn: (feedURL, jf) => feedURL.replace(/\.json\b/, '.rss.xml'),
            }),
        );

        fs.writeFileSync(
            path.join(cwd, 'updates.atom.xml'),
            jsonfeedToAtom(feed, {
                feedURLFn: (feedURL, jf) => feedURL.replace(/\.json\b/, '.atom.xml'),
            }),
        );

        feed.items.forEach((item) => {
            console.log('action:', item.title);

            if (Object.keys(actions).includes(item.title)) {
                console.log('id:', item.id);
                console.log('author:', item.author.name);
                console.log('recipient:', item._meta.recipient);
                console.log('target:', item._meta.target);
                console.log('data:', item.content_text.trim());

                actions[item.title](item);

                console.log('---');
            }
        });
    }
};

run()
    .then(() => console.log('Done.'))
    .catch((err) => console.error(err));

/* global process URL */

import dotenv from 'dotenv';
import Path from 'path';
import _sortBy from 'lodash/sortBy.js';
import _reverse from 'lodash/reverse.js';

dotenv.config();

const appHost = process.env.APP_HOST || 'https://natureshare.org.au/';
const contentHost = process.env.CONTENT_HOST || 'https://files.natureshare.org.au/';

export const userUrl = (userDir) =>
    `${appHost}items?i=${encodeURIComponent(
        new URL(Path.join('.', userDir, '_index', 'items', 'index.json'), contentHost),
    )}`;

export const dirStr = (i) => i.toLowerCase().replace(/\s/g, '_');

export const sortFeedItems = (items) =>
    _reverse(
        _sortBy(items, [
            (i) => (i._meta && i._meta.featured ? 1 : 0),
            'date_published',
            'date_modified',
        ]),
    );

export const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

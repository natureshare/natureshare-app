/* global URL */

import YAML from 'js-yaml';

const opt = {
    cache: 'default',
    credentials: 'omit',
    mode: 'cors',
};

// TODO Load this dynamically:
const whitelist = [
    'files.natureshare.org.au',
    'files.natureshare.localhost',
    'species.natureshare.org.au',
    'species.natureshare.localhost',
    'natureshare.localhost:3000',
];

export const resolveUrl = (src, host) => {
    try {
        const url = host ? new URL(src, host) : new URL(src);
        if (whitelist.includes(url.host)) {
            return url.href;
        }
    } catch (e) {
        // console.error('resolveUrl', src, host);
    }
    return null;
};

const wrapper = (src, host, cb) =>
    new Promise((resolve) => {
        if (window && typeof window === 'object') {
            const url = resolveUrl(src, host);
            if (url) {
                window
                    .fetch(url, opt)
                    .then((response) => {
                        if (response.ok) {
                            cb(response, resolve);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch(() => resolve(false));
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    });

export const fetchJson = (src, host) =>
    wrapper(src, host, (response, resolve) =>
        response
            .json()
            .then((obj) => resolve(obj))
            .catch(() => resolve(false)),
    );

export const fetchYaml = (src, host) =>
    wrapper(src, host, (response, resolve) =>
        response
            .text()
            .then((yaml) => {
                if (yaml && yaml.length !== 0) {
                    try {
                        resolve(YAML.safeLoad(yaml));
                    } catch (e) {
                        resolve(false);
                    }
                }
            })
            .catch(() => resolve(false)),
    );

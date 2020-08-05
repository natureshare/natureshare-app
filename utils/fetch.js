/* eslint-disable no-console */
/* global URL process */

import YAML from 'js-yaml';

const opt = {
    cache: 'default',
    credentials: 'omit',
    mode: 'cors',
};

const whitelist = [
    process.env.contentHost,
    process.env.contentHostDev,
    process.env.speciesHost,
    process.env.speciesHostDev,
    ...(process.env.externalHosts ? process.env.externalHosts.split(',') : []),
]
    .filter(Boolean)
    .map((i) => new URL(i).host);

export const resolveUrl = (src, host, fixHost) => {
    if (fixHost !== false && (process.env.contentHostDev || process.env.speciesHostDev)) {
        return resolveUrl(
            src
                .replace(process.env.contentHost, process.env.contentHostDev)
                .replace(process.env.speciesHost, process.env.speciesHostDev),
            host
                ? host
                      .replace(process.env.contentHost, process.env.contentHostDev)
                      .replace(process.env.speciesHost, process.env.speciesHostDev)
                : undefined,
            false,
        );
    }
    try {
        const url = host ? new URL(src, host) : new URL(src);
        if (whitelist.includes(url.host)) {
            return url.href;
        }
        if (console) console.error('Host not in whitelist:', url.host);
    } catch (e) {
        if (console) console.error('resolveUrl', src, host);
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

export const shortUrl = (url) =>
    url
        ? url
              .replace(process.env.contentHostDev, './')
              .replace(process.env.contentHost, './')
              .replace(/\/$/, '')
        : url;

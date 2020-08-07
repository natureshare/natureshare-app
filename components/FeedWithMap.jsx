/* global URLSearchParams process */
/* eslint-disable react/no-array-index-key */
import Box from '@material-ui/core/Box';
import { useState, useEffect, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Head from 'next/head';
import _lines from 'underscore.string/lines';
import _startsWith from 'lodash/startsWith';
import _mapValues from 'lodash/mapValues';
import Pagination from '@material-ui/lab/Pagination';
import { resolveUrl, fetchJson, shortUrl } from '../utils/fetch';
import FeedItemsGrid from './FeedItemsGrid';
import GeoJsonMap from './GeoJsonMap';
import Layout from './Layout';
import { H1, P } from './Typography';
import FileIcon from './FileIcon';

const PER_PAGE = 52;

const getFirst = (ary, prop) => {
    if (ary && ary.length !== 0) {
        /* eslint-disable no-restricted-syntax */
        for (const i of ary) {
            if (i[prop]) return i[prop];
        }
        /* eslint-enable no-restricted-syntax */
    }
    return null;
};

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const average = (ary) => ary.reduce((a, b) => a + b, 0) / ary.length;

export const averageCoord = (items) => {
    const coordAry = items.map((i) => i._geo.coordinates).filter(Boolean);

    return coord([average(coordAry.map((i) => i[0])), average(coordAry.map((i) => i[1]))]);
};

export default function FeedWithMap({ url, tagPrefix, tag, children }) {
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [feed, setFeed] = useState({});

    const reset = () => {
        setError(null);
        setPage(1);
    };

    useEffect(() => {
        reset();
        setFeed({});
        if (url) {
            fetchJson(url).then((obj) => {
                if (obj) {
                    setFeed(obj);
                } else {
                    setFeed({});
                    setError('Nothing to Show');
                }
            });
        }
    }, [url]);

    useEffect(() => {
        reset();
    }, [tagPrefix, tag]);

    useEffect(() => {
        if (feed && feed.next_url && feed.items && feed.items.length !== 0) {
            fetchJson(feed.next_url).then((obj) => {
                if (obj === false) {
                    // EOL
                    setFeed({ ...feed, next_url: null });
                } else if (obj && obj.items) {
                    setFeed({
                        ...feed,
                        next_url: obj.next_url,
                        items: feed.items.concat(obj.items),
                    });
                }
            });
        }
    }, [feed]);

    const itemsFiltered = useMemo(() => {
        if (feed && feed.items && feed.items.length !== 0) {
            const prefix = tagPrefix ? `${tagPrefix}=` : '';

            if (tag === '~') {
                const tagGroups = feed.items.reduce((acc, item) => {
                    if (item.tags) {
                        item.tags.forEach((t) => {
                            if (t && _startsWith(t, prefix)) {
                                if (acc[t] === undefined) acc[t] = [];
                                acc[t].push(item);
                            }
                        });
                    }
                    return acc;
                }, {});

                return Object.values(
                    _mapValues(tagGroups, (group, t) => ({
                        id: t.replace(prefix, ''),
                        url: `/items?${new URLSearchParams({
                            i: shortUrl(url),
                            p: tagPrefix,
                            t: t.replace(prefix, ''),
                        })}`,
                        title: t.replace(prefix, ''),
                        content_text: `${group.length} items`,
                        image: getFirst(group, 'image'),
                        date_published: group[0].date_published,
                        date_modified: group[0].date_published,
                        _geo: {
                            coordinates: averageCoord(group),
                        },
                        _meta: {
                            itemCount: group.length,
                        },
                    })),
                );
            }

            if (tag) {
                return feed.items.filter(({ tags }) => tags && tags.includes(prefix + tag));
            }

            return feed.items;
        }
        return [];
    }, [feed, tag, tagPrefix]);

    const itemsPage = useMemo(() => itemsFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [
        itemsFiltered,
        page,
    ]);

    const lastPage = useMemo(() => Math.ceil(itemsFiltered.length / PER_PAGE), [itemsFiltered]);

    const geo = useMemo(
        () => ({
            type: 'FeatureCollection',
            features: itemsFiltered
                .filter(({ _geo }) => _geo && _geo.coordinates)
                .map(({ id, url: itemUrl, title, image, _geo, _meta }) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: _geo.coordinates,
                    },
                    properties: {
                        id,
                        url: itemUrl,
                        date: _meta.date,
                        title,
                        image,
                    },
                })),
        }),
        [itemsFiltered],
    );

    const scrollToTop = () => {
        if (window && document) {
            const div = document.getElementById('feedItemsGrid');
            // if (div) div.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
            if (div)
                window.scrollTo({
                    top: div.offsetTop - 70,
                    left: 0,
                    behavior: 'auto',
                });
        }
    };

    const setPageAndScrollToTop = (i) => {
        scrollToTop();
        setPage(i);
    };

    return (
        <Layout
            title={(feed.author && feed.author.name) || error || 'Loading...'}
            href={
                (feed.author &&
                    feed.author.url &&
                    feed.author.url.replace(process.env.appHost, '')) ||
                '/'
            }
        >
            {url && (
                <Head>
                    <link rel="alternate" type="application/json" title="JSON" href={url} />
                    <link
                        rel="alternate"
                        type="application/geo+json"
                        title="GeoJSON"
                        href={resolveUrl(`./geo.json`, url)}
                    />
                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title="RSS"
                        href={resolveUrl(`./index.rss.xml`, url)}
                    />
                    <link
                        rel="alternate"
                        type="application/atom+xml"
                        title="Atom"
                        href={resolveUrl(`./index.atom.xml`, url)}
                    />
                </Head>
            )}
            <H1>{feed.title || error || 'Loading...'}</H1>
            {feed.description && (
                <>
                    {_lines(feed.description)
                        .filter(Boolean)
                        .map((p, i) => (
                            <P key={i}>{p}</P>
                        ))}
                </>
            )}
            {children && children(itemsFiltered)}
            <Box mt={3}>
                <GeoJsonMap geo={geo} />
            </Box>
            <Box pt={3} id="feedItemsGrid">
                {feed.title && itemsPage.length === 0 && <P>No items.</P>}
                <FeedItemsGrid items={itemsPage} hideTitle={tag} sourceUrl={shortUrl(url)} />
            </Box>
            <Box mt={3}>
                <Pagination
                    count={lastPage}
                    page={page}
                    onChange={(e, i) => setPageAndScrollToTop(i)}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
            <Box mt={5} style={{ textAlign: 'center' }}>
                {url && !tagPrefix && !tag && (
                    <ButtonGroup size="small">
                        <Button
                            startIcon={<FileIcon type="json" />}
                            href={resolveUrl(`./index.json`, url)}
                            target="_blank"
                        >
                            JSON
                        </Button>
                        <Button
                            startIcon={<FileIcon type="json" />}
                            href={resolveUrl(`./index.geo.json`, url)}
                            target="_blank"
                        >
                            GeoJSON
                        </Button>
                        <Button
                            startIcon={<FileIcon type="xml" />}
                            href={resolveUrl(`./index.rss.xml`, url)}
                            target="_blank"
                        >
                            RSS
                        </Button>
                        <Button
                            startIcon={<FileIcon type="xml" />}
                            href={resolveUrl(`./index.atom.xml`, url)}
                            target="_blank"
                        >
                            Atom
                        </Button>
                    </ButtonGroup>
                )}
            </Box>
        </Layout>
    );
}

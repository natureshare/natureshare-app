/* global URLSearchParams process */
/* eslint-disable react/no-array-index-key */

import Box from '@material-ui/core/Box';
import { useState, useEffect, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Head from 'next/head';
import _lines from 'underscore.string/lines';
import _startsWith from 'lodash/startsWith';
import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';
import Pagination from '@material-ui/lab/Pagination';
import { resolveUrl, fetchJson, shortUrl } from '../utils/fetch';
import FeedItemsGrid from './FeedItemsGrid';
import GeoJsonMap from './GeoJsonMap';
import Layout from './Layout';
import { H1, P } from './Typography';
import FileIcon from './FileIcon';
import FeedSortControls from './FeedSortControls';

const PER_PAGE = 52;

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const average = (ary) => ary.reduce((a, b) => a + b, 0) / ary.length;

export const averageCoord = (coordAry) =>
    coord([average(coordAry.map((i) => i[0])), average(coordAry.map((i) => i[1]))]);

export default function FeedWithMap({ url, filterTags, groupByTag, children }) {
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [feed, setFeed] = useState({});
    const [feedItems, setFeedItems] = useState([]);
    const [feedNextUrl, setFeedNextUrl] = useState(null);

    const [itemsSort, setItemsSort] = useState(['default', 'desc']);
    const [itemsFilter, setItemsFilter] = useState({});

    useEffect(() => {
        if (document) {
            const container = document.getElementById('mainContainer');
            const div = document.getElementById('feedItemsGrid');
            if (container && div)
                container.scrollTo({
                    top: div.offsetTop - 70,
                    left: 0,
                    behavior: 'auto',
                });
        }
    }, [page]);

    useEffect(() => {
        setError(null);
        setPage(1);
        setFeed({});
        setFeedItems([]);
        setFeedNextUrl(null);
        if (url) {
            fetchJson(url).then((obj) => {
                if (obj) {
                    const { items, next_url: nextUrl, ...other } = obj;
                    setFeed(other);
                    setFeedItems(items);
                    setFeedNextUrl(nextUrl);
                } else {
                    setError('Nothing to Show');
                }
            });
        }
    }, [url]);

    useEffect(() => {
        setPage(1);
    }, [filterTags, groupByTag]);

    useEffect(() => {
        if (feedNextUrl && feedItems.length !== 0) {
            fetchJson(feedNextUrl).then((obj) => {
                if (obj && obj.items && obj.items.length !== 0) {
                    const { items, next_url: nextUrl } = obj;
                    setFeedItems(feedItems.concat(items));
                    setFeedNextUrl(nextUrl);
                } else {
                    setFeedNextUrl(null); // EOL
                }
            });
        }
    }, [feedNextUrl]);

    const itemsFiltered = useMemo(() => {
        if (feedItems.length !== 0) {
            let items = feedItems;

            Object.keys(itemsFilter).forEach((k) => {
                if (itemsFilter[k]) {
                    // console.log('Filter: ', itemsFilter[k]);
                    items = items.filter(
                        (i) => (itemsFilter[k] === 'yes') === Boolean(_get(i, k, false)),
                    );
                }
            });

            if (filterTags && filterTags.length !== 0) {
                // console.log('Tags:', filterTags);
                items = items.filter(
                    ({ tags }) =>
                        tags &&
                        tags.length >= filterTags.length &&
                        filterTags.reduce((acc, ft) => acc && tags.includes(ft), true),
                );
            }

            if (groupByTag) {
                // console.log('Group:', groupByTag);
                items = Object.values(
                    items.reduce((acc, item) => {
                        if (item.tags) {
                            item.tags.forEach((t) => {
                                if (
                                    t &&
                                    _startsWith(t, groupByTag) &&
                                    (!filterTags || !filterTags.includes(t))
                                ) {
                                    if (acc[t] === undefined) {
                                        acc[t] = {
                                            id: t,
                                            url: `/items?${new URLSearchParams({
                                                i: shortUrl(url),
                                                t: [...(filterTags || []), t].join('|'),
                                            })}`,
                                            title: t.replace(groupByTag, ''),
                                            content_text: '-',
                                            image: item.image,
                                            date_published: item.date_published,
                                            date_modified: item.date_published,
                                            _geo: {
                                                allCoordinates:
                                                    item._geo && item._geo.coordinates
                                                        ? [item._geo.coordinates]
                                                        : [],
                                            },
                                            _meta: {
                                                date: item.date_published.split('T', 1)[0],
                                                itemCount: 1,
                                            },
                                        };
                                    } else {
                                        /* eslint-disable prefer-destructuring */
                                        acc[t].image = acc[t].image || item.image;
                                        acc[t].date_published = [
                                            acc[t].date_published,
                                            item.date_published,
                                        ].sort()[1];
                                        acc[t].date_modified = [
                                            acc[t].date_modified,
                                            item.date_modified,
                                        ].sort()[1];
                                        if (item._geo && item._geo.coordinates)
                                            acc[t]._geo.allCoordinates.push(item._geo.coordinates);
                                        acc[t]._meta.date = acc[t].date_published.split('T', 1)[0];
                                        acc[t]._meta.itemCount += 1;
                                        /* eslint-enable prefer-destructuring */
                                    }
                                }
                            });
                        }
                        return acc;
                    }, {}),
                ).map((item) => {
                    /* eslint-disable no-param-reassign */
                    item._geo =
                        item._geo.allCoordinates.length === 0
                            ? null
                            : { coordinates: averageCoord(item._geo.allCoordinates) };
                    /* eslint-enable no-param-reassign */
                    return item;
                });
            }

            return items;
        }
        return [];
    }, [feedItems, filterTags, itemsFilter]);

    const itemsSorted = useMemo(
        () =>
            itemsSort[0] === 'default'
                ? itemsFiltered
                : _orderBy(itemsFiltered, [(i) => _get(i, itemsSort[0], '')], [itemsSort[1]]),
        [itemsFiltered, itemsSort],
    );

    const itemsPage = useMemo(() => itemsSorted.slice((page - 1) * PER_PAGE, page * PER_PAGE), [
        itemsSorted,
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

    return (
        <Layout
            title={(feed.author && feed.author.name) || error || 'Loading...'}
            href={
                (feed.author &&
                    feed.author.url &&
                    feed.author.url.replace(process.env.APP_HOST, '')) ||
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
            <Box mt={1}>
                <FeedSortControls
                    {...{
                        length: itemsFiltered.length,
                        page,
                        itemsSort,
                        setItemsSort,
                        itemsFilter,
                        setItemsFilter,
                    }}
                />
            </Box>
            <Box pt={1} id="feedItemsGrid">
                {feed.title && itemsPage.length === 0 && <P>No items.</P>}
                <FeedItemsGrid
                    items={itemsPage}
                    hideTitle={
                        !groupByTag && filterTags && filterTags.map((i) => i.split('~', 2)[1])
                    }
                    sourceUrl={shortUrl(url)}
                />
            </Box>
            <Box mt={3}>
                <Pagination
                    count={lastPage}
                    page={page}
                    onChange={(e, i) => setPage(i)}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
            <Box mt={5} style={{ textAlign: 'center' }}>
                {url && !filterTags && !groupByTag && (
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

/* global URLSearchParams process */
/* eslint-disable react/no-array-index-key */

import Box from '@material-ui/core/Box';
import { useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Head from 'next/head';
import _stripTags from 'underscore.string/stripTags';
import _startsWith from 'lodash/startsWith';
import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';
import _pickBy from 'lodash/pickBy';
import _isEqual from 'lodash/isEqual';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _toPairs from 'lodash/toPairs';
import _fromPairs from 'lodash/fromPairs';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { resolveUrl, fetchJson, shortUrl } from '../utils/fetch';
import FeedItemsGrid from './FeedItemsGrid';
import GeoJsonMap from './GeoJsonMap';
import Layout from './Layout';
import { H1, P } from './Typography';
import FileIcon from './FileIcon';
import FeedSortControls from './FeedSortControls';
import FeedFilterControls from './FeedFilterControls';

const PER_PAGE = 52;

const coord = (ary) =>
    ary.reduce((acc, val) => acc && Boolean(parseFloat(val)), true)
        ? ary.map((v) => Math.round(parseFloat(v) * 1000) / 1000)
        : null;

const average = (ary) => ary.reduce((a, b) => a + b, 0) / ary.length;

export const averageCoord = (coordAry) =>
    coord([average(coordAry.map((i) => i[0])), average(coordAry.map((i) => i[1]))]);

function feedParamsReducer(prev, next) {
    return _pickBy(
        {
            ...prev,
            ..._pickBy(next, (v, k) => !_isEqual(v, prev[k])),
        },
        Boolean,
    );
}

export default function FeedWithMap({ defaultUrl, children }) {
    const [feedUrl, setFeedUrl] = useState();
    const [feedParams, setFeedParams] = useReducer(feedParamsReducer, {});
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [feed, setFeed] = useState({});
    const [feedItems, setFeedItems] = useState([]);
    const [feedNextUrl, setFeedNextUrl] = useState(null);
    const [openDescription, setOpenDescription] = useState(false);

    const router = useRouter();

    const getParams = useCallback(
        ({ i, g, t, s, o, f, v, q }) => {
            const params = _pickBy(
                {
                    i: shortUrl(i !== undefined ? i : feedUrl),
                    g: g !== undefined ? g : feedParams.groupByTag,
                    t: (t !== undefined ? t : feedParams.filterTags || []).join('|'),
                    s: s !== undefined ? s : feedParams.itemsSort,
                    o: o !== undefined ? o : feedParams.itemsSortOrder,
                    f: _toPairs(
                        _pickBy(f !== undefined ? f : feedParams.itemsFilter || {}, Boolean),
                    )
                        .map((n) => n.join('~'))
                        .join('|'),
                    v: v !== undefined ? v : feedParams.viewGrid,
                    q: q !== undefined ? q : feedParams.searchText,
                },
                Boolean,
            );
            return new URLSearchParams(params).toString();
        },
        [feedUrl, feedParams],
    );

    const setParams = (routerPath) => {
        const { i, g, t, s, o, f, v, q } = queryString.parse(routerPath.split('?', 2)[1]);
        const url = resolveUrl(i || defaultUrl || '', process.env.CONTENT_HOST);
        setFeedUrl(url);
        setFeedParams({
            groupByTag: g,
            filterTags: t ? t.split('|') : undefined,
            itemsSort: s,
            itemsSortOrder: o,
            itemsFilter: f ? _fromPairs(f.split('|').map((n) => n.split('~', 2))) : undefined,
            viewGrid: v,
            searchText: q,
        });
    };

    useEffect(() => {
        setParams(router.asPath);
        const handleRouteChange = (url) => {
            setParams(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    useEffect(() => {
        if (feedUrl) {
            if (document) {
                const container = document.getElementById('mainContainer');
                if (container)
                    container.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'auto',
                    });
            }
        }
    }, [feedUrl, feedParams.groupByTag, feedParams.filterTags, page]);

    useEffect(() => {
        setError(null);
        setPage(1);
        setFeed({});
        setFeedItems([]);
        setFeedNextUrl(null);
        if (feedUrl) {
            fetchJson(feedUrl).then((obj) => {
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
    }, [feedUrl]);

    useEffect(() => {
        setPage(1);
    }, [feedParams]);

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

            const { itemsFilter, filterTags, groupByTag } = feedParams;

            if (itemsFilter) {
                Object.keys(itemsFilter).forEach((k) => {
                    if (itemsFilter[k]) {
                        // console.log('Filter: ', itemsFilter[k]);
                        items = items.filter(
                            (i) => (itemsFilter[k] === 'yes') === Boolean(_get(i, k, false)),
                        );
                    }
                });
            }

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
                                            url: `/items?${getParams({
                                                t: [...(filterTags || []), t],
                                                g: '',
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

            if (feedParams.searchText) {
                items = items.filter(
                    (item) =>
                        item.title &&
                        RegExp(feedParams.searchText.replace(/\./g, '\\.'), 'i').test(item.title),
                );
            }

            return items;
        }
        return [];
    }, [
        feedItems,
        feedParams.itemsFilter,
        feedParams.filterTags,
        feedParams.groupByTag,
        feedParams.searchText,
    ]);

    const itemsSorted = useMemo(() => {
        const { itemsSort, itemsSortOrder } = feedParams;
        return !itemsSort
            ? itemsFiltered
            : _orderBy(itemsFiltered, [(i) => _get(i, itemsSort, '')], [itemsSortOrder || 'desc']);
    }, [itemsFiltered, feedParams.itemsSort, feedParams.itemsSortOrder]);

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
            {feedUrl && (
                <Head>
                    <link rel="alternate" type="application/json" title="JSON" href={feedUrl} />
                    <link
                        rel="alternate"
                        type="application/geo+json"
                        title="GeoJSON"
                        href={resolveUrl(`./geo.json`, feedUrl)}
                    />
                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title="RSS"
                        href={resolveUrl(`./index.rss.xml`, feedUrl)}
                    />
                    <link
                        rel="alternate"
                        type="application/atom+xml"
                        title="Atom"
                        href={resolveUrl(`./index.atom.xml`, feedUrl)}
                    />
                </Head>
            )}
            <Box mb={2}>
                <H1>{feed.title || error || 'Loading...'}</H1>
                {feed.description && (
                    <Collapse
                        in={feed.description.length < 300 || openDescription}
                        timeout="auto"
                        collapsedHeight={feed.description.length < 300 ? 0 : 95}
                    >
                        {feed.description.length >= 300 && (
                            <IconButton
                                onClick={() => setOpenDescription(!openDescription)}
                                style={{
                                    float: 'right',
                                    transform: openDescription ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        )}
                        <P>{_stripTags(feed.description)}</P>
                    </Collapse>
                )}
            </Box>
            {children &&
                children({
                    feedUrl,
                    groupByTag: feedParams.groupByTag,
                    filterTags: feedParams.filterTags,
                    getParams,
                    items: itemsFiltered,
                })}
            <Box mt={1}>
                <FeedFilterControls
                    {...{
                        length: itemsFiltered.length,
                        page,
                        itemsFilter: feedParams.itemsFilter,
                        searchText: feedParams.searchText,
                        getParams,
                    }}
                />
            </Box>
            <Box mt={1}>
                <GeoJsonMap geo={geo} />
            </Box>
            <Box mt={1}>
                <FeedSortControls
                    {...{
                        itemsSort: feedParams.itemsSort,
                        itemsSortOrder: feedParams.itemsSortOrder,
                        viewGrid: feedParams.viewGrid,
                        getParams,
                    }}
                />
            </Box>
            <Box mt={1} id="feedItemsGrid">
                {feed.title && itemsPage.length === 0 && <P>No items.</P>}
                <FeedItemsGrid
                    items={itemsPage}
                    viewGrid={feedParams.viewGrid}
                    hideTitle={
                        !feedParams.groupByTag &&
                        feedParams.filterTags &&
                        feedParams.filterTags.map((i) => i.split('~', 2)[1])
                    }
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
                {feedUrl && !feedParams.filterTags && !feedParams.groupByTag && (
                    <ButtonGroup size="small">
                        <Button
                            startIcon={<FileIcon type="json" />}
                            href={resolveUrl(`./index.json`, feedUrl)}
                            target="_blank"
                        >
                            JSON
                        </Button>
                        <Button
                            startIcon={<FileIcon type="json" />}
                            href={resolveUrl(`./index.geo.json`, feedUrl)}
                            target="_blank"
                        >
                            GeoJSON
                        </Button>
                        <Button
                            startIcon={<FileIcon type="xml" />}
                            href={resolveUrl(`./index.rss.xml`, feedUrl)}
                            target="_blank"
                        >
                            RSS
                        </Button>
                        <Button
                            startIcon={<FileIcon type="xml" />}
                            href={resolveUrl(`./index.atom.xml`, feedUrl)}
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

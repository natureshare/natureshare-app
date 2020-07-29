/* eslint-disable react/no-array-index-key */
import Box from '@material-ui/core/Box';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Head from 'next/head';
import FileCode from 'mdi-material-ui/FileCode';
import FileDocument from 'mdi-material-ui/FileDocument';
import FileLink from 'mdi-material-ui/FileLink';
import _lines from 'underscore.string/lines';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { resolveUrl, fetchJson } from '../utils/fetch';
import FeedItemsGrid from './FeedItemsGrid';
import GeoJsonMap from './GeoJsonMap';
import Layout from './Layout';
import { H1, P } from './Typography';

const iconMap = {
    xml: FileCode,
    json: FileLink,
    yaml: FileDocument,
};

const icon = (i) => {
    const Icon = iconMap[i];
    return <Icon />;
};

const PER_PAGE = 50;

export default function FeedWithMap({ url, href, h1, children }) {
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [feed, setFeed] = useState({});
    const [geo, setGeo] = useState({});

    useEffect(() => {
        if (url) {
            setPage(1);
            fetchJson('./index.json', url).then((obj) =>
                obj ? setFeed(obj) : setError('Nothing to Show'),
            );
            fetchJson('./index.geo.json', url).then((obj) => obj && setGeo(obj));
        }
    }, [url]);

    useEffect(() => {
        if (
            url &&
            feed &&
            feed.next_url &&
            feed.items &&
            page !== 1 &&
            (page - 1) * PER_PAGE >= feed.items.length
        ) {
            fetchJson(feed.next_url).then(
                (obj) =>
                    obj &&
                    obj.items &&
                    setFeed({
                        ...feed,
                        next_url: obj.next_url,
                        items: feed.items.concat(obj.items),
                    }),
            );
        }
    }, [url, feed, page]);

    const items = useMemo(
        () =>
            (feed && feed.items && feed.items.slice((page - 1) * PER_PAGE, page * PER_PAGE)) || [],
        [feed, page],
    );

    const lastPage = useMemo(
        () =>
            (feed &&
                feed._meta &&
                feed._meta.itemCount &&
                Math.ceil(feed._meta.itemCount / PER_PAGE)) ||
            0,
        [feed],
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

    const selectPage = useCallback(() => {
        if (window && typeof window === 'object' && lastPage > 0) {
            const selected = window.prompt('Page number?', page);
            if (selected >= 1 && selected <= lastPage) {
                scrollToTop();
                setPage(selected);
            }
        }
    }, [page, lastPage]);

    const nextPage = (step) => {
        scrollToTop();
        setPage(page + step);
    };

    return (
        <Layout
            title={(feed.author && feed.author.name) || error || 'Loading...'}
            href={(feed.author && feed.author.url) || '/'}
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
            <H1>{h1 || feed.title || error || 'Loading...'}</H1>
            {feed.description && (
                <>
                    {_lines(feed.description)
                        .filter(Boolean)
                        .map((p, i) => (
                            <P key={i}>{p}</P>
                        ))}
                </>
            )}
            {children}
            <Box mt={3}>
                <GeoJsonMap geo={geo} />
            </Box>
            <Box pt={3} id="feedItemsGrid">
                <FeedItemsGrid items={items} href={href} />
            </Box>
            {feed && lastPage > 1 && (
                <Box mt={3}>
                    {url && (
                        <ButtonGroup size="small">
                            {page !== 1 && (
                                <Button
                                    startIcon={<ChevronLeftIcon />}
                                    onClick={() => nextPage(-1)}
                                >
                                    Prev
                                </Button>
                            )}

                            <Button onClick={selectPage}>
                                Page {page} of {lastPage}
                            </Button>
                            {page < lastPage && (
                                <Button endIcon={<ChevronRightIcon />} onClick={() => nextPage(1)}>
                                    Next
                                </Button>
                            )}
                        </ButtonGroup>
                    )}
                </Box>
            )}
            <Box mt={5}>
                {url && (
                    <ButtonGroup size="small">
                        <Button
                            startIcon={icon('json')}
                            href={resolveUrl(`./index.json`, url)}
                            target="_blank"
                        >
                            JSON
                        </Button>
                        <Button
                            startIcon={icon('json')}
                            href={resolveUrl(`./index.geo.json`, url)}
                            target="_blank"
                        >
                            GeoJSON
                        </Button>
                        <Button
                            startIcon={icon('xml')}
                            href={resolveUrl(`./index.rss.xml`, url)}
                            target="_blank"
                        >
                            RSS
                        </Button>
                        <Button
                            startIcon={icon('xml')}
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

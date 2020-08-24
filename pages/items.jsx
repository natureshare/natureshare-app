/* eslint-disable react/no-array-index-key */
/* global process URL URLSearchParams */
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import _endsWith from 'lodash/endsWith';
import _find from 'lodash/find';
import _startsWith from 'lodash/startsWith';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl, shortUrl } from '../utils/fetch';
import Link from '../components/Link';
import IdHeader from '../components/items/IdHeader';
import CategoryIcon from '../components/CategoryIcon';

const HeaderButton = ({ text, href, params }) => (
    <Grid key={text} item>
        <Button
            component={Link}
            href={`/${href}`}
            as={`/${href}?${new URLSearchParams(params)}`}
            variant="outlined"
            color="primary"
            startIcon={<CategoryIcon category={text} />}
        >
            {text}
        </Button>
    </Grid>
);

export default function Items() {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState();
    const [filterTags, setFilterTags] = useState();
    const [groupByTag, setGroupByTag] = useState();

    const updateUrl = (routerPath) => {
        const { i, g, t } = queryString.parse(routerPath.split('?', 2)[1]);
        const url = resolveUrl(i || '/index.json', process.env.CONTENT_HOST);
        setFeedUrl(url || null);
        setGroupByTag(g || null);
        setFilterTags(t ? t.split('|') : []);
    };

    useEffect(() => {
        updateUrl(router.asPath);
        const handleRouteChange = (url) => {
            if (document) {
                const container = document.getElementById('mainContainer');
                if (container)
                    container.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'auto',
                    });
            }
            updateUrl(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    const idFilterTags = useMemo(
        () => (filterTags ? filterTags.filter((t) => _startsWith(t, 'id~')) : null),
        [filterTags],
    );

    return (
        <FeedWithMap url={feedUrl} filterTags={filterTags} groupByTag={groupByTag}>
            {(items) => (
                <>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        {(groupByTag || (filterTags && filterTags.length !== 0)) && (
                            <Link
                                href="/items"
                                as={`/items?${new URLSearchParams({ i: shortUrl(feedUrl) })}`}
                            >
                                Items
                            </Link>
                        )}
                        {filterTags &&
                            filterTags.map((t, i) => (
                                <Link
                                    key={t}
                                    href="/items"
                                    as={`/items?${new URLSearchParams({
                                        i: shortUrl(feedUrl),
                                        t: filterTags.slice(0, i + 1).join('|'),
                                    })}`}
                                >
                                    {t.split('~', 2)[1]}
                                </Link>
                            ))}
                        {groupByTag && <span>{groupByTag.split('~', 1)[0]}</span>}
                    </Breadcrumbs>
                    {feedUrl && (
                        <Box mt={3}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {!groupByTag &&
                                    (!filterTags || filterTags.length === 0) &&
                                    _endsWith(feedUrl, '/_index/items/index.json') && (
                                        <>
                                            <HeaderButton
                                                text="profile"
                                                href="profile"
                                                params={{
                                                    i: shortUrl(
                                                        new URL('../../profile.yaml', feedUrl).href,
                                                    ),
                                                }}
                                            />
                                            <HeaderButton
                                                text="collections"
                                                href="items"
                                                params={{
                                                    i: shortUrl(
                                                        new URL(
                                                            '../collections/index.json',
                                                            feedUrl,
                                                        ).href,
                                                    ),
                                                }}
                                            />
                                        </>
                                    )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'id~')),
                                ) && (
                                    <HeaderButton
                                        text="ids"
                                        href="items"
                                        params={{
                                            i: shortUrl(feedUrl),
                                            t: filterTags.join('|'),
                                            g: 'id~',
                                        }}
                                    />
                                )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'tag~')),
                                ) && (
                                    <HeaderButton
                                        text="tags"
                                        href="items"
                                        params={{
                                            i: shortUrl(feedUrl),
                                            t: filterTags.join('|'),
                                            g: 'tag~',
                                        }}
                                    />
                                )}
                            </Grid>
                        </Box>
                    )}
                    {idFilterTags && (
                        <Box mt={3}>
                            {idFilterTags.map((t) => (
                                <IdHeader indexUrl={feedUrl} id={t.split('~', 2)[1]} />
                            ))}
                        </Box>
                    )}
                </>
            )}
        </FeedWithMap>
    );
}

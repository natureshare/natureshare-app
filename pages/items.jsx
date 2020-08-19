/* eslint-disable react/no-array-index-key */
/* global process URL URLSearchParams */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import _endsWith from 'lodash/endsWith';
import _find from 'lodash/find';
import _startsWith from 'lodash/startsWith';
import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl, shortUrl } from '../utils/fetch';
import { H2 } from '../components/Typography';
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
    const [tagPrefix, setTagPrefix] = useState();
    const [tag, setTag] = useState();

    const updateUrl = (routerPath) => {
        const { i, p, t } = queryString.parse(routerPath.split('?', 2)[1]);
        const url = resolveUrl(i || '/index.json', process.env.CONTENT_HOST);
        setFeedUrl(url || null);
        setTagPrefix(p || null);
        setTag(t || null);
    };

    useEffect(() => {
        updateUrl(router.asPath);
        const handleRouteChange = (url) => {
            updateUrl(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <FeedWithMap url={feedUrl} tagPrefix={tagPrefix} tag={tag}>
            {(items) => (
                <>
                    {feedUrl && !tagPrefix && !tag && (
                        <Box mt={3}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {_endsWith(feedUrl, '/_index/items/index.json') && (
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
                                                    new URL('../collections/index.json', feedUrl)
                                                        .href,
                                                ),
                                            }}
                                        />
                                    </>
                                )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'id=')),
                                ) && (
                                    <HeaderButton
                                        text="ids"
                                        href="items"
                                        params={{ i: shortUrl(feedUrl), p: 'id', t: '~' }}
                                    />
                                )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'tag=')),
                                ) && (
                                    <HeaderButton
                                        text="tags"
                                        href="items"
                                        params={{ i: shortUrl(feedUrl), p: 'tag', t: '~' }}
                                    />
                                )}
                            </Grid>
                        </Box>
                    )}
                    {tagPrefix === 'id' && (
                        <H2>Identifications{tag && tag !== '~' && ` / ${tag}`}</H2>
                    )}
                    {tagPrefix === 'tag' && <H2>Tags{tag && tag !== '~' && ` / ${tag}`}</H2>}
                    {tagPrefix === 'id' && tag && tag !== '~' && (
                        <IdHeader indexUrl={feedUrl} tagPrefix={tagPrefix} tag={tag} />
                    )}
                </>
            )}
        </FeedWithMap>
    );
}

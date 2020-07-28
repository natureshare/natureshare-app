/* eslint-disable react/no-array-index-key */
/* global process URL */
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { P } from '../components/Typography';
import { resolveUrl } from '../utils/fetch';
import Link from '../components/Link';
import CategoryIcon from '../components/CategoryIcon';
import FeedWithMap from '../components/FeedWithMap';

export default function Collection() {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);
    const [collection] = useState({}); // TODO Load from YAML

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split(/\?/)[1]);
        const url = resolveUrl(`${i}/index.json`, process.env.contentHost);
        if (url) {
            setFeedUrl(url);
        }
    }, []);

    return (
        <FeedWithMap url={feedUrl} href="item">
            {collection.location_name && (
                <P>
                    <strong>{collection.location_name}</strong>
                </P>
            )}

            {(collection.members && collection.members.length > 0 && (
                <P>
                    <em>Members: {collection.members.join(', ')}</em>
                </P>
            )) ||
                ''}
            <Box mt={3}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    {['ids', 'tags'].map((href) => (
                        <Grid key={href} item>
                            <Button
                                component={Link}
                                href={`/${href}`}
                                as={`/${href}?i=${
                                    !feedUrl
                                        ? ''
                                        : encodeURIComponent(
                                              new URL(`./${href}`, feedUrl).href.replace(
                                                  process.env.contentHost,
                                                  './',
                                              ),
                                          )
                                }`}
                                variant="outlined"
                                color="primary"
                                startIcon={<CategoryIcon category={href} />}
                            >
                                {href}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </FeedWithMap>
    );
}

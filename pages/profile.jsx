/* eslint-disable react/no-array-index-key */
/* global process URL */
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _lines from 'underscore.string/lines';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl, fetchYaml } from '../utils/fetch';
import { P } from '../components/Typography';
import CategoryIcon from '../components/CategoryIcon';
import Link from '../components/Link';

export default function Profile() {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split(/\?/)[1]);

        const url = resolveUrl(`${i}/profile.yaml`, process.env.contentHost);

        if (url) {
            setProfileUrl(url);
            setFeedUrl(resolveUrl('./_index/items/', url));
            fetchYaml(url).then((obj) => obj && setProfile(obj));
        }
    }, []);

    return (
        <FeedWithMap url={feedUrl} href="item" h1={(profile && profile.name) || null}>
            {profile && profile.organisation && (
                <>
                    <P>
                        <strong>{profile.organisation}</strong>
                    </P>
                </>
            )}
            {profile && profile.bio && (
                <>
                    {_lines(profile.bio)
                        .filter(Boolean)
                        .map((p, i) => (
                            <P key={i}>{p}</P>
                        ))}
                </>
            )}
            {profile && profile.website && (
                <>
                    <a href={profile.website}>{profile.website}</a>
                </>
            )}
            <Box mt={3}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    {['items', 'collections', 'ids', 'tags'].map((href) => (
                        <Grid key={href} item>
                            <Button
                                component={Link}
                                href={`/${href}`}
                                as={`/${href}?i=${
                                    !profileUrl
                                        ? ''
                                        : encodeURIComponent(
                                              new URL(`./_index/${href}`, profileUrl).href.replace(
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

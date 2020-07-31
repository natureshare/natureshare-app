/* eslint-disable react/no-array-index-key */
/* global process */
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import _takeRight from 'lodash/takeRight';
import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl, fetchYaml } from '../utils/fetch';
import { H2, H3 } from '../components/Typography';
import Link from '../components/Link';

export default function Id() {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);
    const [species, setSpecies] = useState({});

    const updateUrl = (routerPath) => {
        const { i } = queryString.parse(routerPath.split(/\?/)[1]);
        const url = resolveUrl(`${i}/`, process.env.contentHost);
        if (url) {
            setFeedUrl(url);
            const speciesPath = `./${_takeRight(i.split('/'), 3).join('/')}.yaml`;
            fetchYaml(speciesPath, process.env.speciesHost).then((obj) =>
                obj ? setSpecies(obj) : setSpecies({}),
            );
        }
    };

    useEffect(() => {
        const handleRouteChange = (url) => {
            updateUrl(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    const relativeUrl = useCallback(
        (url) => resolveUrl(url, feedUrl).replace(process.env.contentHost, './').replace(/\/$/, ''),
        [feedUrl],
    );

    return (
        <FeedWithMap url={feedUrl} href="item">
            {species.common_names && species.common_names.length > 0 && (
                <H2>{species.common_names.map((i) => i.name).join(', ')}</H2>
            )}
            {species.synonyms && species.synonyms.length > 0 && (
                <Box mt={3}>
                    <H3>Synonyms</H3>
                    <Grid container spacing={1}>
                        {species.synonyms.map((i) => (
                            <Grid item key={i}>
                                <Chip
                                    label={i}
                                    variant="outlined"
                                    component={Link}
                                    onClick={() => {}}
                                    href="/id"
                                    as={`/id?i=${encodeURIComponent(
                                        relativeUrl(
                                            `../../../${i[0].toLowerCase()}/${i
                                                .split(' ', 1)[0]
                                                .toLowerCase()}/${i
                                                .toLowerCase()
                                                .replace(/\s/g, '_')
                                                .replace(/\//g, '~')
                                                .replace(/[.'"`]/g, '')}`,
                                        ),
                                    )}`}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {species.classification && species.classification.length > 0 && (
                <Box mt={3}>
                    <H3>Classification</H3>
                    <Grid container spacing={1}>
                        {species.classification.map(({ rank, name: i }) => (
                            <Grid item key={rank + i}>
                                <Chip label={`${rank}: ${i}`} variant="outlined" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {species.categories && species.categories.length > 0 && (
                <Box mt={3}>
                    <H3>Categories</H3>
                    <Grid container spacing={1}>
                        {species.categories.map((i) => (
                            <Grid item key={i}>
                                <Chip label={i} variant="outlined" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {species.features && species.features.length > 0 && (
                <Box mt={3}>
                    <H3>Features</H3>
                    <Grid container spacing={1}>
                        {species.features.map(({ feature, description }) => (
                            <Grid item key={feature + description}>
                                <Chip label={`${feature}: ${description}`} variant="outlined" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </FeedWithMap>
    );
}

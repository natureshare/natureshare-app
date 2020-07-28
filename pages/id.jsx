/* eslint-disable react/no-array-index-key */
/* global process */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import _takeRight from 'lodash/takeRight';
import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl, fetchYaml } from '../utils/fetch';
import { H2, H3 } from '../components/Typography';

export default function Id() {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);
    const [species, setSpecies] = useState({});

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split(/\?/)[1]);
        const url = resolveUrl(`${i}/`, process.env.contentHost);
        if (url) {
            setFeedUrl(url);
            const speciesPath = `${_takeRight(
                i
                    .split('/')
                    .map(decodeURIComponent)
                    .map((s) => s.replace(/\./g, '').replace(/\//g, '~')),
                3,
            ).join('/')}.yaml`;
            fetchYaml(speciesPath, process.env.speciesHost).then((obj) => obj && setSpecies(obj));
        }
    }, []);

    return (
        <FeedWithMap url={feedUrl} href="item">
            {species.common_names && species.common_names.length > 0 && (
                <H2>{species.common_names.map((i) => i.name).join(', ')}</H2>
            )}
            {species.synonyms && species.synonyms.length > 0 && (
                <Box mt={3}>
                    <H3>Synonyms</H3>
                    <Grid container spacing={1}>
                        {species.synonyms.map(({ name: i }) => (
                            <Grid item key={i}>
                                <Chip label={i} variant="outlined" />
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

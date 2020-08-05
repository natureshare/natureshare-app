/* eslint-disable react/no-array-index-key */
/* global process URLSearchParams */
import { useState, useEffect, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { fetchYaml } from '../../utils/fetch';
import { H2, H3 } from '../Typography';
import Link from '../Link';

const dirStr = (i) => i.toLowerCase().replace(/\s/g, '_');

const idSubDir = (i) =>
    [
        i[0].toLowerCase(),
        i.split(' ', 1)[0].toLowerCase(),
        dirStr(i)
            .replace(/\//g, '~')
            .replace(/[.'"`]/g, ''),
    ].join('/');

export default function IdHeader({ indexUrl, tagPrefix, tag }) {
    const [species, setSpecies] = useState({});

    useEffect(() => {
        if (tag && tag.toLowerCase() !== 'unidentified') {
            const speciesPath = `/${idSubDir(tag)}.yaml`;
            fetchYaml(speciesPath, process.env.speciesHost).then((obj) =>
                obj ? setSpecies(obj) : setSpecies({}),
            );
        }
    }, [tag]);

    const synonymParams = useCallback(
        (t) => new URLSearchParams({ i: indexUrl, p: tagPrefix, t }),
        [indexUrl, tagPrefix],
    );

    return (
        <>
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
                                    href="/items"
                                    as={`/items?${synonymParams(i)}`}
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
        </>
    );
}

/* eslint-disable react/no-array-index-key */
/* global process URLSearchParams */
import { useState, useEffect, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { H4 } from '../Typography';
import { fetchYaml } from '../../utils/fetch';
import FileIcon from '../FileIcon';

const dirStr = (i) => i.toLowerCase().replace(/\s/g, '_');

const idSubDir = (i) =>
    [
        i[0].toLowerCase(),
        i.split(' ', 1)[0].toLowerCase(),
        dirStr(i)
            .replace(/\//g, '~')
            .replace(/[.'"`]/g, ''),
    ].join('/');

export default function IdHeader({ indexUrl, id }) {
    const [species, setSpecies] = useState(null);

    useEffect(() => {
        if (id && id.toLowerCase() !== 'unidentified') {
            setSpecies(null);
            const speciesPath = `/${idSubDir(id)}.yaml`;
            fetchYaml(speciesPath, process.env.SPECIES_HOST).then((obj) =>
                obj ? setSpecies(obj) : setSpecies({}),
            );
        } else {
            setSpecies(false);
        }
    }, [id]);

    const githubUrl = useMemo(
        () =>
            id
                ? `https://github.com/${process.env.GH_SPECIES_PATH}/tree/master/${idSubDir(
                      id,
                  )}.yaml`
                : '',
        [id],
    );

    return (
        <>
            {species !== false && (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h3">{id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ marginTop: '-30px', marginBottom: '-10px' }}>
                        {species && (
                            <div>
                                {species.common_names && species.common_names.length > 0 && (
                                    <>
                                        <H4>Common Names</H4>
                                        <Grid container spacing={1}>
                                            {species.common_names.map((i) => (
                                                <Grid item key={i}>
                                                    <Chip label={i} variant="outlined" />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}
                                {species.synonyms && species.synonyms.length > 0 && (
                                    <>
                                        <H4>Synonyms</H4>
                                        <Grid container spacing={1}>
                                            {species.synonyms.map((synonym) => (
                                                <Grid item key={synonym}>
                                                    <Chip
                                                        label={synonym}
                                                        variant="outlined"
                                                        component={Link}
                                                        onClick={() => {}}
                                                        href="/items"
                                                        as={`/items?${new URLSearchParams({
                                                            i: indexUrl,
                                                            t: `id~${synonym}`,
                                                        })}`}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}
                                {species.classification && species.classification.length > 0 && (
                                    <>
                                        <H4>Classification</H4>
                                        <Grid container spacing={1}>
                                            {species.classification.map(({ rank, name: i }) => (
                                                <Grid item key={rank + i}>
                                                    <Chip
                                                        label={`${rank}: ${i}`}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}
                                {species.categories && species.categories.length > 0 && (
                                    <>
                                        <H4>Categories</H4>
                                        <Grid container spacing={1}>
                                            {species.categories.map((i) => (
                                                <Grid item key={i}>
                                                    <Chip label={i} variant="outlined" />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}
                                {species.features && species.features.length > 0 && (
                                    <>
                                        <H4>Features</H4>
                                        <Grid container spacing={1}>
                                            {species.features.map(({ feature, description }) => (
                                                <Grid item key={feature + description}>
                                                    <Chip
                                                        label={`${feature}: ${description}`}
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}
                            </div>
                        )}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            href={githubUrl}
                            target="_blank"
                            startIcon={<FileIcon type="yaml" />}
                        >
                            Edit
                        </Button>
                    </AccordionActions>
                </Accordion>
            )}
        </>
    );
}

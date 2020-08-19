import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JSONTree from 'react-json-tree';
import { useState, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import jsonschema from 'jsonschema';
import ArrowRightIcon from 'mdi-material-ui/ArrowRightThick';
import ArrowDownIcon from 'mdi-material-ui/ArrowDownThick';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import _uniq from 'lodash/uniq';
import Layout from '../components/Layout';
import { H1, H2 } from '../components/Typography';
import LocationFormDialog from '../components/LocationFormDialog';
import Prompt from '../components/Prompt';

export async function getStaticProps() {
    return {
        props: {
            schemaYaml: fs.readFileSync(path.join('public', 'schemas', 'item.yaml')).toString(),
        },
    };
}

// https://github.com/reduxjs/redux-devtools/blob/75322b15ee7ba03fddf10ac3399881e302848874/src/react/themes/bright.js
const theme = {
    scheme: 'bright',
    author: 'chris kempson (http://chriskempson.com)',
    base00: '#000000',
    base01: '#303030',
    base02: '#505050',
    base03: '#b0b0b0',
    base04: '#d0d0d0',
    base05: '#e0e0e0',
    base06: '#f5f5f5',
    base07: '#ffffff',
    base08: '#fb0120',
    base09: '#6dfc24',
    base0A: '#fda331',
    base0B: '#a1c659',
    base0C: '#76c7b7',
    base0D: '#6fb3d2',
    base0E: '#d381c3',
    base0F: '#be643c',
};

/* eslint-disable eqeqeq */
const labelRenderer = (keyPath, nodeType, expanded, expandable) => (
    <span>{!expandable && parseInt(keyPath[0], 10) == keyPath[0] ? '-' : `${keyPath[0]}:`}</span>
);
/* eslint-enable eqeqeq */

export default function Metadata({ schemaYaml }) {
    const validator = new jsonschema.Validator();
    const { definitions, ...schema } = yaml.safeLoad(schemaYaml);

    const [text, setText] = useState('--- #natureshare.org\nlicense: CC BY 4.0\n');

    const [openPrompt, setOpenPrompt] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);

    const data = useMemo(() => {
        if (!/^--- #natureshare.org/.test(text)) {
            return { errors: [{ message: 'Text must start with: "--- #natureshare.org"' }] };
        }
        try {
            const obj = yaml.safeLoad(text);
            return {
                obj,
                errors: validator.validate(obj, schema, { throwError: false }).errors,
            };
        } catch (e) {
            return {
                errors: [{ message: e.message }],
            };
        }
    }, [text]);

    const addField = (value) => {
        if (openPrompt && data.obj && data.errors.length === 0) {
            const prop = openPrompt;
            const { [prop]: item, ...obj } = data.obj;
            const newItem =
                prop === 'description'
                    ? value.trim()
                    : _uniq([...(item || []), value.replace(/[\r\n]/g, ' ').trim()]);
            try {
                setText(
                    `--- #natureshare.org\n${yaml.safeDump(
                        {
                            [prop]: newItem,
                            ...obj,
                        },
                        {
                            lineWidth: 1000,
                            noRefs: true,
                        },
                    )}`,
                );
            } catch (e) {
                // console.error(e);
            }
        }
        setOpenPrompt(false);
    };

    const setLocation = ({ lat, lng }) => {
        if (openLocation && data.obj && data.errors.length === 0) {
            try {
                setText(
                    `--- #natureshare.org\n${yaml.safeDump(
                        {
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lng),
                            ...data.obj,
                        },
                        {
                            lineWidth: 1000,
                            noRefs: true,
                        },
                    )}`,
                );
            } catch (e) {
                // console.error(e);
            }
        }
        setOpenLocation(false);
    };

    return (
        <Layout title="Metadata" href="/metadata/">
            <H1>Metadata Creator</H1>
            <Box mt={3}>
                <Grid container spacing={1}>
                    {['id', 'description', 'tags', 'collections'].map((i) => (
                        <Grid item key={i}>
                            <Button
                                size="small"
                                color="primary"
                                variant="outlined"
                                onClick={() => setOpenPrompt(i)}
                                disabled={data.errors.length !== 0}
                            >
                                Add {i.replace(/s$/, '')}
                            </Button>
                        </Grid>
                    ))}
                    <Grid item>
                        <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => setOpenLocation(true)}
                            disabled={data.errors.length !== 0}
                        >
                            Add Location
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            label="Metadata"
                            multiline
                            rows={6}
                            rowsMax={12}
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            variant="outlined"
                            fullWidth
                            error={data.errors.length !== 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} style={{ textAlign: 'center' }}>
                        <Hidden smDown>
                            <ArrowRightIcon
                                color={data.errors.length === 0 ? 'primary' : 'secondary'}
                            />
                        </Hidden>
                        <Hidden smUp>
                            <ArrowDownIcon
                                color={data.errors.length === 0 ? 'primary' : 'secondary'}
                            />
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        {data.errors.length !== 0 && (
                            <>
                                <Typography variant="h3" component="span" color="secondary">
                                    <span className="mdi mdi-alert-outline" /> Please Review
                                </Typography>
                                <Typography variant="body1" component="span" color="secondary">
                                    <ul style={{ margin: '1em 0 0 1em', padding: 0 }}>
                                        {data.errors.map((i) => (
                                            <li>
                                                {i.property}{' '}
                                                {i.instance &&
                                                    typeof i.instance !== 'object' &&
                                                    `"${i.instance}"`}{' '}
                                                {i.message}
                                                {i.schema && (
                                                    <JSONTree
                                                        data={i.schema}
                                                        hideRoot
                                                        theme={theme}
                                                        getItemString={() => ''}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </Typography>
                            </>
                        )}
                        {data.errors.length === 0 && (
                            <>
                                <Typography variant="h3" component="span" color="primary">
                                    <span className="mdi mdi-check-bold" /> Valid
                                </Typography>
                                <Typography variant="body1" component="span" color="primary">
                                    <JSONTree
                                        data={data.obj}
                                        hideRoot
                                        theme={theme}
                                        shouldExpandNode={() => true}
                                        labelRenderer={labelRenderer}
                                        getItemString={() => ''}
                                    />
                                </Typography>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box mt={3} style={{ borderBottom: '1px solid #DDD' }} />
            <H2>Schema Reference</H2>
            <Box mt={3}>
                <Typography variant="body1" component="span">
                    <JSONTree
                        data={schema}
                        theme={theme}
                        hideRoot
                        shouldExpandNode={(k) => k[0] === 'properties'}
                        labelRenderer={labelRenderer}
                        getItemString={() => ''}
                    />
                </Typography>
            </Box>
            <Prompt
                open={data.errors.length === 0 && Boolean(openPrompt)}
                setOpen={setOpenPrompt}
                title={openPrompt}
                onSubmit={addField}
            />
            <LocationFormDialog
                open={openLocation}
                setOpen={setOpenLocation}
                onSubmit={setLocation}
            />
        </Layout>
    );
}

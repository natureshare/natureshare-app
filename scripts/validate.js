/* global process */

import FS from 'fs';
import YAML from 'js-yaml';
import Glob from 'glob';
import Path from 'path';
import jsonschema from 'jsonschema';
import dotenv from 'dotenv';
import _mapValues from 'lodash/mapValues.js';

dotenv.config();

const contentPath = process.env.CONTENT_FILE_PATH;
const speciesPath = process.env.SPECIES_FILE_PATH;

const validator = new jsonschema.Validator();

const schemas = _mapValues(
    {
        profile: '',
        collection: '',
        species: '',
        item: '',
    },
    (v, k) =>
        YAML.safeLoad(FS.readFileSync(Path.join('.', 'scripts', 'schemas', `${v || k}.yaml`))),
);

const validate = (cwd, f, schema) => {
    const result = validator.validate(YAML.safeLoad(FS.readFileSync(Path.join(cwd, f))), schema, {
        throwError: false,
    });
    if (result.errors && result.errors.length !== 0) {
        console.log('-->', f);
        result.errors.forEach((e) =>
            console.log('   ', '-->', e.stack.replace(/^instance\s+/, '')),
        );
        console.log('');
        // throw new Error('Failed validation!');
    }
};

[
    [contentPath, ['*', 'profile.yaml'], schemas.profile],
    [contentPath, ['*', 'collections', '*.yaml'], schemas.collection],
    [contentPath, ['*', 'items', '**', '*.yaml'], schemas.item],
    [speciesPath, ['*', '*', '*.yaml'], schemas.species],
]
    .filter((i) => Boolean(i[0]))
    .forEach(([cwd, glob, schema]) => {
        console.log(glob);
        Glob.sync(Path.join(...glob), { cwd }).forEach((f) => {
            validate(cwd, f, schema);
        });
    });

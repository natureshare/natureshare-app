const nextConfig = {
    env: {
        appName: process.env.APP_NAME || 'NatureShare',
        appShortName: process.env.APP_SHORT_NAME || 'NS',
        appHost: process.env.APP_HOST || 'https://natureshare.org.au',

        osmHost: process.env.OSM_HOST || 'a.tile.openstreetmap.org',
        tfApiKey: process.env.TF_API_KEY,

        contentHost: process.env.CONTENT_HOST,
        speciesHost: process.env.SPECIES_HOST,

        githubContentPath: process.env.GH_CONTENT_PATH,
        githubSpeciesPath: process.env.GH_SPECIES_PATH,
    },
    exportTrailingSlash: false,
};

module.exports = nextConfig;

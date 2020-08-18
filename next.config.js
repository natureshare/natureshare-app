const nextConfig = {
    env: {
        appName: process.env.APP_NAME || 'NatureShare',
        appShortName: process.env.APP_SHORT_NAME || 'NS',
        appHost: process.env.APP_HOST || 'https://natureshare.org.au',
        appTwitter: process.env.APP_TWITTER || '@natureshare',

        apiHost: process.env.API_HOST,
        passwordSalt: process.env.PASSWORD_SALT || 'ns1234',

        osmHost: process.env.OSM_HOST || 'a.tile.openstreetmap.org',
        tfApiKey: process.env.TF_API_KEY,

        contentHost: process.env.CONTENT_HOST || 'https://files.natureshare.org.au/',
        speciesHost: process.env.SPECIES_HOST || 'https://species.natureshare.org.au/',
        externalHosts: process.env.EXTERNAL_HOSTS,

        githubContentPath: process.env.GH_CONTENT_PATH || 'natureshare/natureshare-files',
        githubSpeciesPath: process.env.GH_SPECIES_PATH || 'natureshare/natureshare-species-wiki',

        // Dev:
        contentHostDev: process.env.CONTENT_HOST_DEV,
        speciesHostDev: process.env.SPECIES_HOST_DEV,
    },
    exportTrailingSlash: false,
};

module.exports = nextConfig;

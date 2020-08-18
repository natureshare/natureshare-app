/* global process */

export default function MobileHeader() {
    const href = (src) => `${process.env.assetPrefix || ''}${src}`;

    return (
        <>
            <link rel="manifest" href={href('/manifest.json')} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={process.env.appName} />
            <meta property="og:description" content="Sharing the natural world." />

            <meta name="twitter:site" content={process.env.appTwitter} />

            <meta name="application-name" content={process.env.appName} />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-title" content={process.env.appName} />

            <meta name="description" content="Sharing the natural world." />

            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />

            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />

            <link rel="shortcut icon" href={href('/assets/icons/transparent/icon128.png')} type="image/png" />

            <link rel="apple-touch-icon" href={href('/assets/icons/icon32.png')} />
            <link rel="apple-touch-icon" sizes="57x57" href={href('/assets/icons/icon57.png')} />
            <link rel="apple-touch-icon" sizes="72x72" href={href('/assets/icons/icon72.png')} />
            <link rel="apple-touch-icon" sizes="76x76" href={href('/assets/icons/icon76.png')} />
            <link rel="apple-touch-icon" sizes="114x114" href={href('/assets/icons/icon114.png')} />
            <link rel="apple-touch-icon" sizes="120x120" href={href('/assets/icons/icon120.png')} />
            <link rel="apple-touch-icon" sizes="144x144" href={href('/assets/icons/icon144.png')} />
            <link rel="apple-touch-icon" sizes="152x152" href={href('/assets/icons/icon152.png')} />
            <link rel="apple-touch-icon" sizes="180x180" href={href('/assets/icons/icon180.png')} />
        </>
    );
}

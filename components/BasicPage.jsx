/* global process */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import FeedWithMap from './FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function BasicPage({ href }) {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split(/\?/)[1]);
        const url = resolveUrl(`${i}/`, process.env.contentHost);
        if (url) {
            setFeedUrl(url);
        }
    }, []);

    return <FeedWithMap url={feedUrl} href={href} />;
}

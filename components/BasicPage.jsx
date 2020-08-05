/* global process */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import FeedWithMap from './FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function BasicPage({ groupByTag, tagFilter, tagPrefix, href }) {
    const router = useRouter();

    const [feedUrl, setFeedUrl] = useState(null);
    const [tag, setTag] = useState(null);

    useEffect(() => {
        const { i, t } = queryString.parse(router.asPath.split(/\?/)[1]);
        const url = resolveUrl(`${i}/`, process.env.contentHost);
        if (url) {
            setFeedUrl(url);
        }
        if (tagFilter && t) {
            setTag(t);
        }
    }, []);

    return (
        <FeedWithMap
            groupByTag={groupByTag}
            tagPrefix={tagPrefix}
            tagFilter={tagFilter ? tag : undefined}
            url={feedUrl}
            href={href}
        />
    );
}

/* eslint-disable react/no-array-index-key */
/* global process URL */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _lines from 'underscore.string/lines';
import { resolveUrl, fetchYaml, shortUrl } from '../utils/fetch';
import { H1, H2, P } from '../components/Typography';
import Layout from '../components/Layout';

export default function Profile() {
    const router = useRouter();

    const [username, setUsername] = useState();
    const [feedUrl, setFeedUrl] = useState();
    const [profile, setProfile] = useState();

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split(/\?/)[1]);
        if (i) {
            setUsername(new URL(i, process.env.CONTENT_HOST).pathname.split('/', 2)[1]);
            const url = resolveUrl(i, process.env.CONTENT_HOST);
            setFeedUrl(shortUrl(resolveUrl(`./items/index.json`, url)));
            fetchYaml(url).then((obj) => obj && setProfile(obj));
        }
    }, []);

    return (
        <Layout title={username} href={`/items?i=${encodeURIComponent(feedUrl)}`}>
            <H1>Profile</H1>
            <H2>{profile && profile.name}</H2>
            {profile && profile.organisation && (
                <>
                    <P>
                        <strong>{profile.organisation}</strong>
                    </P>
                </>
            )}
            {profile && profile.bio && (
                <>
                    {_lines(profile.bio)
                        .filter(Boolean)
                        .map((p, i) => (
                            <P key={i}>{p}</P>
                        ))}
                </>
            )}
            {profile && profile.website && (
                <>
                    <a href={profile.website}>{profile.website}</a>
                </>
            )}
        </Layout>
    );
}

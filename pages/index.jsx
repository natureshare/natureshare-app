/* global process */

import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function Index() {
    return (
        <FeedWithMap
            url={resolveUrl('./', process.env.contentHost)}
            href="profile"
            h1={process.env.appName}
        />
    );
}

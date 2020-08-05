/* global process */

import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function Index() {
    return (
        <FeedWithMap
            h1={process.env.appName}
            url={resolveUrl('/index.json', process.env.contentHost)}
            href="items"
        />
    );
}

/* global process */

import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function Index() {
    return <FeedWithMap defualtUrl={resolveUrl('/index.json', process.env.CONTENT_HOST)} />;
}

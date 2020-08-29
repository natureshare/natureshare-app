/* global process */

import FeedWithMap from '../components/FeedWithMap';
import { resolveUrl } from '../utils/fetch';

export default function Collections() {
    return <FeedWithMap defaultUrl={resolveUrl('/_collections/index.json', process.env.CONTENT_HOST)} />;
}

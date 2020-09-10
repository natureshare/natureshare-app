/* eslint-disable react/no-array-index-key */
/* global URL */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import _endsWith from 'lodash/endsWith';
import _find from 'lodash/find';
import _startsWith from 'lodash/startsWith';
import _startCase from 'lodash/startCase';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import FeedWithMap from '../components/FeedWithMap';
import { shortUrl } from '../utils/fetch';
import Link from '../components/Link';
import IdHeader from '../components/items/IdHeader';
import CategoryIcon from '../components/CategoryIcon';

const HeaderButton = ({ text, href, as }) => (
    <Grid key={text} item>
        <Button
            component={Link}
            href={href}
            as={as}
            variant="outlined"
            color="primary"
            startIcon={<CategoryIcon category={text} />}
        >
            {text}
        </Button>
    </Grid>
);

export default function Items() {
    return (
        <FeedWithMap>
            {({ feedUrl, getParams, filterTags, items }) => (
                <>
                    {filterTags && filterTags.length !== 0 && (
                        <Box mt={1}>
                            <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" />}
                                maxItems={5}
                            >
                                <Typography variant="h4">
                                    <Link
                                        href="/items"
                                        as={`/items?${getParams({ g: '', t: [] })}`}
                                    >
                                        Items
                                    </Link>
                                </Typography>
                                {filterTags &&
                                    filterTags.map((t, n) =>
                                        t
                                            .split('~')
                                            .filter(Boolean)
                                            .map((t2, t2n, tsplit) => (
                                                <Typography key={t} variant="h4">
                                                    <Link
                                                        href="/items"
                                                        as={`/items?${getParams({
                                                            g: '',
                                                            t: [
                                                                ...filterTags.slice(0, n),
                                                                tsplit.slice(0, t2n + 1).join('~') +
                                                                    (tsplit.length - 1 !== t2n
                                                                        ? '~'
                                                                        : ''),
                                                            ],
                                                        })}`}
                                                    >
                                                        {_startCase(t2)}
                                                    </Link>
                                                </Typography>
                                            )),
                                    )}
                            </Breadcrumbs>
                        </Box>
                    )}
                    {feedUrl && (
                        <Box mt={2}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {(!filterTags || filterTags.length === 0) &&
                                    _endsWith(feedUrl, '/items/index.json') && (
                                        <>
                                            <HeaderButton
                                                text="profile"
                                                href="/profile"
                                                as={`/profile?i=${encodeURIComponent(
                                                    shortUrl(
                                                        new URL('../../profile.yaml', feedUrl).href,
                                                    ),
                                                )}`}
                                            />
                                            <HeaderButton
                                                text="collections"
                                                href="/items"
                                                as={`/items?${getParams({
                                                    i: shortUrl(
                                                        new URL(
                                                            '../collections/index.json',
                                                            feedUrl,
                                                        ).href,
                                                    ),
                                                })}`}
                                            />
                                        </>
                                    )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'id~')),
                                ) && (
                                    <HeaderButton
                                        text="ids"
                                        href="/items"
                                        as={`/items?${getParams({
                                            t: [...(filterTags || []), 'id~'],
                                        })}`}
                                    />
                                )}
                                {_find(
                                    items,
                                    (i) => i.tags && _find(i.tags, (t) => _startsWith(t, 'tag~')),
                                ) && (
                                    <HeaderButton
                                        text="tags"
                                        href="/items"
                                        as={`/items?${getParams({
                                            t: [...(filterTags || []), 'tag~'],
                                        })}`}
                                    />
                                )}
                            </Grid>
                        </Box>
                    )}
                    {filterTags && filterTags.filter((t) => _startsWith(t, 'id~')).length !== 0 && (
                        <Box mt={2}>
                            {filterTags
                                .filter((t) => _startsWith(t, 'id~'))
                                .map((t) => (
                                    <IdHeader key={t} indexUrl={feedUrl} id={t.split('~', 2)[1]} />
                                ))}
                        </Box>
                    )}
                </>
            )}
        </FeedWithMap>
    );
}

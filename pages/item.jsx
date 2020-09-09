/* global process URL URLSearchParams */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { useState, useEffect, useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _startsWith from 'lodash/startsWith';
import _endsWith from 'lodash/endsWith';
import _sortBy from 'lodash/sortBy';
import _isArray from 'lodash/isArray';
import _truncate from 'lodash/truncate';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExternalSourceIcon from 'mdi-material-ui/OpenInNew';
import HistoryIcon from 'mdi-material-ui/FormatListNumbered';
import ChangelogIcon from 'mdi-material-ui/TimelineText';
import moment from 'moment';
import { H1, P, Body1, Body2 } from '../components/Typography';
import Link from '../components/Link';
import Layout from '../components/Layout';
import GeoJsonMap from '../components/GeoJsonMap';
import LicenseLink from '../components/LicenseLink';
import ActionFormDialog from '../components/ActionFormDialog';
import { resolveUrl, fetchYaml, shortUrl } from '../utils/fetch';
import FileIcon from '../components/FileIcon';
import Video from '../components/item/Video';
import ButtonGrid from '../components/ButtonGrid';

const isoDate = (str) => (str ? moment(str).toISOString(true) : '');

const PageSection = ({ title, children, actions }) => (
    <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{ width: '100%' }}>{children}</div>
        </AccordionDetails>
        {actions && <AccordionActions>{actions}</AccordionActions>}
    </Accordion>
);

export default function Item() {
    const router = useRouter();

    const [itemUrl, setItemUrl] = useState();
    const [userItemsUrl, setUserItemsUrl] = useState();

    const [userName, setUserName] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const [item, setItem] = useState(null);
    const [geo, setGeo] = useState(null);

    const [showMedia, setShowMedia] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

    const linkParams = (t) => {
        if (itemUrl) {
            const i = shortUrl(userItemsUrl);
            return new URLSearchParams({ i, t });
        }
        return {};
    };

    useEffect(() => {
        const { i } = queryString.parse(router.asPath.split('?', 2)[1]);

        const _itemUrl = i
            ? resolveUrl(_endsWith(i, '.yaml') ? i : `${i}.yaml`, process.env.CONTENT_HOST)
            : null;

        setItemUrl(_itemUrl);

        if (_itemUrl) {
            fetchYaml(_itemUrl).then((obj) => {
                if (obj) {
                    setItem(obj);
                    if (obj.latitude && obj.longitude) {
                        setGeo({
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [obj.longitude, obj.latitude],
                                    },
                                    properties: {
                                        id: shortUrl(_itemUrl),
                                        title: (obj.datetime || obj.created_at).split('T')[0],
                                    },
                                },
                            ],
                        });
                    }
                }
            });

            setUserItemsUrl(resolveUrl('../../../items/index.json', _itemUrl));

            const _profileUrl = resolveUrl('../../../profile.yaml', _itemUrl);
            fetchYaml(_profileUrl).then((obj) => obj && setUserProfile(obj));

            setUserName(new URL('.', _profileUrl).pathname.split('/', 2)[1]);
        }
    }, []);

    const githubCommitsUrl = useMemo(() => {
        if (itemUrl) {
            if (_startsWith(shortUrl(itemUrl), './')) {
                return new URL(
                    shortUrl(itemUrl),
                    `https://github.com/${process.env.GH_CONTENT_PATH}/commits/master/`,
                ).href;
            }
        }
        return null;
    }, [itemUrl]);

    const githubBlameUrl = useMemo(() => {
        if (itemUrl) {
            if (_startsWith(shortUrl(itemUrl), './')) {
                return new URL(
                    shortUrl(itemUrl),
                    `https://github.com/${process.env.GH_CONTENT_PATH}/blame/master/`,
                ).href;
            }
        }
        return null;
    }, [itemUrl]);

    const dateHeading = (date) => {
        try {
            return moment.parseZone(date).format('Do MMM YYYY, h:mma');
        } catch (e) {
            return date;
        }
    };

    const h1 = useMemo(() => {
        if (item) {
            if (item.id && item.id.length !== 0) {
                if (item.id.length === 1) {
                    return typeof item.id[0] === 'string' ? item.id[0] : item.id[0].name;
                }
                return `${item.id.length} ids`;
            }
            if (item.datetime) {
                return dateHeading(item.datetime);
            }
            if (item.created_at || item.updated_at) {
                return dateHeading(item.created_at || item.updated_at);
            }
            return 'Item';
        }
        return 'Loading...';
    }, [item]);

    const h1sub = useMemo(() => {
        if (
            item &&
            item.id &&
            item.id.length === 1 &&
            typeof item.id[0] === 'object' &&
            item.id[0].common
        ) {
            return `(${item.id[0].common})`;
        }
        return '';
    }, [item]);

    return (
        <Layout title={userName} href={`/items?i=${shortUrl(userItemsUrl)}`}>
            <H1>
                {h1}{' '}
                {h1sub && (
                    <>
                        <br />
                        <small style={{ color: 'grey' }}>{h1sub}</small>
                    </>
                )}
            </H1>
            <P>
                {item && (
                    <strong>
                        {dateHeading(item.datetime || item.created_at || item.updated_at)}
                    </strong>
                )}
                <br />
                <em>by {(userProfile && userProfile.name) || userName}</em>
            </P>
            <Box mt={3} mb={3}>
                <ButtonGrid
                    justify="flex-start"
                    items={[
                        ...((item &&
                            item.source &&
                            item.source.map((source) => (
                                <Button
                                    key={source}
                                    href={source.href}
                                    target="_blank"
                                    startIcon={<ExternalSourceIcon />}
                                    size="small"
                                    variant="outlined"
                                >
                                    {source.name}
                                </Button>
                            ))) ||
                            []),
                        <Button
                            href={itemUrl}
                            target="_blank"
                            startIcon={<FileIcon type="yaml" />}
                            size="small"
                            variant="outlined"
                        >
                            YAML
                        </Button>,
                        githubBlameUrl && (
                            <Button
                                href={githubBlameUrl}
                                target="_blank"
                                startIcon={<HistoryIcon />}
                                size="small"
                                variant="outlined"
                            >
                                History
                            </Button>
                        ),
                        githubCommitsUrl && (
                            <Button
                                href={githubCommitsUrl}
                                target="_blank"
                                startIcon={<ChangelogIcon />}
                                size="small"
                                variant="outlined"
                            >
                                Changelog
                            </Button>
                        ),
                    ]}
                />
            </Box>
            {item && item.photos && item.photos.length > 0 && (
                <Box mt={3} mb={3}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {_sortBy(item.photos, ['primary']).map(
                            ({
                                original_url: original,
                                thumbnail_url: thumbnail,
                                source,
                                href,
                                attribution,
                                license,
                            }) => (
                                <Grid key={thumbnail} item xs={12} sm={6}>
                                    <Card>
                                        <a
                                            href={thumbnail}
                                            rel="nofollow"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{
                                                        height: '33vh',
                                                    }}
                                                    image={thumbnail}
                                                />
                                            </CardActionArea>
                                        </a>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setShowPhoto(original);
                                                    return true;
                                                }}
                                            >
                                                Full Size
                                            </Button>
                                            {(attribution || source) && (
                                                <div
                                                    title={`Photo by ${attribution} (${
                                                        license || ''
                                                    })`}
                                                >
                                                    <Button
                                                        disabled={!href}
                                                        size="small"
                                                        href={href}
                                                        target="_blank"
                                                    >
                                                        &copy;{' '}
                                                        {_truncate(attribution || source, {
                                                            length: 32,
                                                        })}
                                                    </Button>
                                                </div>
                                            )}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ),
                        )}
                    </Grid>
                    <Dialog
                        open={Boolean(showPhoto)}
                        onClose={() => setShowPhoto(false)}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle>Show original photo?</DialogTitle>
                        <DialogContent>
                            <P>File may be very large. Are you sure?</P>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    setShowPhoto(false);
                                    setTimeout(() => {
                                        window.location = showPhoto;
                                    }, 50);
                                }}
                            >
                                Ok
                            </Button>
                            <Button onClick={() => setShowPhoto(false)} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
            {item && item.videos && item.videos.length > 0 && (
                <PageSection title="Video">
                    {!showMedia && (
                        <Button variant="outlined" onClick={() => setShowMedia(true)}>
                            Show Video
                        </Button>
                    )}
                    {showMedia &&
                        item.videos.map((video) => (
                            <Video
                                key={video.thumbnail_url || `${video.source}${video.id}`}
                                {...video}
                            />
                        ))}
                </PageSection>
            )}
            {item && item.audio && item.audio.length > 0 && (
                <PageSection title="Audio">
                    {!showMedia && (
                        <Button variant="outlined" onClick={() => setShowMedia(true)}>
                            Show Audio
                        </Button>
                    )}
                    {showMedia &&
                        item.audio.map(({ original_url: original }) => (
                            <audio key={original} controls src={original} style={{ width: '100%' }}>
                                [Audio Not Supported]
                            </audio>
                        ))}
                </PageSection>
            )}
            {item && item.description && item.description.length > 0 && (
                <PageSection title="Description">
                    <P>{item.description}</P>
                </PageSection>
            )}
            {item && item.id && item.id.length > 0 && (
                <PageSection title="Identification">
                    <List disablePadding>
                        {item.id
                            .map((i) =>
                                typeof i === 'string' ? { name: i.split('//', 1)[0].trim() } : i,
                            )
                            .map(({ name, common, by }, i) => (
                                <ListItem
                                    key={name}
                                    button
                                    divider={i + 1 !== item.id.length}
                                    component={Link}
                                    href="/items"
                                    as={`/items?${linkParams(`id~${name}`)}`}
                                >
                                    <ListItemText
                                        primary={name}
                                        secondary={
                                            <>
                                                {common && <Body1>{common}</Body1>}
                                                {by && (
                                                    <Body2>
                                                        id. by {_isArray(by) ? by.join(', ') : by}
                                                    </Body2>
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                    </List>
                </PageSection>
            )}
            {item && item.tags && item.tags.length > 0 && (
                <PageSection title="Tags">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        {item.tags.map((tag) => (
                            <Grid item key={tag}>
                                <Chip
                                    label={_truncate(tag)}
                                    title={tag}
                                    variant="outlined"
                                    onClick={() => {}}
                                    component={Link}
                                    href="/items"
                                    as={`/items?${linkParams(`tag~${tag}`)}`}
                                    style={{ wordBreak: 'break-all' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </PageSection>
            )}
            {item && item.latitude && item.longitude && (
                <PageSection title="Location">
                    {item.location_name && <P>{item.location_name}</P>}
                    <GeoJsonMap geo={geo} />
                </PageSection>
            )}
            {item && (
                <PageSection
                    title="Collections"
                    actions={
                        <ActionFormDialog
                            {...{
                                title: 'Add to Collection',
                                url: window.location.href,
                                action: 'itemToCollection',
                                target: itemUrl,
                                fields: {
                                    collection: {
                                        label: 'Collection Name',
                                        autoFocus: true,
                                        inputLabelProps: { shrink: true },
                                        multiline: true,
                                        helperText:
                                            'Lowercase letters, numbers, dashes and underscores are allowed.',
                                    },
                                },
                            }}
                        />
                    }
                >
                    <List disablePadding>
                        {(!item.collections || item.collections.length === 0) && (
                            <ListItem>
                                <ListItemText secondary={<em>None</em>} />
                            </ListItem>
                        )}
                        {item.collections &&
                            item.collections.length > 0 &&
                            item.collections.map((name, i) => (
                                <ListItem
                                    key={name}
                                    button
                                    divider={i + 1 !== item.collections.length}
                                    component={Link}
                                    href="/items"
                                    as={`/items?i=${encodeURIComponent(
                                        shortUrl(
                                            resolveUrl(
                                                `../../../collections/${name}/aggregate/index.json`,
                                                itemUrl,
                                            ),
                                        ),
                                    )}`}
                                    style={{ wordBreak: 'break-all' }}
                                >
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))}
                    </List>
                </PageSection>
            )}
            {item && (
                <PageSection
                    title="Discussion"
                    actions={
                        <ActionFormDialog
                            {...{
                                title: 'Add a Comment',
                                url: window.location.href,
                                action: 'itemComment',
                                target: itemUrl,
                                recipient: userName,
                                fields: {
                                    comment: {
                                        label: 'Comment',
                                        autoFocus: true,
                                        inputLabelProps: { shrink: true },
                                        multiline: true,
                                    },
                                },
                            }}
                        />
                    }
                >
                    <List disablePadding>
                        {(!item.comments || item.comments.length === 0) && (
                            <ListItem>
                                <ListItemText secondary={<em>None</em>} />
                            </ListItem>
                        )}
                        {item.comments &&
                            item.comments.length !== 0 &&
                            item.comments.map(
                                ({ created_at: createdAt, username: commentUser, text }, i) => (
                                    <ListItem
                                        key={commentUser + createdAt}
                                        divider={i + 1 !== item.comments.length}
                                    >
                                        <ListItemText
                                            primary={
                                                <Link
                                                    href="/profile"
                                                    as={`/profile?i=${encodeURIComponent(
                                                        `./${commentUser}`,
                                                    )}`}
                                                >
                                                    {commentUser}
                                                </Link>
                                            }
                                            secondary={
                                                <>
                                                    <Body2>
                                                        {createdAt && createdAt.split('T')[0]}
                                                    </Body2>
                                                    <Body1>&quot;{text}&quot;</Body1>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ),
                            )}
                    </List>
                </PageSection>
            )}
            {item && (
                <PageSection title="Meta">
                    <List disablePadding>
                        {item.datetime && (
                            <ListItem>
                                <ListItemText
                                    primary="Date-Time"
                                    secondary={`${item.datetime}`.replace('T', ' ')}
                                />
                            </ListItem>
                        )}
                        {item.photos && item.photos.length > 0 && (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Date-Time from Camera"
                                        secondary={item.photo_datetime_used ? 'Yes' : 'No'}
                                    />
                                </ListItem>
                                {item.non_identifying_photo && (
                                    <ListItem>
                                        <ListItemText
                                            primary="Non-Identifying Photo"
                                            secondary="Yes"
                                        />
                                    </ListItem>
                                )}
                                {item.photo_quality && (
                                    <ListItem>
                                        <ListItemText
                                            primay="Photo Quality"
                                            secondary={item.photo_quality}
                                        />
                                    </ListItem>
                                )}
                            </>
                        )}
                        {item.latitude && item.longitude && (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Location"
                                        secondary={`${parseFloat(item.latitude).toFixed(
                                            6,
                                        )} ${parseFloat(item.longitude).toFixed(6)}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Location from Camera (Geotag)"
                                        secondary={item.photo_geotag_used ? 'Yes' : 'No'}
                                    />
                                </ListItem>
                            </>
                        )}
                        <ListItem>
                            <ListItemText primary="Created" secondary={isoDate(item.created_at)} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Updated" secondary={isoDate(item.updated_at)} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Photo(s) License"
                                secondary={
                                    <>
                                        {item.photos &&
                                            item.photos.map((photo, n) => (
                                                <span key={photo.original_url}>
                                                    {n}.{' '}
                                                    <LicenseLink
                                                        license={photo.license || item.license}
                                                    />{' '}
                                                    {photo.attribution}
                                                    <br />
                                                </span>
                                            ))}
                                    </>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Document License"
                                secondary={<LicenseLink license={item.license} />}
                            />
                        </ListItem>
                    </List>
                </PageSection>
            )}
        </Layout>
    );
}

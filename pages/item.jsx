/* global process URL URLSearchParams */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardActions from '@material-ui/core/CardActions';
import { useState, useEffect, useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _last from 'lodash/last';
import _startsWith from 'lodash/startsWith';
import _endsWith from 'lodash/endsWith';
import _sortBy from 'lodash/sortBy';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { H1, H2, H3, P, Body1, Body2 } from '../components/Typography';
import Link from '../components/Link';
import Layout from '../components/Layout';
import GeoJsonMap from '../components/GeoJsonMap';
import LicenseLink from '../components/LicenseLink';
import AddCommentFormDialog from '../components/item/AddCommentFormDialog';
import AddToCollectionFormDialog from '../components/item/AddToCollectionFormDialog';
import { resolveUrl, fetchYaml, shortUrl } from '../utils/fetch';

export default function Item() {
    const router = useRouter();

    const [itemUrl, setItemUrl] = useState();
    const [sourceUrl, setSourceUrl] = useState();
    const [userItemsUrl, setUserItemsUrl] = useState();
    const [profileUrl, setProfileUrl] = useState(null);

    const [userName, setUserName] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const [item, setItem] = useState(null);
    const [geo, setGeo] = useState(null);

    const [showMedia, setShowMedia] = useState(false);
    const [showPhoto, setShowPhoto] = useState();

    const itemsParams = (p, t) => {
        if (itemUrl) {
            const i = shortUrl(sourceUrl || userItemsUrl);
            return new URLSearchParams({ i, p, t });
        }
        return {};
    };

    useEffect(() => {
        const { i, s } = queryString.parse(router.asPath.split('?', 2)[1]);

        const _itemUrl = i
            ? resolveUrl(_endsWith(i, '.yaml') ? i : `${i}.yaml`, process.env.contentHost)
            : null;
        const _sourceUrl = s ? resolveUrl(s, process.env.contentHost) : null;

        setItemUrl(_itemUrl);
        setSourceUrl(_sourceUrl);

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

            setUserItemsUrl(resolveUrl('../../../_index/items/index.json', _itemUrl));

            const _profileUrl = resolveUrl('../../../profile.yaml', _itemUrl);
            setProfileUrl(_profileUrl);
            fetchYaml(_profileUrl).then((obj) => obj && setUserProfile(obj));

            setUserName(new URL('.', _profileUrl).pathname.split('/', 2)[1]);
        }
    }, []);

    const githubUrl = useMemo(() => {
        if (itemUrl) {
            if (_startsWith(shortUrl(itemUrl), './')) {
                return new URL(
                    shortUrl(itemUrl),
                    `https://github.com/${process.env.githubContentPath}/tree/master/`,
                ).href;
            }
        }
        return null;
    }, [itemUrl]);

    return (
        <Layout title={userName} href={`/items?i=${shortUrl(userItemsUrl)}`}>
            <H1>
                {(item && item.datetime && item.datetime.replace('T', ' ').replace('Z', '')) ||
                    'Loading...'}
            </H1>
            <H2>
                by{' '}
                {(userProfile && userProfile.name) ||
                    (profileUrl && _last(profileUrl.split('/'))) ||
                    'Loading...'}
            </H2>
            {item && item.photos && item.photos.length > 0 && (
                <Box mt={3}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {_sortBy(item.photos, ['primary']).map(
                            ({ original_url: original, thumbnail_url: thumbnail }) => (
                                <Grid key={thumbnail} item xs={12} sm={6} md={4}>
                                    <Card>
                                        <a
                                            href={thumbnail}
                                            rel="nofollow"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    style={{
                                                        height: '250px',
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
                                                original file
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ),
                        )}
                    </Grid>
                    <Dialog
                        open={showPhoto}
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
                                    window.location = showPhoto;
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
                <Box mt={3}>
                    <H3>Video</H3>
                    {!showMedia && (
                        <Button variant="outlined" onClick={() => setShowMedia(true)}>
                            Show Video
                        </Button>
                    )}
                    {showMedia &&
                        item.videos.map(({ original_url: original, thumbnail_url: thumbnail }) => (
                            <video
                                key={original}
                                controls
                                src={original}
                                poster={thumbnail}
                                style={{ width: '100%' }}
                            >
                                [Video Not Supported]
                            </video>
                        ))}
                </Box>
            )}
            {item && item.audio && item.audio.length > 0 && (
                <Box mt={3}>
                    <H3>Audio</H3>
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
                </Box>
            )}
            {item && item.description && item.description.length > 0 && (
                <Box mt={3}>
                    <H3>Description</H3>
                    <P>{item.description}</P>
                </Box>
            )}
            {item && item.id && item.id.length > 0 && (
                <Box mt={3}>
                    <H3>Identification</H3>
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
                                    as={`/items?${itemsParams('id', name)}`}
                                >
                                    <ListItemText
                                        primary={name}
                                        secondary={
                                            <>
                                                {common && <Body1>{common}</Body1>}
                                                {by && <Body2>id. by {by}</Body2>}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                    </List>
                </Box>
            )}
            {item && item.tags && item.tags.length > 0 && (
                <Box mt={3}>
                    <H3>Tags</H3>
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
                                    label={tag}
                                    variant="outlined"
                                    onClick={() => {}}
                                    component={Link}
                                    href="/items"
                                    as={`/items?${itemsParams('tag', tag)}`}
                                    style={{ wordBreak: 'break-all' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {item && (
                <Box mt={3}>
                    <H3>Collections</H3>
                    {item.collections && item.collections.length > 0 && (
                        <List disablePadding>
                            {item.collections.map((name, i) => (
                                <ListItem
                                    key={name}
                                    button
                                    divider={i + 1 !== item.collections.length}
                                    component={Link}
                                    href="/items"
                                    as={`/items?i=${encodeURIComponent(
                                        shortUrl(
                                            resolveUrl(
                                                `../../../_index/collections/${name}/aggregate/index.json`,
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
                    )}
                    <Box mt={2}>
                        <AddToCollectionFormDialog
                            data={{
                                url: window.location.href,
                                action: 'itemToCollection',
                                target: itemUrl,
                            }}
                        />
                    </Box>
                </Box>
            )}
            {item && item.latitude && item.longitude && (
                <Box mt={3}>
                    <H3>Location</H3>
                    {item.location_name && <P>{item.location_name}</P>}
                    <GeoJsonMap geo={geo} />
                </Box>
            )}
            {item && (
                <Box mt={3}>
                    <H3>Discussion</H3>
                    {item.comments && item.comments.length !== 0 && (
                        <List disablePadding>
                            {item.comments.map(
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
                    )}
                    <Box mt={2}>
                        <AddCommentFormDialog
                            data={{
                                recipient: userName,
                                url: window.location.href,
                                action: 'itemComment',
                                target: itemUrl,
                            }}
                        />
                    </Box>
                </Box>
            )}
            {item && (
                <Box mt={3}>
                    <H3>Meta</H3>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableBody>
                                {item.datetime && (
                                    <TableRow>
                                        <TableCell component="th">Observation</TableCell>
                                        <TableCell>
                                            {`${item.datetime}`.replace('T', ' ')}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {item.photos && item.photos.length > 0 && (
                                    <>
                                        <TableRow>
                                            <TableCell component="th">
                                                Date-Time From Camera
                                            </TableCell>
                                            <TableCell>
                                                {item.photo_datetime_used ? 'Yes' : 'No'}
                                            </TableCell>
                                        </TableRow>
                                        {item.non_identifying_photo && (
                                            <TableRow>
                                                <TableCell component="th">
                                                    Non-Identifying Photo
                                                </TableCell>
                                                <TableCell>Yes</TableCell>
                                            </TableRow>
                                        )}
                                        {item.photo_quality && (
                                            <TableRow>
                                                <TableCell component="th">Photo Quality</TableCell>
                                                <TableCell>{item.photo_quality}</TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                )}
                                {item.latitude && item.longitude && (
                                    <>
                                        <TableRow>
                                            <TableCell component="th">Location</TableCell>
                                            <TableCell>
                                                {parseFloat(item.latitude).toFixed(6)},{' '}
                                                {parseFloat(item.longitude).toFixed(6)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th">Photo Geo-Tag Used</TableCell>
                                            <TableCell>
                                                {item.photo_geotag_used ? 'Yes' : 'No'}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                                <TableRow>
                                    <TableCell component="th">Created</TableCell>
                                    <TableCell>
                                        {item.created_at && item.created_at.split('T')[0]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th">Updated</TableCell>
                                    <TableCell>
                                        {item.updated_at && item.updated_at.split('T')[0]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th">Photo(s) License</TableCell>
                                    <TableCell>
                                        <LicenseLink license={item.license} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th">Document License</TableCell>
                                    <TableCell>
                                        <LicenseLink license={item.license} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th">External</TableCell>
                                    <TableCell>
                                        <ButtonGroup size="small">
                                            <Button href={itemUrl} target="_blank">
                                                YAML
                                            </Button>
                                            {githubUrl && (
                                                <Button href={githubUrl} target="_blank">
                                                    GitHub
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Layout>
    );
}

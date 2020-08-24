/* global process URL URLSearchParams */

import NextLink from 'next/link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from 'mdi-material-ui/StarOutline';
import ItemIcon from 'mdi-material-ui/Eye';
import ImageIcon from 'mdi-material-ui/Camera';
import VideoIcon from 'mdi-material-ui/Video';
import AudioIcon from 'mdi-material-ui/VolumeHigh';
import MapMarkerCheck from 'mdi-material-ui/MapMarkerCheckOutline';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import LeafIcon from 'mdi-material-ui/Leaf';
import TagIcon from 'mdi-material-ui/Tag';
import queryString from 'query-string';
import { shortUrl } from '../utils/fetch';

const icons = {
    itemCount: <ItemIcon />,
    imageCount: <ImageIcon />,
    videoCount: <VideoIcon />,
    audioCount: <AudioIcon />,
    idCount: <LeafIcon />,
    tagCount: <TagIcon />,
};

const ItemCard = ({
    title,
    image,
    date_published: datePublished,
    author,
    _geo,
    _meta,
    hideTitle,
}) => (
    <Card>
        <CardActionArea>
            <CardMedia
                style={{
                    height: '140px',
                    backgroundColor: '#EEE',
                    textAlign: 'right',
                }}
                image={image}
            >
                {!image && (
                    <Typography
                        variant="body1"
                        style={{
                            color: 'grey',
                            lineHeight: '140px',
                            textAlign: 'center',
                        }}
                    >
                        No Photo
                    </Typography>
                )}
            </CardMedia>
            <CardContent>
                <Typography variant="body2" component="div" style={{ margin: 0 }}>
                    {_meta.date || (datePublished || '').split('T', 1)[0] || 'No date'}
                    {_geo && _geo.coordinates && (
                        <MapMarkerCheck
                            style={{ fontSize: 12, color: '#555', marginLeft: '3px' }}
                        />
                    )}
                    {_meta && _meta.featured && (
                        <StarIcon style={{ fontSize: 12, color: '#555', marginLeft: '3px' }} />
                    )}
                </Typography>
                {author && author.name && (
                    <Typography
                        variant="body2"
                        component="div"
                        style={{ margin: 0, fontWeight: 500 }}
                    >
                        {author.name}
                    </Typography>
                )}
                {title && (!hideTitle || !hideTitle.includes(title)) && (
                    <Typography variant="h2" component="div">
                        {title}
                    </Typography>
                )}
                <Box mt={1}>
                    {_meta && (
                        <>
                            {Object.keys(icons).map(
                                (i) =>
                                    (_meta[i] && _meta[i] !== 0 && (
                                        <Chip
                                            key={i}
                                            size="small"
                                            icon={icons[i]}
                                            label={_meta[i]}
                                            style={{
                                                backgroundColor: '#FFF',
                                            }}
                                        />
                                    )) ||
                                    '',
                            )}
                        </>
                    )}
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default function FeedItemCard({ url, sourceUrl, ...item }) {
    const appHost = new URL(process.env.APP_HOST).host;
    const itemUrl = new URL(url, process.env.APP_HOST);

    if (itemUrl.host === appHost) {
        const { i, ...query } = queryString.parse(itemUrl.search.split('?', 2)[1]);

        return (
            <NextLink
                href={itemUrl.pathname}
                as={`${itemUrl.pathname}?${new URLSearchParams({
                    i: shortUrl(i),
                    s: sourceUrl,
                    ...query,
                })}`}
            >
                <a>
                    <ItemCard {...item} />
                </a>
            </NextLink>
        );
    }

    return (
        <a href={url}>
            <ItemCard {...item} />
        </a>
    );
}

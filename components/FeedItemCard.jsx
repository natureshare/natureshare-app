import NextLink from 'next/link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from 'mdi-material-ui/Star';
import ItemIcon from 'mdi-material-ui/Eye';
import ImageIcon from 'mdi-material-ui/Camera';
import VideoIcon from 'mdi-material-ui/Video';
import AudioIcon from 'mdi-material-ui/VolumeHigh';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import LeafIcon from 'mdi-material-ui/Leaf';
import TagIcon from 'mdi-material-ui/Tag';

const icons = {
    itemCount: <ItemIcon />,
    imageCount: <ImageIcon />,
    videoCount: <VideoIcon />,
    audioCount: <AudioIcon />,
    idCount: <LeafIcon />,
    tagCount: <TagIcon />,
};

export default function FeedItemCard({
    href,
    hideTitle,
    id,
    title,
    image,
    date_published: datePublished,
    author,
    _meta,
}) {
    return (
        <NextLink
            href={`/${href}`}
            as={`/${href}?i=${encodeURIComponent(id.replace(process.env.contentHost, './'))}`}
        >
            <a>
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
                            {false && datePublished && (
                                <Typography variant="body2" component="div" style={{ margin: 0 }}>
                                    {datePublished.split('T', 1)[0]}
                                </Typography>
                            )}
                            {_meta && _meta.date && (
                                <Typography variant="body2" component="div" style={{ margin: 0 }}>
                                    {_meta.date}
                                </Typography>
                            )}
                            {author && author.name && (
                                <Typography
                                    variant="body2"
                                    component="div"
                                    style={{ margin: 0, fontWeight: 500 }}
                                >
                                    {author.name}
                                </Typography>
                            )}
                            {title && title !== hideTitle && (
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
                                                            marginRight: '0.25em',
                                                        }}
                                                    />
                                                )) ||
                                                '',
                                        )}
                                        {_meta.featured && (
                                            <Chip
                                                size="small"
                                                icon={<StarIcon />}
                                                label="Featured"
                                                style={{ backgroundColor: '#FFF' }}
                                            />
                                        )}
                                    </>
                                )}
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
        </NextLink>
    );
}

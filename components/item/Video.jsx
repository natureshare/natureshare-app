export default function Video({ original_url: original, thumbnail_url: thumbnail, source, href }) {
    if (source === 'flickr') {
        return (
            <>
                <a data-flickr-embed="true" href={href}>
                    <img src={thumbnail} width="640" height="360" alt="" />
                </a>
            </>
        );
    }

    if (original) {
        return (
            <video
                key={original}
                controls
                src={original}
                poster={thumbnail}
                style={{ width: '100%' }}
            >
                [Video Not Supported]
            </video>
        );
    }

    return <>[Video Not Supported]</>;
}

import Grid from '@material-ui/core/Grid';
import FeedItemCard from './FeedItemCard';

export default function FeedItemsGrid({ items, hideTitle }) {
    return (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
            {items &&
                items.length !== 0 &&
                items.map((i) => (
                    <Grid item key={i.id} xs={6} sm={4} md={3}>
                        <FeedItemCard {...i} hideTitle={hideTitle} />
                    </Grid>
                ))}
        </Grid>
    );
}

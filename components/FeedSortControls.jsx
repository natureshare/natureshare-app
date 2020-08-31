import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SortAscendingIcon from 'mdi-material-ui/SortAlphabeticalAscending';
import SortDescendingIcon from 'mdi-material-ui/SortAlphabeticalDescending';
import GridLargeIcon from 'mdi-material-ui/GridLarge';
import GridIcon from 'mdi-material-ui/Grid';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

export default function FeedSortControls({ itemsSort, itemsSortOrder, viewGrid, getParams }) {
    const router = useRouter();

    const sortOptions = {
        Title: 'title',
        'Date Published': 'date_published',
        'Date Modified': 'date_modified',
        // Meta:
        Date: '_meta.date',
        Featured: '_meta.featured',
        Items: '_meta.itemCount',
        Photos: '_meta.imageCount',
        Videos: '_meta.videoCount',
        Audio: '_meta.audioCount',
        Ids: '_meta.idCount',
        Tags: '_meta.tagsCount',
        Location: '_geo.coordinates',
        Users: '_meta.userCount',
    };

    const routerReplace = (opt) => {
        router.replace(router.pathname, `${router.pathname}?${getParams(opt)}`, { shallow: true });
        return true;
    };

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            alignContent="center"
            spacing={1}
        >
            <Grid item>
                <Select
                    value={itemsSort || 'default'}
                    onChange={(event) =>
                        routerReplace({
                            s: event.target.value === 'default' ? null : event.target.value,
                        })
                    }
                    label="Sort"
                    autoWidth
                    defaultValue="default"
                >
                    <MenuItem value="default">
                        <em>Sort</em>
                    </MenuItem>
                    {Object.keys(sortOptions).map((i) => (
                        <MenuItem key={i} value={sortOptions[i]}>
                            {i}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item>
                <IconButton
                    disabled={!itemsSort}
                    color="primary"
                    onClick={() => routerReplace({ o: itemsSortOrder === 'asc' ? '' : 'asc' })}
                >
                    {itemsSortOrder === 'asc' && <SortAscendingIcon />}
                    {itemsSortOrder !== 'asc' && <SortDescendingIcon />}
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton
                    color={viewGrid === 'lg' ? 'primary' : undefined}
                    onClick={() => routerReplace({ v: viewGrid === 'lg' ? '' : 'lg' })}
                >
                    {viewGrid === 'lg' && <GridLargeIcon />}
                    {viewGrid !== 'lg' && <GridIcon />}
                </IconButton>
            </Grid>
        </Grid>
    );
}

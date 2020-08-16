import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react';
import _fromPairs from 'lodash/fromPairs';
import IconButton from '@material-ui/core/IconButton';
import SortAscendingIcon from 'mdi-material-ui/SortAlphabeticalAscending';
import SortDescendingIcon from 'mdi-material-ui/SortAlphabeticalDescending';
import ImageIcon from 'mdi-material-ui/Camera';
import MapMarkerIcon from 'mdi-material-ui/MapMarkerCheckOutline';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';

const filterNext = {
    '': 'yes',
    yes: 'no',
    no: '',
};

export default function FeedSortControls({
    length,
    itemsSort,
    setItemsSort,
    itemsFilter,
    setItemsFilter,
}) {
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
    };

    const filterOptions = {
        Image: 'image',
        Location: '_geo.coordinates',
    };

    const filterIcons = {
        Image: <ImageIcon />,
        Location: <MapMarkerIcon />,
    };

    useEffect(() => {
        setItemsFilter({
            ...itemsFilter,
            ..._fromPairs(Object.values(filterOptions).map((i) => [i, ''])),
        });
    }, []);

    return (
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item>
                <IconButton
                    disabled={itemsSort[0] === 'default'}
                    color="primary"
                    onClick={() =>
                        setItemsSort([itemsSort[0], itemsSort[1] === 'asc' ? 'desc' : 'asc'])
                    }
                >
                    {itemsSort[1] === 'asc' && <SortAscendingIcon />}
                    {itemsSort[1] === 'desc' && <SortDescendingIcon />}
                </IconButton>
            </Grid>
            <Grid item style={{ paddingRight: '10px' }}>
                <Select
                    labelId="labelSortBy"
                    value={itemsSort[0]}
                    onChange={(event) => setItemsSort([event.target.value, itemsSort[1]])}
                    label="Sort By"
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
            {Object.keys(filterOptions).map((i) => (
                <Grid item key={i}>
                    <IconButton
                        onClick={() =>
                            setItemsFilter({
                                ...itemsFilter,
                                [filterOptions[i]]: filterNext[itemsFilter[filterOptions[i]]],
                            })
                        }
                    >
                        <Badge
                            badgeContent={itemsFilter[filterOptions[i]]}
                            invisible={itemsFilter[filterOptions[i]] === ''}
                            color="primary"
                            style={{
                                color: itemsFilter[filterOptions[i]] === '' ? 'inherit' : '#558b2f',
                            }}
                        >
                            {filterIcons[i]}
                        </Badge>
                    </IconButton>
                </Grid>
            ))}
            <Grid item style={{ marginLeft: '10px' }}>
                {length} items
            </Grid>
        </Grid>
    );
}

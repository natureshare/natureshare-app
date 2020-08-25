/* global URLSearchParams */

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _toPairs from 'lodash/toPairs';
import _pickBy from 'lodash/pickBy';
import IconButton from '@material-ui/core/IconButton';
import SortAscendingIcon from 'mdi-material-ui/SortAlphabeticalAscending';
import SortDescendingIcon from 'mdi-material-ui/SortAlphabeticalDescending';
import ImageIcon from 'mdi-material-ui/Camera';
import MapMarkerIcon from 'mdi-material-ui/MapMarkerCheckOutline';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

const filterNext = {
    '': 'yes',
    yes: 'no',
    no: '',
};

export default function FeedSortControls({ length, page, itemsSort, itemsSortOrder, itemsFilter }) {
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
    };

    const filterOptions = {
        Image: 'image',
        Location: '_geo.coordinates',
    };

    const filterIcons = {
        Image: <ImageIcon />,
        Location: <MapMarkerIcon />,
    };

    const setUrlSearchParams = (name, value) => {
        const params = new URLSearchParams(router.asPath.split('?', 2)[1]);
        if (value) params.set(name, value);
        else params.delete(name);
        router.push(router.pathname, `${router.pathname}?${params.toString()}`, { shallow: true });
        return true;
    };

    return (
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item>
                <IconButton
                    disabled={itemsSort === 'default'}
                    color="primary"
                    onClick={() =>
                        setUrlSearchParams('o', itemsSortOrder === 'asc' ? 'desc' : 'asc')
                    }
                >
                    {itemsSortOrder === 'asc' && <SortAscendingIcon />}
                    {itemsSortOrder === 'desc' && <SortDescendingIcon />}
                </IconButton>
            </Grid>
            <Grid item style={{ paddingRight: '10px' }}>
                <Select
                    value={itemsSort}
                    onChange={(event) => setUrlSearchParams('s', event.target.value)}
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
                            setUrlSearchParams(
                                'f',
                                _toPairs(
                                    _pickBy(
                                        {
                                            ...itemsFilter,
                                            [filterOptions[i]]:
                                                filterNext[itemsFilter[filterOptions[i]] || ''],
                                        },
                                        Boolean,
                                    ),
                                )
                                    .map((n) => n.join('~'))
                                    .join('|'),
                            )
                        }
                    >
                        <Badge
                            badgeContent={itemsFilter[filterOptions[i]] || ''}
                            invisible={!itemsFilter[filterOptions[i]]}
                            color="primary"
                            style={{
                                color: itemsFilter[filterOptions[i]] ? '#558b2f' : 'inherit',
                            }}
                        >
                            {filterIcons[i]}
                        </Badge>
                    </IconButton>
                </Grid>
            ))}
            <Grid item style={{ marginLeft: '10px' }}>
                {length} items
                {page && page !== 1 && ` (page ${page})`}
            </Grid>
        </Grid>
    );
}

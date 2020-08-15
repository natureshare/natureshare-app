import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _fromPairs from 'lodash/fromPairs';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(2),
        minWidth: 100,
    },
}));

export default function FeedSortControls({ itemsSort, setItemsSort, itemsFilter, setItemsFilter }) {
    const classes = useStyles();

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

    useEffect(() => {
        setItemsFilter({
            ...itemsFilter,
            ..._fromPairs(Object.values(filterOptions).map((i) => [i, ''])),
        });
    }, []);

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="labelSortBy">Sort By</InputLabel>
                <Select
                    labelId="labelSortBy"
                    value={itemsSort[0]}
                    onChange={(event) => setItemsSort([event.target.value, itemsSort[1]])}
                    label="Sort By"
                    autoWidth
                >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    {Object.keys(sortOptions).map((i) => (
                        <MenuItem key={i} value={sortOptions[i]}>
                            {i}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="labelSortDirection">Order</InputLabel>
                <Select
                    labelId="labelSortDirection"
                    value={itemsSort[1]}
                    onChange={(event) => setItemsSort([itemsSort[0], event.target.value])}
                    label="Order"
                    autoWidth
                >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    <MenuItem value="asc">Reverse</MenuItem>
                </Select>
            </FormControl>
            {Object.keys(filterOptions).map((i) => (
                <FormControl key={i} className={classes.formControl}>
                    <InputLabel id="labelHasImage">{i}</InputLabel>
                    <Select
                        labelId="labelHasImage"
                        value={itemsFilter[filterOptions[i]] || ''}
                        onChange={(event) =>
                            setItemsFilter({
                                ...itemsFilter,
                                [filterOptions[i]]: event.target.value,
                            })
                        }
                        label={i}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>Default</em>
                        </MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
            ))}
        </>
    );
}

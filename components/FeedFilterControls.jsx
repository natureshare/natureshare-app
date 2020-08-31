import _pickBy from 'lodash/pickBy';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from 'mdi-material-ui/Camera';
import MapMarkerIcon from 'mdi-material-ui/MapMarkerCheckOutline';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import { useRef, useEffect } from 'react';

const filterNext = {
    undefined: 'yes',
    yes: 'no',
    no: undefined,
};

export default function FeedSortControls({ length, page, itemsFilter, searchText, getParams }) {
    const router = useRouter();
    const searchTimeout = useRef(null);
    const searchFieldRef = useRef();

    const filterOptions = {
        Image: 'image',
        Location: '_geo.coordinates',
    };

    const filterIcons = {
        Image: <ImageIcon />,
        Location: <MapMarkerIcon />,
    };

    const routerReplace = (opt) => {
        router.replace(router.pathname, `${router.pathname}?${getParams(opt)}`, { shallow: true });
        return true;
    };

    const updateSearchText = (event) => {
        const { value } = event.target;
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => routerReplace({ q: value }), 1000);
    };

    useEffect(() => {
        if (searchText && searchFieldRef.current && !searchFieldRef.current.value) {
            searchFieldRef.current.value = searchText;
        }
    }, [searchFieldRef, searchText]);

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            alignContent="center"
            spacing={1}
        >
            {Object.keys(filterOptions).map((i) => (
                <Grid item key={i}>
                    <IconButton
                        edge="start"
                        onClick={() =>
                            routerReplace({
                                f: _pickBy(
                                    {
                                        ...(itemsFilter || {}),
                                        [filterOptions[i]]:
                                            filterNext[
                                                itemsFilter &&
                                                    itemsFilter[filterOptions[i] || undefined]
                                            ],
                                    },
                                    Boolean,
                                ),
                            })
                        }
                    >
                        <Badge
                            badgeContent={(itemsFilter && itemsFilter[filterOptions[i]]) || ''}
                            invisible={!itemsFilter || !itemsFilter[filterOptions[i]]}
                            color="primary"
                            style={{
                                color:
                                    itemsFilter && itemsFilter[filterOptions[i]]
                                        ? '#558b2f'
                                        : 'inherit',
                            }}
                        >
                            {filterIcons[i]}
                        </Badge>
                    </IconButton>
                </Grid>
            ))}
            <Grid item>
                <TextField
                    inputRef={searchFieldRef}
                    defaultValue=""
                    size="small"
                    onChange={updateSearchText}
                    placeholder="Search"
                    style={{ width: '120px' }}
                />
            </Grid>
            <Grid item>
                <Button disabled>
                    {length} items
                    {page && page !== 1 && ` (page ${page})`}
                </Button>
            </Grid>
        </Grid>
    );
}

/* eslint-disable react/no-array-index-key */

import Grid from '@material-ui/core/Grid';

export default function ButtonGrid({ children }) {
    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
            {children &&
                children.map((i, n) => (
                    <Grid item key={n}>
                        {i}
                    </Grid>
                ))}
        </Grid>
    );
}

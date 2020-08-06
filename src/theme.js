// Material UI integration, see:
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.0rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1.0rem',
        },
        body2: {
            fontSize: '0.8rem',
        },
    },
    palette: {
        primary: {
            main: '#558b2f',
        },
        secondary: {
            main: '#8bc34a',
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;

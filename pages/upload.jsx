import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useState, useEffect, useContext } from 'react';
import { H1, P } from '../components/Typography';
import ConnectCard from '../components/upload/ConnectCard';
import Layout from '../components/Layout';
import { UserContext } from '../components/User';
import LogInFormDialog from '../components/LogInFormDialog';
import UserFormDialog from '../components/UserFormDialog';
import Link from '../components/Link';

export default function Upload() {
    const [user, setUser] = useContext(UserContext);
    const [openLogInForm, setOpenLogInForm] = useState(false);
    const [openNewUserForm, setOpenNewUserForm] = useState(false);

    useEffect(() => {
        setUser(null); // force a refresh
    }, []);

    return (
        <Layout title="Upload" href="/upload/">
            <H1>Upload</H1>
            <P>NatureShare is designed as a distributed and decentralised sharing hub.</P>
            <P>
                <Button
                    component={Link}
                    variant="outlined"
                    color="primary"
                    size="small"
                    href="help/[topic]/[item]"
                    as="/help/d14n/info"
                >
                    More info
                </Button>
            </P>
            {user && !user.name && (
                <Box mt={3}>
                    <LogInFormDialog open={openLogInForm} setOpen={setOpenLogInForm} />
                    <UserFormDialog open={openNewUserForm} setOpen={setOpenNewUserForm} newUser />
                    <Card>
                        <CardContent>
                            <Typography variant="body2">
                                Log in or sign up to get started.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => setOpenLogInForm(true)} color="primary">
                                Log In
                            </Button>
                            <Button onClick={() => setOpenNewUserForm(true)} color="primary">
                                Sign Up
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            )}
            <Box mt={4}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs={12} sm={6}>
                        <ConnectCard
                            id="inaturalist"
                            avatar="logos/inaturalist.png"
                            title="iNaturalist"
                            subheader="Import and Export Observations"
                            body={<>Available soon...</>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ConnectCard
                            id="flickr"
                            avatar="logos/flickr.png"
                            title="Flickr"
                            subheader="Import Photos and Videos"
                            body={
                                <>
                                    Note, when you connect your Flickr account it will ask for
                                    public and private access. Please be assured that NatureShare
                                    will only ever access and sync the photos you have already set
                                    to <strong>public</strong> visibility.{' '}
                                    <a
                                        href="https://github.com/natureshare/natureshare-scripts/blob/master/importers/handler/flickr.js"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        You can review the code here.
                                    </a>
                                </>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ConnectCard
                            id="dropbox"
                            avatar="logos/dropbox.png"
                            title="Dropbox"
                            subheader="Import Photos"
                            body={
                                <>
                                    When you connect to DropBox, a new folder will be created under{' '}
                                    <em>Apps &raquo; NatureShare</em>. NatureShare will only be able
                                    to access the files you place in that new folder.
                                </>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ConnectCard
                            id="google"
                            avatar="logos/google.png"
                            title="Google"
                            subheader="Import Photos and YouTube Videos"
                            body={<>Available soon...</>}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

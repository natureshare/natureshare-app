import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useState, useEffect, useContext } from 'react';
import { H1, H2, P } from '../components/Typography';
import ConnectCard from '../components/upload/ConnectCard';
import Layout from '../components/Layout';
import { UserContext } from '../components/User';
import LogInFormDialog from '../components/LogInFormDialog';
import UserFormDialog from '../components/UserFormDialog';

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
            <Box mt={3}>
                <H2>Contribute your Photos and Video from the Cloud</H2>
                <P>NatureShare is designed as a distrubuted and decentralised sharing hub.</P>
                <P>
                    This means you can choose where in the cloud your photos are stored and
                    maintained.
                </P>
                <P>
                    So far there is support for automatic sync with your Flickr, Dropbox, Google
                    Photos and YouTube accounts. (More coming soon!)
                </P>
                <P>
                    In addition, you can upload your photos to anywhere on the public web (eg, a
                    blog or FTP server) and link them in to NatureShare.
                </P>
                <P>
                    This means you stay in control of your files without needing to rely on any one
                    big, centralised website or database. You can even create a mirror (aka backup)
                    of this entire NatureShare website, on your own domain name, easily and{' '}
                    <em>for free!</em>
                </P>
            </Box>
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
                            id="flickr"
                            avatar="logos/flickr.png"
                            title="Flickr"
                            subheader="Photos and videos"
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
                            subheader="Photos"
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
                            subheader="Photos and YouTube"
                            body={
                                <>
                                    Available <em>very</em> soon...
                                </>
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

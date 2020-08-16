/* global process URL */

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import React, { useState, useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from 'mdi-material-ui/Home';
import LogInIcon from 'mdi-material-ui/Login';
import LogOutIcon from 'mdi-material-ui/Logout';
import AboutIcon from 'mdi-material-ui/Information';
import UploadIcon from 'mdi-material-ui/CloudUpload';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from 'mdi-material-ui/ChevronRight';
import Hidden from '@material-ui/core/Hidden';
import Link from './Link';
import LogInFormDialog from './LogInFormDialog';
import UserFormDialog from './UserFormDialog';
import { UserContext } from './User';

export default function Header({ title, href }) {
    const [drawerIsOpen, openDrawer] = useState(false);
    const [openLogInForm, setOpenLogInForm] = useState(false);
    const [openUserForm, setOpenUserForm] = useState(false);
    const [openNewUserForm, setOpenNewUserForm] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const logOut = () => {
        setUser({});
        if (window && typeof window === 'object') {
            window.localStorage.removeItem('userToken');
            if (process.env.apiHost)
                window
                    .fetch(new URL('/auth', process.env.apiHost).href, {
                        credentials: 'include',
                        method: 'DELETE',
                    })
                    .then(() => {})
                    .catch(() => {});
        }
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" onClick={() => openDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Box ml={1}>
                        <Link
                            href="/"
                            style={{
                                color: 'white',
                                fontSize: '20px',
                                lineHeight: '20px',
                                fontWeight: 500,
                            }}
                        >
                            {title && (
                                <>
                                    <Hidden smDown>{process.env.appName}</Hidden>
                                    <Hidden mdUp>{process.env.appShortName}</Hidden>
                                </>
                            )}
                            {!title && process.env.appName}
                        </Link>
                    </Box>
                    {title && (
                        <>
                            <Box ml={0.5} mt="3px">
                                <ChevronRightIcon />
                            </Box>
                            <Box ml={0.5}>
                                <a
                                    href={href}
                                    style={{
                                        color: 'white',
                                        fontSize: '20px',
                                        lineHeight: '20px',
                                        fontWeight: 500,
                                    }}
                                >
                                    {title}
                                </a>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense" />
            <Drawer anchor="left" open={drawerIsOpen} onClose={() => openDrawer(false)}>
                <div
                    role="presentation"
                    onClick={() => openDrawer(false)}
                    onKeyDown={() => openDrawer(false)}
                    style={{ width: '250px' }}
                >
                    <List component="nav">
                        <ListItem button component={Link} href="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <Divider />
                        {process.env.apiHost && (
                            <>
                                {user && !user.name && (
                                    <>
                                        <ListItem button onClick={() => setOpenLogInForm(true)}>
                                            <ListItemIcon>
                                                <LogInIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Log In" />
                                        </ListItem>
                                        <ListItem button onClick={() => setOpenNewUserForm(true)}>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Sign Up" />
                                        </ListItem>
                                    </>
                                )}
                                {user && user.name && (
                                    <>
                                        {user.name === 'reilly' && (
                                            <ListItem
                                                button
                                                component={Link}
                                                href="/upload"
                                                as="/upload"
                                            >
                                                <ListItemIcon>
                                                    <UploadIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Upload" />
                                            </ListItem>
                                        )}
                                        <ListItem button onClick={() => setOpenUserForm(true)}>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Account" />
                                        </ListItem>
                                        <ListItem button onClick={logOut}>
                                            <ListItemIcon>
                                                <LogOutIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Log Out" />
                                        </ListItem>
                                    </>
                                )}
                            </>
                        )}
                        <Divider />
                        <ListItem button component={Link} href="/about" as="/about">
                            <ListItemIcon>
                                <AboutIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <LogInFormDialog open={openLogInForm} setOpen={setOpenLogInForm} />
            <UserFormDialog open={openUserForm} setOpen={setOpenUserForm} />
            <UserFormDialog open={openNewUserForm} setOpen={setOpenNewUserForm} newUser />
        </>
    );
}

/* global process URL Headers */

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import UpdateIcon from 'mdi-material-ui/CloudUpload';
import ConnectIcon from 'mdi-material-ui/SwapHorizontalBold';
import HelpIcon from 'mdi-material-ui/HelpCircle';
import { useState, useContext, useMemo } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from '../User';
import ActionFormDialog from '../ActionFormDialog';

export default function ConnectCard({ id, avatar, title, subheader, body }) {
    const [user, setUser] = useContext(UserContext);
    const [menu, setMenu] = useState(null);

    const connected = useMemo(() => user && user.data && user.data.oauth && user.data.oauth[id], [
        user,
    ]);

    const openMenu = (event) => {
        setMenu(event.currentTarget);
    };

    const closeMenu = () => {
        setMenu(null);
    };

    const disconnect = () => {
        closeMenu();

        if (window && typeof window === 'object') {
            const headers = new Headers();

            if (window.localStorage) {
                const token = window.localStorage.getItem('userToken');
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }

            if (process.env.apiHost)
                window
                    .fetch(new URL(`/user/oauth/${id}`, process.env.apiHost).href, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers,
                    })
                    .then(() => setUser(null))
                    .catch(() => {});
        }
    };

    return (
        <Card>
            <Menu
                id="simple-menu"
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={closeMenu}
            >
                <MenuItem onClick={disconnect}>Disconnect</MenuItem>
            </Menu>
            <CardHeader
                avatar={
                    <Avatar alt="" src={avatar} variant="square">
                        F
                    </Avatar>
                }
                action={
                    connected && (
                        <IconButton onClick={openMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={<strong>{title}</strong>}
                subheader={subheader}
            />
            <CardContent>
                <Typography variant="body2" component="div">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                {!connected && (
                    <Button
                        disabled={!(user && user.name)}
                        color="primary"
                        startIcon={<ConnectIcon />}
                        href={new URL(`/connect/${id}`, process.env.apiHost).href}
                    >
                        Connect
                    </Button>
                )}
                {connected && (
                    <ActionFormDialog
                        title="Sync Now"
                        description="After clicking submit, please wait at least an hour for sync to complete."
                        buttonIcon={<UpdateIcon />}
                        buttonVariant="text"
                        {...{
                            url: window.location.href,
                            action: 'runUserMediaImport',
                            target: id,
                            fields: {},
                        }}
                    />
                )}
                <Button color="primary" startIcon={<HelpIcon />} href={`/help/upload/${id}`}>
                    Help
                </Button>
            </CardActions>
        </Card>
    );
}

/* global process URL */

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
import { useContext, useMemo } from 'react';
import { UserContext } from '../User';
import ActionFormDialog from '../ActionFormDialog';

export default function ConnectCard({ id, avatar, title, subheader, body }) {
    const [user] = useContext(UserContext);

    const connected = useMemo(() => user && user.data && user.data.oauth && user.data.oauth[id], [
        user,
    ]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar alt="" src={avatar} variant="square">
                        F
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
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

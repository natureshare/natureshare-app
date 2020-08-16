import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { UserContext } from './User';
import FormDialog from './FormDialog';

const hiddenFields = {
    url: { type: 'hidden' },
    action: { type: 'hidden' },
    target: { type: 'hidden' },
    recipient: { type: 'hidden' },
};

export default function ActionFormDialog({
    title,
    description,
    buttonIcon,
    buttonVariant,
    url,
    action,
    target,
    recipient,
    fields,
}) {
    const [user] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                size="small"
                color="primary"
                variant={buttonVariant || 'outlined'}
                startIcon={buttonIcon}
                onClick={() => setOpen(true)}
            >
                {title}
            </Button>
            {user && user.name && (
                <FormDialog
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    description={description}
                    source={{
                        url: url || window.location.href,
                        action,
                        target,
                        recipient,
                    }}
                    fields={{ ...fields, ...hiddenFields }}
                    method="POST"
                    url="/actions"
                    namespace="action"
                />
            )}
            {(!user || !user.name) && (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Please log in first</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

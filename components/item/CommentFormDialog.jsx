import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { UserContext } from '../User';
import FormDialog from '../FormDialog';

export default function CommentFormDialog({ data }) {
    const [user] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const fields = {
        recipient: { type: 'hidden' },
        action: { type: 'hidden' },
        target: { type: 'hidden' },
        comment: {
            label: 'Comment',
            autoFocus: true,
            inputLabelProps: { shrink: true },
            multiline: true,
        },
    };

    return (
        <>
            <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
                Add a Comment
            </Button>
            {user && user.name && (
                <FormDialog
                    open={open}
                    setOpen={setOpen}
                    title="Comment"
                    source={data}
                    fields={fields}
                    method="POST"
                    url="/actions"
                    namespace="action"
                />
            )}
            {(!user || !user.name) && (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Please log in</DialogTitle>
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

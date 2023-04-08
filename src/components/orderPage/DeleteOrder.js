import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Iconify from '../iconify/Iconify';
import { IconButton, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../../actions/order.actions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0.1 solid pink',
    width: "60%",
    boxShadow: 24,
    p: 4,
};

export const DeleteOrder = ({ idValue }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        createNewOrder,
    } = useSelector((reduxData) => reduxData.orderReducers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(createNewOrder(data));
    };

    const handleDeleteOrder = () => {
        dispatch(deleteOrder(idValue))
    }

    return (
        <React.Fragment>
            <IconButton sx={{ color: 'error.main' }} onClick={handleOpen}>
                <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">Delete Order</DialogTitle>
                <DialogContent>
                    <Box >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <HighlightOffIcon sx={{ fontSize: 80, color: "#FF4842" }} />
                            </Grid>
                            <Grid item sx={{ color: "#FF4842" }} align="center">
                                <h3>Are you sure want to delete this order?</h3>
                                <h3>Order's Id = {idValue}</h3>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <Box component="form" noValidate onSubmit={handleSubmit}>
                                <Grid container justifyContent="flex-end" spacing={2}>
                                    <Grid item>
                                        <Button variant="contained" onClick={handleDeleteOrder}>
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleClose} variant="contained" color='warning'>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
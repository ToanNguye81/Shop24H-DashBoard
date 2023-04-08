import * as React from 'react';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { useEffect } from 'react';
import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrderDetail, getAllOrderDetail } from '../../actions/orderDetail.actions';

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

export const NewOrderDetail = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
    } = useSelector((reduxData) => reduxData.orderDetailReducers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(createNewOrderDetail(data));
    };


    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>New Order Detail</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <Box>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        New Order Detail
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" name="firstName" required fullWidth id="firstName" label="First Name" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="lastName" label="Last Name" name="lastName" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField size="small" required fullWidth id="phone" label="Phone" name="phone" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField size="small" required fullWidth id="email" label="Email" name="email" />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Send
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleClose} variant="contained" color='warning' sx={{ mt: 3, mb: 2 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
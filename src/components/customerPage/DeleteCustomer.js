import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { IconButton, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCustomerById } from '../../actions/customer.actions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Iconify from '../iconify/Iconify';


export const DeleteCustomer = ({ idValue }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteCustomer = () => {
        dispatch(deleteCustomerById(idValue))
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
                <DialogTitle id="dialog-title">
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
                            <h3>Are you sure want to delete this customer?</h3>
                            <h4>Customer's Id = {idValue}</h4>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <Box component="form" >
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleDeleteCustomer}>
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
                </DialogTitle>
            </Dialog>
        </React.Fragment>
    );
}
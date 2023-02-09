import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { useEffect } from 'react';
import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrder, fetchCities, fetchCountries, fetchOrder, getAddress, getCity, getCountry } from '../../actions/order.actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OrderStepper } from './NewOrder/OrderStepper';

export const NewOrder = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        dispatch(fetchCountries());
    }, []);
  
    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Order
            </Button>
            <Dialog open={open} onClose={handleClose}  >
                <DialogTitle>New Order</DialogTitle>
                <DialogContent>
                    
                    <OrderStepper/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import Iconify from '../iconify/Iconify';
import { useNavigate } from 'react-router-dom';

export const NewOrder = () => {
    const navigate=useNavigate()
    const handleClickOpen = () => {
        navigate("/dashboard/createOrder")
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Order
            </Button>
        </React.Fragment>
    );
}
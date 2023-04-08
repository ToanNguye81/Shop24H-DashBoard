import * as React from 'react';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { useEffect } from 'react';
import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField, FormLabel, ButtonGroup, IconButton, Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

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

export const EditOrder = ({ paramOrder }) => {
    const dispatch = useDispatch();
    const [orderDate, setOrderDate] = React.useState(paramOrder.orderDate)
    const [orderCode] = React.useState(paramOrder.orderCode)
    const [cost, setCost] = React.useState(paramOrder.cost);
    const [shippedDate, setShippedDate] = React.useState(paramOrder.shippedDate)
    const [status, setStatus] = React.useState(paramOrder.status)
    const [note, setNote] = React.useState(paramOrder.note)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // dispatch(updateOrder(data));
    };
    
    const handleChangeCost = (event) => {
        setCost(event.target.value)
    }
    const handleChangeOrderDate = (event) => {
        setOrderDate(event.target.value)
    }
    const handleChangeShippedDate = (event) => {
        setShippedDate(event.target.value)
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }
    const handleChangeNote = (event) => {
        setNote(event.target.value)
    }

    return (
        <React.Fragment>
           
           <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
 <DialogTitle id="dialog-title">Edit Order</DialogTitle>
  <DialogContent>
                <Box >
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" >
                        Edit Order
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="orderCode" label="Order Code" name="orderCode" value={orderCode} disabled/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="orderDate" label="Order Date" name="orderDate" value={orderDate} onChange={handleChangeOrderDate} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="shippedDate" label="Shipped Date" value={shippedDate} name="shippedDate" onChange={handleChangeShippedDate} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="cost" label="Cost" value={cost} name="cost" onChange={handleChangeCost} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="status" label="Status" value={status} name="status" onChange={handleChangeStatus} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="note" label="Note" value={note} name="note" onChange={handleChangeNote} />
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
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
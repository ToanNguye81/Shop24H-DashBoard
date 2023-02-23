import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { } from '../../actions/customer.actions';
export const OrderInfo = () => {
    const { orderById } = useSelector(reduxData => reduxData.orderReducers)
    const { orderCode,orderDate,shippedDate,note,cost,status } = orderById
    
    return (
        <React.Fragment>
            <Box component="form" noValidate
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            name="orderCode"
                            required
                            fullWidth
                            id="orderCode"
                            label="Order Code"
                            value={orderCode}
                        // onChange={handleChangeOrderCode}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            required
                            fullWidth
                            id="orderDate"
                            label="Order Date"
                            name="orderDate"
                            value={orderDate}
                        // onChange={handleChangeOrderDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            required
                            fullWidth
                            id="shippedDate"
                            label="Shipped Date"
                            name="shippedDate"
                            value={shippedDate}
                        // onChange={handleChangeShippedDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            required
                            fullWidth
                            id="note"
                            label="Note"
                            name="note"
                            value={note}
                        // onChange={handleChangeNote}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            required
                            fullWidth
                            id="cost"
                            label="Cost"
                            name="cost"
                            value={cost}
                        // onChange={handleChangeCost}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField size="small"
                            required
                            fullWidth
                            id="status"
                            label="Cost"
                            name="status"
                            value={status}
                        // onChange={handleChangeCost}
                        />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}


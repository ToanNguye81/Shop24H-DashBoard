//Version 2
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SnackBarAlert } from '../common/SnackBarAlert';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import { updateOrderById } from '../../actions/order.actions';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const validOrderSchema = Yup.object().shape({
    orderCode: Yup.string().required('Order Code is required').trim(),
    orderDate: Yup.string().required('Order Date is required').trim(),
    shippedDate: Yup.string().required('Shipped Date is required').trim(),
    cost: Yup.number().required('Cost is required').min(0),
    status: Yup.string().required('Status is required').trim(),
    address: Yup.string().required('Address is required').trim(),
    note: Yup.string().required('Note is required').trim(),
});

export const OrderData = ({ initOrder }) => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateStatus } = useSelector((reduxData) => reduxData.orderReducers);
    const handleSubmit = async (values) => {
        await dispatch(updateOrderById(initOrder._id, values));
        await setOpenSnackBar(true)
    };

    return (
        <React.Fragment>
            <Formik initialValues={initOrder} validationSchema={validOrderSchema} onSubmit={handleSubmit} >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box component="div" noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="orderCode"
                                            label="Order Code *"
                                            name="orderCode"
                                            disabled
                                            value={values.orderCode}
                                            onChange={handleChange}
                                            error={errors.orderCode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            fullWidth
                                            id="orderDate"
                                            label="Order Date *"
                                            name="orderDate"
                                            value={formatTime(values.orderDate)}
                                            onChange={handleChange}
                                            disabled
                                            rows={4}
                                            error={errors.orderDate}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DateTimePicker']} >
                                            <DateTimePicker 
                                            label="Shipped Date"
                                            value={dayjs(values.shippedDate)}
                                            onChange={(newValue) => {handleChange({ target: { name: 'shippedDate', value: newValue.toISOString() } });
                                            }}
                                            />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField sx={{mt:1}}
                                            fullWidth
                                            id="cost"
                                            label="Cost*"
                                            name="cost"
                                            value={values.cost}
                                            onChange={handleChange}
                                            error={errors.cost}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="customer"
                                            label="Customer*"
                                            name="customer"
                                            value={values.customer}
                                            onChange={handleChange}
                                            error={errors.customer}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            label="Phone *"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            error={errors.phone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            id="address"
                                            label="Address *"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            error={errors.address}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select 
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="status"
                                                label="Status *"
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                error={errors.status}>
                                                <MenuItem value="waiting">Waiting</MenuItem>
                                                <MenuItem value="delivery">Delivery</MenuItem>
                                                <MenuItem value="success">Success</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="note"
                                            label="Note *"
                                            name="note"
                                            value={values.note}
                                            onChange={handleChange}
                                            error={errors.note}
                                        />
                                    </Grid>
                                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1} mt={1}>
                                        <Grid item >
                                            <Button variant="contained" color="warning" type="submit">Update</Button>
                                        </Grid>
                                        <Grid item >
                                            <Button variant="contained" color="info" onClick={() => navigate(-1)}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
            <SnackBarAlert status={updateStatus} openSnackBar={openSnackBar} />
        </React.Fragment>
    );
};

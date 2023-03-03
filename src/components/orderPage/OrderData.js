
//Version 2
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SnackBarAlert } from '../common/SnackBarAlert';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import { updateOrderById } from '../../actions/order.actions';

const validOrderSchema = Yup.object().shape({
    orderCode: Yup.string().required('Order Code is required').trim(),
    orderDate: Yup.string().required('Order Date is required').trim(),
    shippedDate: Yup.string().required('Shipped Date is required').trim(),
    cost: Yup.number().required('Cost is required').min(0),
    status: Yup.string().required('Status is required').trim(),
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
                                            size="small"
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
                                            size="small"
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
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="date"
                                            id="shippedDate"
                                            label="Shipped Date *"
                                            name="shippedDate"
                                            value={values.shippedDate}
                                            onChange={handleChange}
                                            error={errors.shippedDate}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
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
                                            size="small"
                                            fullWidth
                                            id="status"
                                            label="Status *"
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            error={errors.status}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            size="small"
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


// //Version 2
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SnackBarAlert } from '../common/SnackBarAlert';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { createNewProduct } from '../../actions/product.actions';
// import { createNewProduct } from '../../actions/product.actions';

const style = {
    bgcolor: 'background.paper',
    border: '0.1 solid pink',
    width: '100%',
    boxShadow: 24,
    p: 4,
};
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').trim(),
    brand: Yup.string().required('Brand is required').trim(),
    description: Yup.string().required('Description is required').trim(),
    type: Yup.string().required('Type is required').trim(),
    imageUrl: Yup.string().required('Image URL is required').trim(),
    buyPrice: Yup.number().required('Buy Price is required').min(0),
    promotionPrice: Yup.number().required('Promotion Price is required').min(0),
    amount: Yup.number().required('Amount is required').min(0),
});

export const NewProduct = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const newProduct = {
        name:"",
        brand:"",
        description:"",
        type:"",
        imageUrl:"",
        buyPrice:"",
        promotionPrice:"",
        amount:"",
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();
    const { updateStatus } = useSelector((reduxData) => reduxData.productReducers);

    const handleSubmit = async (values) => {
        console.log(values)
        await dispatch(createNewProduct(values))
        await setOpenSnackBar(true)
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Product
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" maxWidth="md" fullWidth>
                <Box sx={style}>
                    <Typography id="dialog-title" variant="h6" component="h2">
                        New Product
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Formik initialValues={newProduct} validationSchema={validationSchema} onSubmit={handleSubmit} >
                            {({ errors, touched, values, handleChange }) => (
                                <Form>
                                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Box component="div" noValidate>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="imageUrl"
                                                        label="Image Url *"
                                                        name="imageUrl"
                                                        value={values.imageUrl}
                                                        onChange={handleChange}
                                                        error={errors.imageUrl && touched.imageUrl}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="name"
                                                        label="Name *"
                                                        name="name"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        error={errors.name && touched.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="brand"
                                                        label="Brand *"
                                                        name="brand"
                                                        value={values.brand}
                                                        onChange={handleChange}
                                                        error={errors.brand && touched.brand}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="description"
                                                        label="Description *"
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={4}
                                                        error={errors.description && touched.description}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="type"
                                                        label="Type *"
                                                        name="type"
                                                        value={values.type}
                                                        onChange={handleChange}
                                                        error={errors.type && touched.type}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="buyPrice"
                                                        label="Buy Price *"
                                                        name="buyPrice"
                                                        value={values.buyPrice}
                                                        type="number"
                                                        error={errors.buyPrice && touched.buyPrice}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="promotionPrice"
                                                        label="Promotion Price *"
                                                        name="promotionPrice"
                                                        value={values.promotionPrice}
                                                        type="number"
                                                        error={errors.promotionPrice && touched.promotionPrice}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        id="amount"
                                                        label="Amount *"
                                                        name="amount"
                                                        value={values.amount}
                                                        type="number"
                                                        error={errors.amount && touched.amount}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1} mt={1}>
                                                    <Grid item >
                                                        <Button variant="contained" color="success" type="submit">Create New Product</Button>
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
                    </Box>
                </Box>
            </Dialog>
        </React.Fragment>
    );
};
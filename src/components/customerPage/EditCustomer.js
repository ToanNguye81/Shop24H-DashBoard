// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Iconify from '../iconify/Iconify';
// import { useEffect } from 'react';
// import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField, FormLabel, ButtonGroup, IconButton, Menu } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCities, fetchCountries, getAddress, getCity, getCountry } from '../../actions/customer.actions';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     border: '0.1 solid pink',
//     width: "60%",
//     boxShadow: 24,
//     p: 4,
// };

// const validOrderSchema = Yup.object().shape({
// 	firstName: Yup.string().required('First Name is required').trim(),
// 	lastName: Yup.string().required('Last Name is required').trim(),
// 	phone: Yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone number should only contain digits'),
// 	email: Yup.string().required('Email is required').email('Invalid email').trim(),
// 	city: Yup.string().required('City is required').trim(),
// 	country: Yup.string().required('Country is required').trim(),
// 	address: Yup.string().required('Address is required').trim(),
// });


// export const EditCustomer = ({ customer }) => {
//     const dispatch = useDispatch();
//     const [email, setEmail] = React.useState(customer.email);
//     const [firstName, setFirstName] = React.useState(customer.firstName)
//     const [lastName, setLastName] = React.useState(customer.lastName)
//     const [phone, setPhone] = React.useState(customer.phone)
//     const [country, setCountry] = React.useState(customer.country)
//     const [city, setCity] = React.useState(customer.city)
//     const [address, setAddress] = React.useState(customer.address)
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const {
//         countryOptions,
//         cityOptions,
//         createNewCustomer,
//     } = useSelector((reduxData) => reduxData.customerReducers);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         dispatch(createNewCustomer(data));
//     };

//     useEffect(() => {
//         dispatch(fetchCountries());
//     }, []);

//     // const handleChangeEmail = (event) => {
//     //     setEmail(event.target.value)
//     // }
//     // const handleChangeFirstName = (event) => {
//     //     setFirstName(event.target.value)
//     // }
//     // const handleChangeLastName = (event) => {
//     //     setLastName(event.target.value)
//     // }
//     // const handleChangePhone = (event) => {
//     //     setPhone(event.target.value)
//     // }
//     // const handleCountryChange = (event) => {
//     //     setCountry(event.target.value);
//     //     dispatch(fetchCities(event.target.value));
//     // }
//     // const handleCityChange = (event) => {
//     //     setCity(event.target.value)
//     // }
//     // const handleAddressChange = (event) => {
//     //     setAddress(event.target.value)
//     // }

//     return (
//         <React.Fragment>
//             <Formik initialValues={customer} validationSchema={validationSchema} onSubmit={handleSubmit} >
//                 {({ errors, touched, values, handleChange }) => (
//                     <Form>
//                         <Box sx={{ mt: 2 }} component="form" noValidate onSubmit={handleSubmit}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField size="small" required fullWidth id="firstName" label="First Name" name="firstName" value={firstName} onChange={handleChangeFirstName} />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField size="small" required fullWidth id="lastName" label="Last Name" name="lastName" value={lastName} onChange={handleChangeLastName} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField size="small" required fullWidth id="phone" label="Phone" value={phone} name="phone" onChange={handleChangePhone} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField size="small" required fullWidth id="email" label="Email" value={email} name="email" onChange={handleChangeEmail} />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <FormControl size="small" required fullWidth>
//                                         <InputLabel id="select-country">Country</InputLabel>
//                                         <Select onChange={handleCountryChange} labelId="select-country" autoWidth id="country" label="Country" name="country" value={country}>
//                                             {countryOptions ?
//                                                 countryOptions.map((countryOption, index) => <MenuItem key={countryOption.id} value={countryOption.iso2}>{countryOption.name}</MenuItem>) :
//                                                 null
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                     <FormControl size="small" required fullWidth>
//                                         <InputLabel id="select-city">City</InputLabel>
//                                         <Select onChange={handleCityChange} labelId="select-city" autoWidth id="city" label="City" name="city" value={city}>
//                                             {cityOptions ?
//                                                 cityOptions.map((cityOptions, index) => <MenuItem key={cityOptions.id} value={cityOptions.name}>{cityOptions.name}</MenuItem>) : null
//                                             }
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField onChange={handleAddressChange} size="small" required fullWidth id="address" label="Address" name="address" value={address} />
//                                 </Grid>
//                             </Grid>
//                             <Grid container justifyContent="flex-end" spacing={2}>
//                                 <Grid item>
//                                     <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
//                                         Send
//                                     </Button>
//                                 </Grid>
//                                 <Grid item>
//                                     <Button onClick={handleClose} variant="contained" color='warning' sx={{ mt: 3, mb: 2 }}>
//                                         Cancel
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Form>
//                 )}
//             </Formik>
//         </React.Fragment>
//     );
// }



// //Version 2
// import React, { useState } from 'react';
// import { Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { Box, Button, Grid, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { SnackBarAlert } from '../common/SnackBarAlert';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProductById } from '../../actions/product.actions';



// export const EditProduct = ({ initProduct }) => {
//     const [openSnackBar, setOpenSnackBar] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { updateStatus } = useSelector((reduxData) => reduxData.productReducers);
//     const handleSubmit = async (values) => {
//         await dispatch(updateProductById(initProduct._id, values));
//         await setOpenSnackBar(true)
//     };

//     return (
//         <React.Fragment>
//             <Formik initialValues={initProduct} validationSchema={validationSchema} onSubmit={handleSubmit} >
//                 {({ errors, touched, values, handleChange }) => (
//                     <Form>
//                         <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                             <Box component="div" noValidate>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} sm={12}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="imageUrl"
//                                             label="Image Url *"
//                                             name="imageUrl"
//                                             value={values.imageUrl}
//                                             onChange={handleChange}
//                                             error={errors.imageUrl && touched.imageUrl}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="name"
//                                             label="Name *"
//                                             name="name"
//                                             value={values.name}
//                                             onChange={handleChange}
//                                             error={errors.name && touched.name}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="brand"
//                                             label="Brand *"
//                                             name="brand"
//                                             value={values.brand}
//                                             onChange={handleChange}
//                                             error={errors.brand && touched.brand}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="description"
//                                             label="Description *"
//                                             name="description"
//                                             value={values.description}
//                                             onChange={handleChange}
//                                             multiline
//                                             rows={4}
//                                             error={errors.description && touched.description}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="type"
//                                             label="Type *"
//                                             name="type"
//                                             value={values.type}
//                                             onChange={handleChange}
//                                             error={errors.type && touched.type}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="buyPrice"
//                                             label="Buy Price *"
//                                             name="buyPrice"
//                                             value={values.buyPrice}
//                                             type="number"
//                                             error={errors.buyPrice && touched.buyPrice}
//                                             onChange={handleChange}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="promotionPrice"
//                                             label="Promotion Price *"
//                                             name="promotionPrice"
//                                             value={values.promotionPrice}
//                                             type="number"
//                                             error={errors.promotionPrice && touched.promotionPrice}
//                                             onChange={handleChange}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             size="small"
//                                             fullWidth
//                                             id="amount"
//                                             label="Amount *"
//                                             name="amount"
//                                             value={values.amount}
//                                             type="number"
//                                             error={errors.amount && touched.amount}
//                                             onChange={handleChange}
//                                         />
//                                     </Grid>
//                                     <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1} mt={1}>
//                                         <Grid item >
//                                             <Button variant="contained" color="warning" type="submit">Update</Button>
//                                         </Grid>
//                                         <Grid item >
//                                             <Button variant="contained" color="info" onClick={() => navigate(-1)}>Cancel</Button>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Box>
//                     </Form>
//                 )}
//             </Formik>
//             <SnackBarAlert status={updateStatus} openSnackBar={openSnackBar} />
//         </React.Fragment>
//     );
// };


import { Label } from "@mui/icons-material"
import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { fetchCities, fetchCountries, getCustomerById, updateCustomer } from "../../actions/customer.actions"

const validCustomerSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').trim(),
    lastName: Yup.string().required('Last Name is required').trim(),
    phone: Yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone number should only contain digits'),
    email: Yup.string().required('Email is required').email('Invalid email').trim(),
    city: Yup.string().required('City is required').trim(),
    country: Yup.string().required('Country is required').trim(),
    address: Yup.string().required('Address is required').trim(),
});

export const EditCustomer = ({ customer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        countryOptions,
        cityOptions,
    } = useSelector((reduxData) => reduxData.customerReducers);


    const handleSubmit = (data) => {
        // updateCustomer(customer)
        console.log(data)
    };



    useEffect(() => {
        dispatch(fetchCountries());
    }, []);

    useEffect(() => {
        if (customer && countryOptions)
            console.log(countryOptions)
        dispatch(fetchCities(customer.country));
    }, [countryOptions, customer]);


    const handleCountryChange = (event) => {
        dispatch(fetchCities(event.target.value));
    }

    return (
        <React.Fragment>
            <Formik initialValues={{ ...customer }} validationSchema={validCustomerSchema} onSubmit={handleSubmit}>
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <TextField
                            label="First name *"
                            fullWidth
                            size="small"
                            value={values.firstName}
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            error={errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <TextField sx={{ mt: 2 }}
                            fullWidth
                            label="Last Name *"
                            size="small"
                            value={values.lastName}
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            error={errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <TextField sx={{ mt: 2 }}
                            fullWidth
                            label="Phone * "
                            size="small"
                            value={values.phone}
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            error={errors.phone && touched.phone}
                            helperText={touched.phone && errors.phone}
                        />
                        <TextField sx={{ mt: 2 }}
                            fullWidth
                            label="Email * "
                            size="small"
                            value={values.email}
                            id="email"
                            onChange={handleChange}
                            name="email"
                            error={errors.email && touched.email}
                            helperText={touched.email && errors.email}
                        />
                        <Select
                            sx={{ mt: 2 }}
                            fullWidth
                            size="small"
                            value={values.country}
                            id="country"
                            name="country"
                            onChange={(e) => {
                                handleChange(e);
                                handleCountryChange(e);
                            }}
                            error={errors.country && touched.country}
                            helpertext={touched.country && errors.country}
                            startAdornment={<InputAdornment position="start">Country * : </InputAdornment>}
                        >
                            {countryOptions && countryOptions.map((option, index) => (
                                <MenuItem key={index} value={option.iso2}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            sx={{ mt: 2 }}
                            fullWidth
                            size="small"
                            value={values.city}
                            id="city"
                            name="city"
                            onChange={(e) => { handleChange(e); }}
                            error={errors.city && touched.city}
                            helpertext={touched.city && errors.city}
                            startAdornment={<InputAdornment position="start">City * : </InputAdornment>}
                        >
                            {cityOptions && cityOptions.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Send
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={() => dispatch(getCustomerById(""))}
                                    variant="contained" color='warning' sx={{ mt: 3, mb: 2 }}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}




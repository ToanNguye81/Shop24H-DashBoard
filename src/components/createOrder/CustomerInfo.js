// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     loadCities,
//     loadCountries,
//     getCity,
//     getCountry,
//     getFirstName,
//     getLastName,
//     getPhone,
//     getEmail,
//     getAddress
// } from '../../actions/customer.actions';


// export const CustomerInfo = () => {
//     const dispatch = useDispatch();
//     const {countryOptions,cityOptions,country,city,firstName,lastName,phone,email,address } = useSelector((reduxData) => reduxData.customerReducers);

//     React.useEffect(() => {
//         if(!countryOptions.length){
//             dispatch(loadCountries())
//         }
//     }, []);


//     const handleCountryChange = (event) => {
//         dispatch(getCountry(event.target.value));
//         dispatch(loadCities(event.target.value));
//     };

//     const handleCityChange = (event) => {
//         dispatch(getCity(event.target.value));
//     };
//     const handleChangeFirstName = (event) => {
//         dispatch(getFirstName(event.target.value))
//     }
//     const handleChangeLastName = (event) => {
//         dispatch(getLastName(event.target.value))
//     }
//     const handleChangePhone = (event) => {
//         dispatch(getPhone(event.target.value))
//     }
//     const handleChangeEmail = (event) => {
//         dispatch(getEmail(event.target.value))
//     }
//     const handleChangeAddress = (event) => {
//         dispatch(getAddress(event.target.value))
//     }

//     return (
//         <Box component="form" noValidate
//             sx={{ mt: 3 }}
//         >
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField size="small"
//                         name="firstName"
//                         required
//                         fullWidth
//                         id="firstName"
//                         label="First Name"
//                         value={firstName}
//                         onChange={handleChangeFirstName}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField size="small"
//                         required
//                         fullWidth
//                         id="lastName"
//                         label="Last Name"
//                         name="lastName"
//                         value={lastName}
//                         onChange={handleChangeLastName} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField size="small"
//                         required
//                         fullWidth
//                         id="phone"
//                         label="Phone"
//                         name="phone"
//                         value={phone}
//                         onChange={handleChangePhone} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField size="small"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email"
//                         type="email"
//                         name="email"
//                         value={email}
//                         onChange={handleChangeEmail}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField size="small"
//                         required
//                         fullWidth
//                         id="address"
//                         label="Address"
//                         type="address"
//                         name="address"
//                         value={address}
//                         onChange={handleChangeAddress}
//                     />
//                     {/* <GoogleMaps/> */}
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControl size="small" required fullWidth>
//                         <InputLabel id="select-country">Country</InputLabel>
//                         <Select
//                             onChange={handleCountryChange}
//                             labelId="select-country"
//                             autoWidth id="country"
//                             label="Country"
//                             name="country"
//                             value={country}
//                         >
//                             {countryOptions ?
//                                 countryOptions.map((countryOption, index) => <MenuItem key={index} id={countryOption.iso2}  value={countryOption.iso2}>{countryOption.name}</MenuItem>) :
//                                 null
//                             }
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControl size="small" required fullWidth>
//                         <InputLabel id="select-city">City</InputLabel>
//                         <Select
//                             onChange={handleCityChange}
//                             size="small"
//                             required
//                             fullWidth
//                             id="city"
//                             labelId="select-city"
//                             label="City"
//                             name="city"
//                             value={cityOptions.length || cityOptions ? city : "none"}
//                         >
//                             {cityOptions.length && cityOptions ?
//                                 cityOptions.map((cityOptions, index) => 
//                                 <MenuItem key={index} id={cityOptions.id} value={cityOptions.name}>{cityOptions.name}</MenuItem>) :
//                                 <MenuItem key="0" value="none">Không có thành phố</MenuItem>
//                             }
//                         </Select>
//                     </FormControl>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Iconify from '../iconify/Iconify';
import { Typography, Box, Button, Select, Grid, MenuItem, TextField, CircularProgress, InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCities,
    loadCountries,
    updateNewCustomer,
} from "../../actions/customer.actions";

const validCustomerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required").trim(),
    lastName: Yup.string().required("Last Name is required").trim(),
    phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]{10}$/, "Phone number should only contain 10 digits"),
    email: Yup.string().required("Email is required").email("Invalid email").trim(),
    city: Yup.string().required("City is required").trim(),
    country: Yup.string().required("Country is required").trim(),
    address: Yup.string().required("Address is required").trim(),
});

export const CustomerInfo = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const {
        countryOptions,
        loadCityOptionsPending,
        cityOptions,
        newCustomer
    } = useSelector((reduxData) => reduxData.customerReducers);


    useEffect(() => {
        if (open && !countryOptions[0]) {
            dispatch(loadCountries())
        }
    }, [open]);


    const handleSubmit = (values) => {
        console.log(values)
        // dispatch(createNewCustomer(values));
    };

    const handleCountryChange = (event) => {
        dispatch(loadCities(event.target.value));
    };

    const handleUpdateNewCustomer = (event) => {
        const { name, value } = event.target;
        const keyValue = { [name]: value };
        dispatch(updateNewCustomer(keyValue))
    }

    return (
        <React.Fragment>
            {/* <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>New Customer</Button> */}
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">
                    <Box>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            New Customer
                        </Typography>
                        <Divider /> */}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
                <Formik
                    initialValues={{ ...newCustomer }}
                    validationSchema={validCustomerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange, setFieldValue }) => (
                        <Form>
                            <TextField
                                label="First name *"
                                fullWidth
                                size="small"
                                value={values.firstName}
                                id="firstName"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                error={errors.firstName && touched.firstName}
                                helperText={touched.firstName && errors.firstName}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                fullWidth
                                label="Last Name *"
                                size="small"
                                value={values.lastName}
                                id="lastName"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                error={errors.lastName && touched.lastName}
                                helperText={touched.lastName && errors.lastName}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                fullWidth
                                label="Phone * "
                                size="small"
                                value={values.phone}
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                error={errors.phone && touched.phone}
                                helperText={touched.phone && errors.phone}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                fullWidth
                                label="Email * "
                                size="small"
                                value={values.email}
                                id="email"
                                onChange={handleChange}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
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
                                    setFieldValue("city", "")
                                }}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                error={errors.country && touched.country}
                                helpertext={touched.country && errors.country}
                                startAdornment={
                                    <InputAdornment position="start">
                                        Country * :{" "}
                                    </InputAdornment>
                                }
                            >
                                {countryOptions[0] &&
                                    countryOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.iso2}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <Select
                                sx={{ mt: 2 }}
                                fullWidth
                                size="small"
                                id="city"
                                value={values.city}
                                name="city"
                                onChange={handleChange}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                error={errors.city && touched.city}
                                helpertext={touched.city && errors.city}
                                startAdornment={
                                    <InputAdornment position="start">
                                        City * :{" "}
                                    </InputAdornment>
                                }
                            >
                                {loadCityOptionsPending ?
                                    (<MenuItem value="">
                                        <CircularProgress size={20} />
                                    </MenuItem>
                                    ) : (
                                        <MenuItem value="">Select a city</MenuItem>
                                    )}
                                {cityOptions[0] &&
                                    cityOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <TextField
                                sx={{ mt: 2 }}
                                fullWidth
                                label="Address * "
                                size="small"
                                value={values.address}
                                onBlur={(e) => handleUpdateNewCustomer(e)}
                                id="address"
                                onChange={handleChange}
                                name="address"
                                error={errors.address && touched.address}
                                helperText={touched.address && errors.address}
                            />
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Send
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => setOpen(false)}
                                        variant="contained"
                                        color="warning"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
            {/* </Box>
                </DialogTitle>
            </Dialog> */}
        </React.Fragment>
    );
}


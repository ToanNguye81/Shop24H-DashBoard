import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Iconify from '../iconify/Iconify';
import {Typography,Box, Button, Select, Grid, MenuItem, TextField, DialogTitle, Dialog, Divider, CircularProgress, InputAdornment } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { SnackBarAlert } from "../common/SnackBarAlert";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCities,
    loadCountries,
    getCustomerById,
    updateCustomer,
} from "../../actions/customer.actions";

const validCustomerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required").trim(),
    lastName: Yup.string().required("Last Name is required").trim(),
    phone: Yup.string().required("Phone is required").matches(/^[0-9]+$/, "Phone number should only contain digits"),
    email: Yup.string().required("Email is required").email("Invalid email").trim(),
    city: Yup.string().required("City is required").trim(),
    country: Yup.string().required("Country is required").trim(),
    address: Yup.string().required("Address is required").trim(),
});

export const NewCustomer = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
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

    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>New Customer</Button>
            <Dialog
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
                        <Divider />
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
                    </Box>
                </DialogTitle>
            </Dialog>
        </React.Fragment>
    );
}
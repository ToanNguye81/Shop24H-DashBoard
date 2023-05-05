import React, { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Box, Button, Select, Grid, MenuItem, TextField, CircularProgress, InputAdornment, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {
    createNewCustomer,
    loadCities,
    loadCountries,
    updateNewCustomer,
} from "../../actions/customer.actions";
import { createNewOrder } from "../../actions/order.actions";
import { enqueueSnackbar } from "notistack";
import { createNewOrderDetail } from "../../actions/orderDetail.actions";

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
    const {
        countryOptions,
        loadCityOptionsPending,
        cityOptions,
        newCustomer
    } = useSelector((reduxData) => reduxData.customerReducers);
    const {note} = useSelector((reduxData) => reduxData.orderReducers);

    const { cart } = useSelector(reduxData => reduxData.orderReducers)

    useEffect(() => {
        if (!countryOptions[0]) {
            dispatch(loadCountries())
        }
    }, []);


    const handleSubmit = (customer) => {
        dispatch(handleCreateOrder({ customer, cart }))
    };

    const handleCreateOrder = async ({ customer, cart }) => {
        try {
            const customerResult = await dispatch(createNewCustomer(customer))
    
            const customerId = await customerResult.data._id
    
            if (!cart.length) {
                // Warning if cart is empty
                enqueueSnackbar("Your cart is empty", { variant: "warning" })
            }
    
            if (customerId && cart.length) {
                //Create New Order 
                const orderResult = await dispatch(createNewOrder(customerId, note))
    
                const orderId = orderResult.data._id;
    
                if (orderId) {
                    const orderDetailPromises = cart.map(async (orderDetail) => {
                        await dispatch(createNewOrderDetail(orderId, orderDetail))
                    })
    
                    await Promise.all(orderDetailPromises)
    
                    // Show success Snackbar
                    enqueueSnackbar(`Create successfully Order: ${orderResult.data.orderCode}`, { variant: "success" })
                }
            }
    
        } catch (error) {
            // Handle any errors here
            console.log(error)
            // Show success Snackbar
            enqueueSnackbar('Something went wrong.', { variant: "error" })
        }
    }

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
            <Card>
                <CardContent>
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
                                                Create Order
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}


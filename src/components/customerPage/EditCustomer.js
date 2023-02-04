import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { useEffect } from 'react';
import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField, FormLabel, ButtonGroup,IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchCountries, fetchCustomer, getAddress, getCity, getCountry } from '../../actions/customer.actions';

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

export const EditCustomer = ({paramCustomer}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // console.log(paramCustomer)
    const {
        loadCountriesPending,
        countryOptions,
        cityOptions,
        country,
        address,
        city,
        createNewCustomer,
    } = useSelector((reduxData) => reduxData.customerReducers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(createNewCustomer(data));
    };

    const handleCountryChange = (event) => {
        dispatch(getCountry(event.target.value));
        dispatch(fetchCities(event.target.value));
    }

    const handleCityChange = (event) => {
        dispatch(getCity(event.target.value));
    }

    const handleAddressChange = (event) => {
        dispatch(getAddress(event.target.value));
    }

    return (
        <React.Fragment>
            <IconButton sx={{ color: '#3f51b5'}} onClick={handleOpen}>
                <Iconify icon={'eva:edit-fill'} />
            </IconButton>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" >
                        Edit Customer
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" name="firstName" required fullWidth id="firstName" label="First Name" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" required fullWidth id="lastName" label="Last Name" name="lastName" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField size="small" required fullWidth id="phone" label="Phone" name="phone" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField size="small" required fullWidth id="email" label="Email" name="email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl size="small" required fullWidth>
                                        <InputLabel id="select-country">Country</InputLabel>
                                        <Select onChange={handleCountryChange} labelId="select-country" autoWidth id="country" label="Country" name="country" value={country}>
                                            {countryOptions ?
                                                countryOptions.map((countryOption, index) => <MenuItem key={countryOption.id} value={countryOption.iso2}>{countryOption.name}</MenuItem>) :
                                                null
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl size="small" required fullWidth>
                                        <InputLabel id="select-city">City</InputLabel>
                                        <Select onChange={handleCityChange} size="small" required autoWidth id="city" labelId="select-city" label="City" name="city" value={city}>
                                            {cityOptions ?
                                                cityOptions.map((cityOptions, index) => <MenuItem key={cityOptions.id} value={cityOptions.name}>{cityOptions.name}</MenuItem>) : null
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleAddressChange} size="small" required fullWidth id="address" label="Address" name="address" value={address} />
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
            </Modal>
        </React.Fragment>
    );
}
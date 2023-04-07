import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCities,
    fetchCountries,
    getCity,
    getCountry,
    getFirstName,
    getLastName,
    getPhone,
    getEmail,
    getAddress
} from '../../actions/customer.actions';
// import { GoogleMaps } from './GoogleMaps';

export const CustomerInfo = () => {
    const dispatch = useDispatch();
    const {countryOptions,cityOptions,country,city,firstName,lastName,phone,email,address } = useSelector((reduxData) => reduxData.customerReducers);

    React.useEffect(() => {
        if(!countryOptions.length){
            dispatch(fetchCountries())
        }
    }, []);


    const handleCountryChange = (event) => {
        dispatch(getCountry(event.target.value));
        dispatch(fetchCities(event.target.value));
    };

    const handleCityChange = (event) => {
        dispatch(getCity(event.target.value));
    };
    const handleChangeFirstName = (event) => {
        dispatch(getFirstName(event.target.value))
    }
    const handleChangeLastName = (event) => {
        dispatch(getLastName(event.target.value))
    }
    const handleChangePhone = (event) => {
        dispatch(getPhone(event.target.value))
    }
    const handleChangeEmail = (event) => {
        dispatch(getEmail(event.target.value))
    }
    const handleChangeAddress = (event) => {
        dispatch(getAddress(event.target.value))
    }

    return (
        <Box component="form" noValidate
            sx={{ mt: 3 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField size="small"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={handleChangeFirstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField size="small"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleChangeLastName} />
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={handleChangePhone} />
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        type="address"
                        name="address"
                        value={address}
                        onChange={handleChangeAddress}
                    />
                    {/* <GoogleMaps/> */}
                </Grid>
                <Grid item xs={12}>
                    <FormControl size="small" required fullWidth>
                        <InputLabel id="select-country">Country</InputLabel>
                        <Select
                            onChange={handleCountryChange}
                            labelId="select-country"
                            autoWidth id="country"
                            label="Country"
                            name="country"
                            value={country}
                        >
                            {countryOptions ?
                                countryOptions.map((countryOption, index) => <MenuItem key={index} id={countryOption.iso2}  value={countryOption.iso2}>{countryOption.name}</MenuItem>) :
                                null
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl size="small" required fullWidth>
                        <InputLabel id="select-city">City</InputLabel>
                        <Select
                            onChange={handleCityChange}
                            size="small"
                            required
                            fullWidth
                            id="city"
                            labelId="select-city"
                            label="City"
                            name="city"
                            value={cityOptions.length || cityOptions ? city : "none"}
                        >
                            {cityOptions.length && cityOptions ?
                                cityOptions.map((cityOptions, index) => 
                                <MenuItem key={index} id={cityOptions.id} value={cityOptions.name}>{cityOptions.name}</MenuItem>) :
                                <MenuItem key="0" value="none">Không có thành phố</MenuItem>
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}


import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
// import { fetchCountry, getCountry, fetchCity, getCity, getAddress,createNewUser } from '../actions/signUp.actions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const theme = createTheme();

export const FillCustomer = () => {
    // const dispatch = useDispatch();

    // const { loadCountriesPending, countryOptions, cityOptions,
    //     country, address, city } = useSelector((reduxData) => reduxData.signUpReducers);

    // console.log(loadCountriesPending)

    // useEffect(() => {
    //     dispatch(fetchCountry());
    // }, []);

    // console.log(countryOptions)

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     dispatch(createNewUser(data));
    // };

    // const handleCountryChange = (event) => {
    //     dispatch(getCountry(event.target.value));
    //     dispatch(fetchCity(event.target.value));
    // }

    // const handleCityChange = (event) => {
    //     dispatch(getCity(event.target.value));
    // }

    // const handleAddressChange = (event) => {
    //     dispatch(getAddress(event.target.value));
    // }
    return (
        <Box component="form" noValidate
        //  onSubmit={handleSubmit}
        //   sx={{ mt: 3 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField size="small"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                    />
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
                        <Select
                            // onChange={handleCountryChange} 
                            labelId="select-country" autoWidth id="country" label="Country" name="country"
                        // value={country}
                        >
                            {/* {countryOptions ?
                        countryOptions.map((countryOption, index) => <MenuItem key={countryOption.id} value={countryOption.iso2}>{countryOption.name}</MenuItem>) :
                        null
                      } */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl size="small" required fullWidth>
                    <InputLabel id="select-city">City</InputLabel>
                    <Select 
                    // onChange={handleCityChange}
                     size="small" required fullWidth id="city" labelId="select-city" label="City" name="city" 
                    //  value={city}
                     >
                      {/* {cityOptions ?
                        cityOptions.map((cityOptions, index) => <MenuItem key={cityOptions.id} value={cityOptions.id}>{cityOptions.name}</MenuItem>) :
                        null
                      } */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField size="small" required fullWidth id="address" label="Address" name="address"
                    //  value={address}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}


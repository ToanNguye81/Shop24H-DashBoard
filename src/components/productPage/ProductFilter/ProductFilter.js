import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { ClearOutlined, Close} from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PriceRange from './PriceRange';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { resetCondition, setBrand, setCategory, setGender, setMaxPrice, setMinPrice } from '../../../actions/product.actions';

// ----------------------------------------------------------------------

export const GENDER_OPTIONS = ['MEN', 'WOMEN', "KIDS"];
export const BRAND_OPTIONS = ["NIKE", "ADIDAS", "Vans", "Balenciaga", "Converse", "MLB", "Fila", "Reebok", "Puma", "Asics"];
export const CATEGORY_OPTIONS = ['LATEST', 'DISCOUNT', 'TRENDING'];

// ----------------------------------------------------------------------

ProductFilter.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ProductFilter({ openFilter, onOpenFilter, onCloseFilter }) {

  const dispatch = useDispatch();
  const { brand, category, gender } = useSelector(reduxData => reduxData.productReducers)
  const handleCategoryCheckboxChange = (event) => {
    const categoryName = event.target.name;
    if (event.target.checked) {
      dispatch(setCategory([...category, categoryName]));
    } else {
      dispatch(setCategory(category.filter((category) => category !== categoryName)));
    }
  };
  const handleGenderCheckboxChange = (event) => {
    const genderName = event.target.name;
    if (event.target.checked) {
      dispatch(setGender([...gender, genderName]));
    } else {
      dispatch(setGender(gender.filter((gender) => gender !== genderName)));
    }
  };
  const handleBrandCheckboxChange = (event) => {
    const brandName = event.target.name;
    if (event.target.checked) {
      dispatch(setBrand([...brand, brandName]));
    } else {
      dispatch(setBrand(brand.filter((brand) => brand !== brandName)));
    }
  };

  const handleClickClear=()=>{
    dispatch(resetCondition())
  }

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<FilterAltIcon />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>

          <IconButton onClick={onCloseFilter}>
            <Close />
          </IconButton>
        </Stack>

        <Divider />
        <Stack spacing={3} sx={{ p: 3 }}>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Price
            </Typography>
            <Grid container>
              <PriceRange />
            </Grid>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Brand
            </Typography>
            <RadioGroup>
              {BRAND_OPTIONS.map((item) => (
                <FormControlLabel key={item}
                  label={item}
                  control={<Checkbox checked={brand.includes(item)} onChange={handleBrandCheckboxChange} name={item} />} />
              ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Gender
            </Typography>
            <FormGroup>
              {GENDER_OPTIONS.map((item) => (
                <FormControlLabel key={item}
                  label={item}
                  control={<Checkbox checked={gender.includes(item)} onChange={handleGenderCheckboxChange} name={item} />} />
              ))}
            </FormGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Category
            </Typography>
            <FormGroup>
              {CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel key={item}
                  label={item}
                  control={<Checkbox checked={category.includes(item)} onChange={handleCategoryCheckboxChange} name={item} />} />
              ))}
            </FormGroup>
          </div>

        </Stack>

        <Box sx={{ p:3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={handleClickClear}
            startIcon={<ClearOutlined />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

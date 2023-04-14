import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setMaxPrice, setMinPrice } from '../../../actions/product.actions';

function valuetext(value) {
  return `${value} $`;
}

const minDistance = 100;

export default function PriceRange() {
  const { minPrice, maxPrice } = useSelector(reduxData => reduxData.productReducers)
  const [price, setPrice] = React.useState([minPrice, maxPrice]);
  const dispatch=useDispatch()

  const handleChange = (event, newValue, activeThumb) => {

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };
  React.useEffect(() => { dispatch(setMinPrice(price[0])) }, [price[0]])
  React.useEffect(() => { dispatch(setMaxPrice(price[1])) }, [price[1]])

  return (
    <Box sx={{ width: 300, mt: 3 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={price}
        onChange={handleChange}
        getAriaValueText={valuetext}
        disableSwap
        color="secondary"
        valueLabelDisplay="on"
        max={2000}
      />
    </Box>
  );
}
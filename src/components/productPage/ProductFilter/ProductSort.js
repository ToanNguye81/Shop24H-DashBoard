import React, { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography, Divider } from '@mui/material';
import { Sort } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortOrder } from '../../../actions/product.actions';
// component

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'category', label: 'Category' },
  { value: 'brand', label: 'Brand' },
  { value: 'promotionPrice', label: 'Price' },
];

const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Low-High' },
  { value: 'desc', label: 'High-Low' },
];

export default function ProductSort() {
  const [open, setOpen] = useState(null);
  const { sortBy, sortOrder } = useSelector(reduxData => reduxData.productReducers)
  const dispatch = useDispatch()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleClickSortBy = (sortBy) => {
    setOpen(null)
    dispatch(setSortBy(sortBy))

  }
  const handleClickSortOrder = (sortOrder) => {
    setOpen(null)
    dispatch(setSortOrder(sortOrder))
  }

  return (
    <React.Fragment>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Sort />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {
          SORT_BY_OPTIONS.map((option,index)=>sortBy===option.value?option.label:null)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option,index) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleClickSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
        <hr/>
        {SORT_ORDER_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortOrder}
            onClick={() => handleClickSortOrder(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

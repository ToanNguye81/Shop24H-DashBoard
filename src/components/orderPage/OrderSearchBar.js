import React, { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography} from '@mui/material';
import { Sort } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
// component
import { Grid, TextField } from "@mui/material"
import { setSortBy, setSortOrder, updateOrderSearchQuery } from "../../actions/order.actions"

const SORT_BY_OPTIONS = [
  { value: 'shippedDate', label: 'Shipped' },
  { value: 'orderDate', label: 'Order' },
];

const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Oldest' },
  { value: 'desc', label: 'Newest' },
];


export const OrderSearchBar = () => {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch()
  const { searchQuery, sortBy, sortOrder } = useSelector(reduxData => reduxData.orderReducers)

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleClickSortBy = (sortDate) => {
    setOpen(null)
    dispatch(setSortBy(sortDate))
  }

  const handleClickSortOrder = (sortOrder) => {
    setOpen(null)
    dispatch(setSortOrder(sortOrder))
  }
  const handleChangeSearchQuery = (searchQuery) => {
    dispatch(updateOrderSearchQuery(searchQuery))
  }

  return (
    <Grid container columnSpacing={1} mb={2} spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Grid item xs={12} sm={10} md={9}>
        <TextField fullWidth type="text" size="small" label={"Find order .."} value={searchQuery} onChange={(e) => handleChangeSearchQuery(e.target.value)} />
      </Grid>
      <Grid item sx={{width:"auto"}}>
        <Button
          color="inherit"
          disableRipple
          onClick={handleOpen}
          endIcon={<Sort />}
        >
          Sort Date:&nbsp;
          <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {
              SORT_BY_OPTIONS.map((option, index) => sortBy === option.value ? option.label : null)}
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
          {SORT_BY_OPTIONS.map((option, index) => (
            <MenuItem
              key={option.value}
              selected={option.value === sortBy}
              onClick={() => handleClickSortBy(option.value)}
              sx={{ typography: 'body2' }}
            >
              {option.label}
            </MenuItem>
          ))}
          <hr />
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
      </Grid>
    </Grid>
  )
}



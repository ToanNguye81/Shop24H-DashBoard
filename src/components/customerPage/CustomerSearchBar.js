import React, { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography, Container, Box } from '@mui/material';
import { Sort } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
// component
import { Grid, TextField } from "@mui/material"
import { setSortBy, setSortOrder, updateCustomerSearchQuery } from "../../actions/customer.actions"

const SORT_BY_OPTIONS = [
  { value: 'createdAt', label: 'Create' },
  { value: 'updatedAt', label: 'Update' },
];

const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Oldest' },
  { value: 'desc', label: 'Newest' },
];


export const CustomerSearchBar = () => {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch()
  const { searchQuery, sortBy, sortOrder } = useSelector(reduxData => reduxData.customerReducers)

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
    dispatch(updateCustomerSearchQuery(searchQuery))
  }

  return (
    <Grid item container direction="row" alignItems="center" columnSpacing={1} mb={2} spacing={2} mt={2}>
      <TextField
        sx={{ flexGrow: 1 ,ml:1}}
        type="text"
        size="small"
        label={"Find customer .."}
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
      <Button
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Sort />}
      >
        Sort Date:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_BY_OPTIONS.map((option, index) => sortBy === option.value ? option.label : null)}
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
  )
}





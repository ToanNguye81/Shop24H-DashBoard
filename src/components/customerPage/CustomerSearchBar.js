// import { Grid, TextField } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import { updateCustomerSearchQuery } from "../../actions/customer.actions"

// export const CustomerSearchBar = () => {

//     const dispatch = useDispatch()
//     const { searchQuery } = useSelector(reduxData => reduxData.customerReducers)

//     const handleChangeSearchQuery = (searchQuery) => {
//         dispatch(updateCustomerSearchQuery(searchQuery))
//     }
//     return (
//         <Grid container columnSpacing={1} mb={2} spacing={2} >
//             <Grid item xs={12} sm={12} md={12} >
//                 <TextField fullWidth type="text" size="small" label={"Find customer .."} value={searchQuery} onChange={(e) => handleChangeSearchQuery(e.target.value)} />
//             </Grid>
//         </Grid>
//     )
// }
import React, { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography} from '@mui/material';
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

  const handleClickSortCustomer = (sortOrder) => {
    setOpen(null)
    dispatch(setSortOrder(sortOrder))
  }
  const handleChangeSearchQuery = (searchQuery) => {
    dispatch(updateCustomerSearchQuery(searchQuery))
  }

  return (
    <Grid container columnSpacing={1} mb={2} spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Grid item xs={12} sm={10} md={9}>
        <TextField fullWidth type="text" size="small" label={"Find customer .."} value={searchQuery} onChange={(e) => handleChangeSearchQuery(e.target.value)} />
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
              onClick={() => handleClickSortCustomer(option.value)}
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



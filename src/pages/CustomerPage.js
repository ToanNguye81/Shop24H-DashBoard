import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {Card,Table,Stack,Button,Popover,TableRow,MenuItem,TableBody,TableCell,Container,Typography,IconButton,TableContainer,Grid,TableHead, CircularProgress, TablePagination} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "../actions/customer.actions";

const TABLE_HEAD =[
  "Action",
  "Last Name",
  "First Name",
  "Country",
  "City",
  "Phone",
  "Email",
  "Address",
  "Orders",
  
]

export const CustomerPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { customers, pending, totalCustomer } = useSelector((reduxData) => reduxData.customerReducers);

  useEffect(() => {
    dispatch(fetchCustomer(rowsPerPage, page));
  }, [rowsPerPage, page]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Customer </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customer
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Customer
          </Button>
        </Stack>

        <Card>
          {pending ?
            <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
              <CircularProgress />
            </Grid>
            :
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} >
                  <Table >
                    <TableHead>
                      <TableRow>
                        {TABLE_HEAD.map((title,index)=>{return(
                          <TableCell key={index}>{title}</TableCell>
                          )
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((element, index) => {
                        return (
                          <>
                            <TableRow key={element._id}>
                              <TableCell fixed align="right">
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
                              </TableCell>
                              <TableCell>{element.lastName}</TableCell>
                              <TableCell>{element.firstName}</TableCell>
                              <TableCell>{element.country}</TableCell>
                              <TableCell>{element.city}</TableCell>
                              <TableCell>{element.phone}</TableCell>
                              <TableCell>{element.email}</TableCell>
                              <TableCell>{element.address}</TableCell>
                              <TableCell>{element.orders.map((order, index) => `${order} `)}</TableCell>
                            </TableRow>
                          </>)
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </>
          }
          <TablePagination
            rowsPerPageOptions={[5, 10, 25,50,100]}
            component="div"
            count={totalCustomer}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: '#3f51b5' }}>
          <Iconify icon={'eva:edit-fill'} sx={{ ml: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ml: 2 }} />
          Delete
        </MenuItem>
      </Popover>

    </React.Fragment>
  )
}

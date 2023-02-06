import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Card, Table, Stack, Popover, TableRow, TableBody, TableCell, Container, Typography, TableContainer, Grid, TableHead, CircularProgress, TablePagination } from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../actions/order.actions";
import { NewOrder } from '../components/orderPage/NewOrder';
import { EditOrder } from '../components/orderPage/EditOrder';
import { DeleteOrder } from '../components/orderPage/DeleteOrder';

const TABLE_HEAD = [
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

export const OrderPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { orders, pending, totalOrder } = useSelector((reduxData) => reduxData.orderReducers);

  useEffect(() => {
    dispatch(fetchOrder(rowsPerPage, page));
  }, [rowsPerPage, page]);

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
        <title> Dashboard: Order </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
          <NewOrder />
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
                      <TableRow >
                        {TABLE_HEAD.map((title, index) => {
                          return (
                            <TableCell align="left" key={index}>{title}</TableCell>
                          )
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((element, index) => {
                        return (
                          <>
                            <TableRow key={element._id}>
                              <TableCell align="left">
                                    <EditOrder paramOrder={element}/>
                                    <DeleteOrder idValue={element._id}/>
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={totalOrder}
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

      </Popover>
    </React.Fragment>
  )
}

import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import {
  Card,
  Button,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Grid,
  TableHead,
  CircularProgress,
  TablePagination,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomer } from "../actions/customer.actions";
import { NewCustomer } from "../components/customerPage/NewCustomer";
import { EditCustomer } from "../components/customerPage/EditCustomer";
import { DeleteCustomer } from "../components/customerPage/DeleteCustomer";
import { fetchOrder, getOrderById } from "../actions/order.actions";
import { OrderPage } from "./OrderPage";
import { OrderInfo } from "../components/orderPage/OrderInfo";

const TABLE_HEAD = [
  "Action",
  "Last Name",
  "First Name",
  "Country",
  "City",
  "Phone",
  "Email",
  "Address",
  "OrderCodes",
];

export const CustomerPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { customers, pending, totalCustomer, error } = useSelector(
    (reduxData) => reduxData.customerReducers
  );
  const { role } = useSelector((reduxData) => reduxData.loginReducers);

  useEffect(() => {
    dispatch(fetchCustomer(rowsPerPage, page));
  }, [rowsPerPage, page, role]);
  
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOrderCode = async (event) => {
    console.log(event.target.value);
    await dispatch(getOrderById(event.target.value))
    await setOpen(true)
  };

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Customer </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Customer
          </Typography>
          <NewCustomer />
        </Stack>
        {error ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error" variant="outlined">
              <AlertTitle>Warning</AlertTitle>
              <strong>You do not have permission to access this data</strong>
            </Alert>
          </Stack>
        ) : (
          <Card>
            {pending ? (
              <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <TableHead>
                        <TableRow key="title">
                          {TABLE_HEAD.map((title, index) => {
                            return (
                              <TableCell align="left" key={index}>
                                {title}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customers.map((element, index) => {
                          return (
                            <>
                              <TableRow key={element._id}>
                                <TableCell align="left">
                                  <EditCustomer paramCustomer={element} />
                                  <DeleteCustomer idValue={element._id} />
                                </TableCell>
                                <TableCell>{element.lastName}</TableCell>
                                <TableCell>{element.firstName}</TableCell>
                                <TableCell>{element.country}</TableCell>
                                <TableCell>{element.city}</TableCell>
                                <TableCell>{element.phone}</TableCell>
                                <TableCell>{element.email}</TableCell>
                                <TableCell>{element.address}</TableCell>
                                <TableCell>
                                  {element.orders.map((order, index) => (
                                    <Button
                                      key={index}
                                      variant="text"
                                      size="small"
                                      onClick={handleClickOrderCode}
                                      value={order._id}
                                    >
                                      {order.orderCode}
                                    </Button>
                                  ))}
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </>
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={totalCustomer}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Order information</DialogTitle>
        <DialogContent>
          <OrderInfo/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} variant="contained">Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

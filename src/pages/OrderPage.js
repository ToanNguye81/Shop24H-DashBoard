// import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// // @mui
// import { Card, Table, Stack, TableRow, TableBody, TableCell, Container, Typography, TableContainer, Grid, TableHead, CircularProgress, TablePagination, IconButton } from '@mui/material';
// // components
// import Scrollbar from '../components/scrollbar';
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrder } from "../actions/order.actions";
// import { NewOrder } from '../components/orderPage/NewOrder';
// import { EditOrder } from '../components/orderPage/EditOrder';
// import { DeleteOrder } from '../components/orderPage/DeleteOrder';
// import { formatTime } from '../utils/formatTime';


// const TABLE_HEAD = [
//   "Action",
//   "Order Code",
//   "Order Date",
//   "Shipped Date",
//   "Note",
//   "Cost",
//   "Status",
// ]

// export const OrderPage = () => {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const { orders, pending, totalOrder } = useSelector((reduxData) => reduxData.orderReducers);

//   useEffect(() => {
//     dispatch(fetchOrder(rowsPerPage, page));
//   }, [rowsPerPage, page]);
//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <React.Fragment>
//       <Helmet>
//         <title> Dashboard: Order </title>
//       </Helmet>
//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Typography variant="h4" gutterBottom>
//             Order
//           </Typography>
//           <NewOrder />
//         </Stack>

//         <Card>
//           {pending ?
//             <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
//               <CircularProgress />
//             </Grid>
//             :
//             <>
//               <Scrollbar>
//                 <TableContainer sx={{ minWidth: 800 }} >
//                   <Table >
//                     <TableHead>
//                       <TableRow >
//                         {TABLE_HEAD.map((title, index) => {
//                           return (
//                             <TableCell align="left" key={index}>{title}</TableCell>
//                           )
//                         })}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {orders.map((element, index) => {
//                         return (
//                           <>
//                             <TableRow key={element._id}>
//                               <TableCell align="left">
//                                 <EditOrder paramOrder={element} />
//                                 <DeleteOrder idValue={element._id} />
//                               </TableCell>
//                               <TableCell>{element.orderCode}</TableCell>
//                               <TableCell>{formatTime(element.orderDate)}</TableCell>
//                               <TableCell>{formatTime(element.shippedDate)}</TableCell>
//                               <TableCell>{element.note}</TableCell>
//                               <TableCell>{element.cost}</TableCell>
//                               <TableCell>{element.status}</TableCell>
//                             </TableRow>
//                           </>)
//                       })}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Scrollbar>
//             </>
//           }
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, 50, 100]}
//             component="div"
//             count={totalOrder}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Container>
//     </React.Fragment>
//   )
// }

import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder, getAllOrderOfCustomer } from "../actions/order.actions"
import { OrderTable } from "../components/orderPage/OrderTable"
import { ErrorStack } from "../components/orderPage/ErrorStack"
import { NewOrder } from "../components/orderPage/NewOrder"
import { useParams } from "react-router-dom"

export const OrderPage = () => {
  const { orders, pending, totalOrder, error } = useSelector((reduxData) => reduxData.orderReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);
  const { customerId } = useParams()

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    customerId ? dispatch(getAllOrderOfCustomer(rowsPerPage, page, "", customerId)) : dispatch(getAllOrder(rowsPerPage, page));
  }, [rowsPerPage, page, role, customerId]);


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
            {customerId ? `All Orders Of Customer: ${customerId}` : 'All Orders'}
          </Typography>
          <NewOrder />
        </Stack>
        {error ?
          <ErrorStack />
          :
          <Card>
            <OrderTable orders={orders} pending={pending} totalOrder={totalOrder} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalOrder}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        }
      </Container>
    </React.Fragment>
  )
}

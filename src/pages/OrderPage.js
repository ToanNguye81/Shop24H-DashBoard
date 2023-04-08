

import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrder, getAllOrderOfCustomer } from "../actions/order.actions"
import { OrderTable } from "../components/orderPage/OrderTable"
import { NewOrder } from "../components/orderPage/NewOrder"
import { useParams } from "react-router-dom"
import { ErrorStack } from "../components/common/ErrorStack"

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
          <ErrorStack message="You do not have permission to access this data" />
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

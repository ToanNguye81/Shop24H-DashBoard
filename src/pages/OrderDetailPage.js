import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { OrderDetailTable } from "../components/orderDetailPage/OrderDetailTable"
import { ErrorStack } from "../components/orderDetailPage/ErrorStack"
import { useParams } from "react-router-dom"
import { getAllOrderDetail, getAllOrderDetailOfOrder } from "../actions/orderDetail.actions"

export const OrderDetailPage = () => {
  const { orderDetails, pending, totalOrderDetail, error } = useSelector((reduxData) => reduxData.orderDetailReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);
  const { orderId } = useParams()

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  useEffect(() => {
    orderId ? dispatch(getAllOrderDetailOfOrder(rowsPerPage, page,"", orderId)) : dispatch(getAllOrderDetail(rowsPerPage, page));
  }, [rowsPerPage, page, role, orderId]);
 
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
        <title> Dashboard: Order Detail </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {orderId ? `All OrderDetails Of Order: ${orderId}` : 'All OrderDetails'}
          </Typography>
        </Stack>
        {error ?
          <ErrorStack />
          :
          <Card>
            <OrderDetailTable orderDetails={orderDetails} pending={pending} totalOrderDetail={totalOrderDetail} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalOrderDetail}
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

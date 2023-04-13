import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { OrderDetailTable } from "../components/orderDetailPage/OrderDetailTable"
import { useParams } from "react-router-dom"
import { getAllOrderDetail, getAllOrderDetailOfOrder } from "../actions/orderDetail.actions"
import { ErrorStack } from "../components/common/ErrorStack"
import { OrderDetailSearchBar } from "../components/orderDetailPage/OrderDetailSearchBar"

export const OrderDetailPage = () => {
  const { orderDetails, pending, totalOrderDetail, error, searchQuery, sortBy, sortOrder } = useSelector((reduxData) => reduxData.orderDetailReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);
  const { orderId } = useParams()

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setRowsPerPage] = useState(5);

  useEffect(() => {
    orderId ? dispatch(getAllOrderDetailOfOrder({ limit, page, searchQuery, sortBy, sortOrder, orderId })) : dispatch(getAllOrderDetail({ limit, page, searchQuery, sortBy, sortOrder }));
  }, [limit, page, role, searchQuery, sortBy, sortOrder, orderId]);

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
        <OrderDetailSearchBar />
        {error ?
          <ErrorStack message="You do not have permission to access this data" />
          :
          <Card>
            <OrderDetailTable orderDetails={orderDetails} pending={pending} totalOrderDetail={totalOrderDetail} />
            <TablePagination
              limitOptions={[5, 10, 25]}
              component="div"
              count={totalOrderDetail}
              limit={limit}
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

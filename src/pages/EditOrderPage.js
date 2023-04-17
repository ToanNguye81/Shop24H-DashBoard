import { CircularProgress, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getOrderById } from "../actions/order.actions"
import { OrderData } from "../components/orderPage/OrderData"
import { OrderDetailPage } from "./OrderDetailPage"

export const EditOrderPage = () => {
  const dispatch = useDispatch();
  const { orderById, error, getOrderByIdPending } = useSelector((reduxData) => reduxData.orderReducers);
  const { orderId } = useParams();
  console.log(orderById)
  useEffect(() => {
    if (orderId)
      console.log(orderId)
    dispatch(getOrderById(orderId))
  }, [orderId]);

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Edit Order </title>
      </Helmet>

      <OrderDetailPage />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
          <Typography variant="h4" gutterBottom>
            Edit Order
          </Typography>
        </Stack>
        {getOrderByIdPending  ?
          <CircularProgress />
          :
          orderById?<OrderData initOrder={orderById} />:null
        }
      </Container>
    </React.Fragment>
  )
}

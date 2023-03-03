import { CircularProgress, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getOrderById } from "../actions/order.actions"
import { ErrorStack } from "../components/orderDetailPage/ErrorStack"
import { NewOrderDetail } from "../components/orderDetailPage/NewOrderDetail"
import { EditOrder } from "../components/orderPage/EditOrder"
import { NewOrder } from "../components/orderPage/NewOrder"
import { OrderData } from "../components/orderPage/OrderData"
import { OrderDetailPage } from "./OrderDetailPage"

export const EditOrderPage = () => {
  const dispatch = useDispatch();
  const { orderById, error, getOrderByIdPending } = useSelector((reduxData) => reduxData.orderReducers);
  const { orderId } = useParams();
  useEffect(() => {
    if (orderId)
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
        {getOrderByIdPending?
        <CircularProgress />
        :
        <OrderData initOrder={orderById} />
        }
      </Container>
    </React.Fragment>
  )
}
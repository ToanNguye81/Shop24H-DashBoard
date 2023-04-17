

import React from "react"
import { Button } from "@mui/material"
import { Detail } from "../components/createOrder/Detail"
import { AddToCart } from "../components/createOrder/AddToCart"
import { CustomerInfo } from "../components/createOrder/CustomerInfo"
import { useDispatch, useSelector } from "react-redux"
import { createNewCustomer } from "../actions/customer.actions"
import { createNewOrderDetail } from "../actions/orderDetail.actions"
import { createNewOrder } from "../actions/order.actions"
import { enqueueSnackbar } from "notistack"
import { Container } from "@mui/material"

export const CreateOrderPage = () => {
    return (
        <React.Fragment>
            <Container>
                <h2>Add To Cart</h2>
                <AddToCart />
                <h2>Cart Detail</h2>
                <Detail />
                <h2>Customer information</h2>
                <CustomerInfo />
            </Container>
        </React.Fragment>
    )
}

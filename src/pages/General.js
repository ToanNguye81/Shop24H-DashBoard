

import React from "react"
import { Button } from "@mui/material"
import { Detail } from "../components/orderPage/NewOrder/Detail"
import { AddToCart } from "../components/orderPage/NewOrder/AddToCart"
import { FillCustomer } from "../components/orderPage/NewOrder/FillCustomer"
import { useDispatch, useSelector } from "react-redux"
import { createNewCustomer } from "../actions/customer.actions"
import { createNewOrderDetail } from "../actions/orderDetail.actions"
import { createNewOrder } from "../actions/order.actions"
import { SnackbarProvider, useSnackbar } from "notistack"

const Content = () => {
    const dispatch = useDispatch()
    const { country, city, firstName, lastName, phone, email, address } = useSelector((reduxData) => reduxData.customerReducers);
    const { cart } = useSelector((reduxData) => reduxData.orderReducers);
    const { enqueueSnackbar } = useSnackbar()

    const handleCreateOrder = async () => {
        const customerData = { country, city, firstName, lastName, phone, email, address }
        try {
            const customerResult = await dispatch(createNewCustomer(customerData))

            const customerId = customerResult.data._id

            if(!cart.length){
                // Warning if cart is empty
                enqueueSnackbar("Your cart is empty", { variant: "warning" })
            }
            if (customerId && cart.length) {
                const orderResult = await dispatch(createNewOrder(customerId))

                const orderId = orderResult.data._id;

                if (orderId) {
                    const orderDetailPromises = cart.map((orderDetail) =>
                        dispatch(createNewOrderDetail(orderId, orderDetail))
                    )

                    await Promise.all(orderDetailPromises)

                    // Show success Snackbar
                    enqueueSnackbar("Order created successfully", { variant: "success" })
                }
            }

        } catch (error) {
            // Handle any errors here
            console.log(error)
              // Show success Snackbar
            enqueueSnackbar('Something went wrong.', { variant: "error" })
        }
    }

    return (
        <React.Fragment>
            <h2>Add To Cart</h2>
            <AddToCart />
            <h2>Cart Detail</h2>
            <Detail />
            <h2>Customer information</h2>
            <FillCustomer />
            <Button sx={{ mt: 3 }} variant="contained" onClick={handleCreateOrder}>Create Order</Button>
        </React.Fragment>
    )
}

export const General = () => (
  <SnackbarProvider maxSnack={3}>
    <Content />
  </SnackbarProvider>
);

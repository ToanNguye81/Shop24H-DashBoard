import React from "react"
import { Button } from "@mui/material"
import { Detail } from "../components/orderPage/NewOrder/Detail"
import { AddToCart } from "../components/orderPage/NewOrder/AddToCart"
import { FillCustomer } from "../components/orderPage/NewOrder/FillCustomer"
import { useDispatch, useSelector } from "react-redux"
import { createNewCustomer } from "../actions/customer.actions"
import { createNewOrderDetail } from "../actions/orderDetail.actions"
import { createNewOrder } from "../actions/order.actions"

export const General = () => {
    const dispatch = useDispatch()
    const { country, city, firstName, lastName, phone, email, address } = useSelector((reduxData) => reduxData.customerReducers);
    const { cart } = useSelector((reduxData) => reduxData.orderReducers);
    
    const handleCreateOrder = async () => {
        const customerData = { country, city, firstName, lastName, phone, email, address }
        try {
            const customerResult = await dispatch(createNewCustomer(customerData))
            
            const customerId = customerResult.data._id

            if (customerId && cart.length) {
                const orderResult = await dispatch(createNewOrder(customerId))

                const orderId = orderResult.data._id;
                
                if (orderId) {
                    cart.forEach((orderDetail) => {
                        dispatch(createNewOrderDetail(orderId, orderDetail)).then((detailResult) => {
                            // Handle result of createNewOrderDetail dispatch
                            console.log("Tạo đơn hàng thành công")
                        })
                    })
                }
            }
        } catch (error) {
            // Handle any errors here
            console.log(error)
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
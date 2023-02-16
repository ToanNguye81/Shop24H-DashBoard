import React from "react"
import { Button } from "@mui/material"
import { Detail } from "../components/orderPage/NewOrder/Detail"
import { AddToCart } from "../components/orderPage/NewOrder/AddToCart"
import { FillCustomer } from "../components/orderPage/NewOrder/FillCustomer"


export const General=()=>{


    const handleCreateOrder=()=>{
     console.log(customerData)   
    }

    return(
        <React.Fragment>
            <h2>Add To Cart</h2>
            <AddToCart/>
            <h2>Cart Detail</h2>
            <Detail/>
            <h2>Customer information</h2>
            <FillCustomer/>
            <Button sx={{mt:3}} variant="contained" onClick={handleCreateOrder}>Create Order</Button>
        </React.Fragment>
    )
}
import { CircularProgress, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getCustomerById } from "../actions/customer.actions"
import { CustomerData } from "../components/customerPage/CustomerData"

export const EditCustomerPage = () => {
  const dispatch = useDispatch();
  const { customerById, getCustomerByIdPending } = useSelector((reduxData) => reduxData.customerReducers);
  const { customerId } = useParams();
  console.log(customerById)
  useEffect(() => {
    if (customerId)
      dispatch(getCustomerById(customerId))
  }, [customerId]);

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Edit Customer </title>
      </Helmet>

      {/* <CustomerDetailPage /> */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
          <Typography variant="h4" gutterBottom>
            Edit Customer
          </Typography>
        </Stack>
        {getCustomerByIdPending?
        <CircularProgress />
        :
        <CustomerData initCustomer={customerById} />
        }
      </Container>
    </React.Fragment>
  )
}

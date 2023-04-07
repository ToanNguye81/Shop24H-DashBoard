import {  Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React from "react"
import { Helmet } from "react-helmet-async"
import { EditCustomer } from "../components/editCustomerPage/EditCustomer"
import { useParams } from "react-router-dom"

export const EditCustomerPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Edit Customer </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
          <Typography variant="h4" gutterBottom>
            Edit Customer
          </Typography>
        </Stack>
        <EditCustomer />
      </Container>
    </React.Fragment>
  )
}

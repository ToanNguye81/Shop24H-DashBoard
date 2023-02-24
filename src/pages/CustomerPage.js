import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllCustomer } from "../actions/customer.actions"
import { CustomerTable } from "../components/customerPage/CustomerTable"
import { ErrorStack } from "../components/customerPage/ErrorStack"
import { NewCustomer } from "../components/customerPage/NewCustomer"

export const CustomerPage = () => {
  const { customers, pending, totalCustomer, error } = useSelector((reduxData) => reduxData.customerReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllCustomer(rowsPerPage, page));
  }, [rowsPerPage, page, role]);

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
        <title> Dashboard: Customer </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customer
          </Typography>
          <NewCustomer />
        </Stack>
        {error ?
          <ErrorStack />
          :
          <Card>
            <CustomerTable customers={customers} pending={pending} totalCustomer={totalCustomer} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCustomer}
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
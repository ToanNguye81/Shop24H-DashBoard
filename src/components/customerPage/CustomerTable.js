import {
  TableRow,
  TableBody,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  IconButton,
  Button,
  TableContainer,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteCustomer } from "./DeleteCustomer";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const TABLE_HEAD =
  [
    "Action",
    "Last Name",
    "First Name",
    "Country",
    "City",
    "Phone",
    "Email",
    "Address",
    "OrderCodes",
  ];

export const CustomerTable = ({ customers, pending }) => {

  const navigate = useNavigate()

  const handleClickOrderCode = (customerId) => {
    navigate(`/dashboard/customers/${customerId}/orders`)
  };

  const handleOnClickEdit = (customerId) => {
    navigate(`/dashboard/customers/${customerId}`)
  }

  return (
    <React.Fragment>
      {pending ?
        <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
          <CircularProgress />
        </Grid>
        :
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow key={"title"}>
                {TABLE_HEAD.map((title, index) => {
                  return (
                    <TableCell align="left" key={index}>
                      {title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index} >
                  <TableCell align="left">
                    <IconButton sx={{ color: '#3f51b5' }} aria-label="edit" size="small" onClick={()=>handleOnClickEdit(customer._id)}>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <DeleteCustomer idValue={customer._id} />
                  </TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.country}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={()=>handleClickOrderCode(customer._id)}>
                      ORDERS
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </React.Fragment>
  );
};

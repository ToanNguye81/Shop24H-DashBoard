import {
  TableRow,
  TableBody,
  LinearProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../scrollbar/Scrollbar";
import { DeleteCustomer } from "./DeleteCustomer";
import { EditCustomer } from "./EditCustomer";

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
  const navigate=useNavigate()

  const handleClickOrderCode = async (event) => {
    const customerId=event.target.value
    navigate(`/dashboard/customers/${customerId}/orders`)
  };

  return (
    <React.Fragment>
      {pending ?
        <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
          <LinearProgress />
        </Grid>
        :
        <>
          <Scrollbar>
            <Table sx={{ minWidth: 200 }}>
              <TableHead>
                <TableRow>
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
                {customers.map((customer, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell align="left">
                          <EditCustomer paramCustomer={customer} />
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
                          <Button variant="outlined" size="small" onClick={handleClickOrderCode} value={customer._id}>
                            ORDERS
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </>
      }
    </React.Fragment>
  );
};

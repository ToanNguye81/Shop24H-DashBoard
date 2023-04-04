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
  Box,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditCustomer } from "./EditCustomer";
import { useNavigate } from "react-router-dom";
import { DeleteCustomer } from "./DeleteCustomer";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { getCustomerById } from "../../actions/customer.actions";

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
                <Row key={index} row={index} customer={customer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </React.Fragment>
  );
};

export const Row = ({ customer, row }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState(open ? "#FFB74D" : "White")
  const { customerById } = useSelector(reduxData => reduxData.customerReducers)

  const handleClickOrderCode = async (event) => {
    navigate(`/dashboard/customers/${customer._id}/orders`)
  };

  useEffect(() => {
    if (open) {
      dispatch(getCustomerById(customer._id))
    }
    open ? setColor("#FFB74D") : setColor("White")
  }, [open])

  useEffect(() => {
    if (customer._id !== customerById) {
      setOpen(false);
    }
  }, [customerById])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <React.Fragment>
      <TableRow key={row} onClick={toggleDrawer(true)} sx={{ backgroundColor: color }}>
        <TableCell align="left">
          <IconButton sx={{ color: '#3f51b5' }} aria-label="edit" size="small" onClick={toggleDrawer(true)}>
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
          <Button variant="outlined" size="small" onClick={handleClickOrderCode}>
            ORDERS
          </Button>
        </TableCell>
      </TableRow>

       <SwipeableDrawer
             anchor="top"
             open={open}
             onClose={toggleDrawer(false)}
             onOpen={toggleDrawer(true)}
          >
            <Box sx={{ margin: 3 }} >
              <Typography variant="h6" gutterBottom component="div">
                Customer Detail
              </Typography>
              <EditCustomer customer={customer} />
            </Box>
          </SwipeableDrawer>

      
    </React.Fragment>
  );
}

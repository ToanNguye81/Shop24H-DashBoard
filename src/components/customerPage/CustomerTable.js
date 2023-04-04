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
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
          <Table sx={{ minWidth: 200 }}>
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
  const [expand, setExpand] = React.useState(false);
  const [color, setColor] = useState(expand ? "#FFB74D" : "White")
  const customerId = customer._id
  const { customerById } = useSelector(reduxData => reduxData.customerReducers)

  const handleClickOrderCode = async (event) => {
    const customerId = event.target.value
    navigate(`/dashboard/customers/${customerId}/orders`)
  };

  useEffect(() => {
    if (expand) {
      dispatch(getCustomerById(customerId))
    }
    expand ? setColor("#FFB74D") : setColor("White")
  }, [expand])

  useEffect(() => {
    if (customerId !== customerById) {
      setExpand(false)
    }
  }, [customerById])

  return (
    <React.Fragment>
      <TableRow key={row} onClick={() => setExpand(!expand)} sx={{ backgroundColor: color }}>
        <TableCell align="left">
          <IconButton sx={{ color: '#3f51b5' }} aria-label="expand row" size="small" onClick={() => setExpand(!expand)}>
            {expand ? <KeyboardArrowDownIcon /> : <ModeEditOutlineOutlinedIcon />}
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
          <Button variant="outlined" size="small" onClick={handleClickOrderCode} value={customer._id}>
            ORDERS
          </Button>
        </TableCell>
      </TableRow>

      {/* Collapse Row */}
      <TableRow sx={{ border: "1px solid #FFB74D" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9} >
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }} >
              <Typography variant="h6" gutterBottom component="div">
                Customer Detail
              </Typography>
              <EditCustomer customer={customer} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


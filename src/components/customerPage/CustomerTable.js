import {
  TableRow,
  TableBody,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
  TablePagination,
  Pagination
} from "@mui/material";
import React,
{
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../actions/customer.actions";
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

export const CustomerTable = ({ customers, pending, totalCustomer }) => {
  //   const dispatch = useDispatch();
  // const dispatch = useDispatch();

  // const [page, setPage] = useState(0);
  //   const [open, setOpen] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const { customers, pending, totalCustomer, error } = useSelector(
  //     (reduxData) => reduxData.customerReducers
  //   );
  //   const { role } = useSelector((reduxData) => reduxData.loginReducers);

  //   useEffect(() => {
  //     dispatch(getAllCustomer(rowsPerPage, page));
  //   }, [rowsPerPage, page, role]);

  //   const handleChangeRowsPerPage = (event) => {
  //     setPage(0);
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //   };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const { role } = useSelector((reduxData) => reduxData.loginReducers);

  // useEffect(() => {
  //   dispatch(getAllCustomer(rowsPerPage, page));
  // }, [rowsPerPage, page, role]);


  const handleClickOrderCode = async (event) => {
    console.log(event.target.value);
    await dispatch(getOrderById(event.target.value))
    await setOpen(true)
  };
  
  return (
    <React.Fragment>
      {pending ?
        <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
          <CircularProgress />
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
                          <Button variant="text" size="small" onClick={handleClickOrderCode} value={customer._id}>
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

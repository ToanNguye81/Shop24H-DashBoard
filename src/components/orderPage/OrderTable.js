import {
  TableRow,
  TableBody,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import Iconify from "../iconify/Iconify";
import Scrollbar from "../scrollbar/Scrollbar";
import { DeleteOrder } from "./DeleteOrder";

const TABLE_HEAD =
  [
    "Action",
    "Order Code",
    "Order Date",
    "Shipped Date",
    "Cost",
    "Status",
    "Note",
    "Order Detail"
  ];

export const OrderTable = ({ orders, pending }) => {
  const navigate = useNavigate()
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
                {orders.map((order, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell align="left">
                          <IconButton sx={{ color: '#3f51b5' }} onClick={() => navigate(`/dashboard/orders/${order._id}`)}>
                            <Iconify icon={'eva:edit-fill'} />
                          </IconButton>
                          <DeleteOrder idValue={order._id} />
                        </TableCell>
                        <TableCell>{order.orderCode}</TableCell>
                        <TableCell>{formatTime(order.orderDate)}</TableCell>
                        <TableCell>{formatTime(order.shippedDate)}</TableCell>
                        <TableCell>{order.cost}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.note}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={()=>navigate(`/dashboard/orders/${order._id}/orderDetails`)} value={order._id}>
                            ORDER DETAIL
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

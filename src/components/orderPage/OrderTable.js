import {
  TableRow,
  TableBody,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";
import React,
{
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrder } from "../../actions/order.actions";
import { formatTime } from "../../utils/formatTime";
import Scrollbar from "../scrollbar/Scrollbar";
import { DeleteOrder } from "./DeleteOrder";
import { EditOrder } from "./EditOrder";

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
  const navigate=useNavigate()
  const handleClickOrderDetail = async (event) => {
    const orderDetailId=event.target.value
    navigate(`/dashboard/orders/${orderDetailId}/orderDetails`)
    
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
                          <EditOrder paramOrder={order} />
                          <DeleteOrder idValue={order._id} />
                        </TableCell>
                        <TableCell>{order.orderCode}</TableCell>
                        <TableCell>{formatTime(order.orderDate)}</TableCell>
                        <TableCell>{formatTime(order.shippedDate)}</TableCell>
                        <TableCell>{order.cost}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.note}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={handleClickOrderDetail} value={order._id}>
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

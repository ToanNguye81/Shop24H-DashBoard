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
import { useNavigate } from "react-router-dom";
import Scrollbar from "../scrollbar/Scrollbar";
import { DeleteOrderDetail } from "./DeleteOrderDetail";
import { EditOrderDetail } from "./EditOrderDetail";

const TABLE_HEAD =
  ["Action",
    "Image",
    "Brand",
    "Name",
    "Type",
    "Buy Price",
    "Promotion Price",
    "Amount in Stock",
    "Category",
    "Quantity",
    "CurrentProduct"
  ];

export const OrderDetailTable = ({ orderDetails, pending }) => {
  const navigate = useNavigate()

  const handleClickProductDetail = async (event) => {
    const orderId = event.target.value
    navigate(`/dashboard/products/${orderId}`)
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
                {orderDetails.map((orderDetail, index) => {
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell align="left">
                          <EditOrderDetail paramOrderDetail={orderDetail} />
                          <DeleteOrderDetail idValue={orderDetail._id} />
                        </TableCell>
                        <TableCell>
                          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                            <img src={orderDetail.product.imageUrl} maxWidth="100px" />
                          </Grid>
                        </TableCell>
                        <TableCell>{orderDetail.product.brand}</TableCell>
                        <TableCell>{orderDetail.product.name}</TableCell>
                        <TableCell>{orderDetail.product.type}</TableCell>
                        <TableCell>{orderDetail.product.buyPrice}</TableCell>
                        <TableCell>{orderDetail.product.promotionPrice}</TableCell>
                        <TableCell>{orderDetail.product.amount}</TableCell>
                        <TableCell>{orderDetail.product.category}</TableCell>
                        <TableCell>{orderDetail.quantity}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small" onClick={handleClickProductDetail} value={orderDetail.product._id}>
                            Current product
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

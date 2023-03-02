import React, { useEffect } from "react";
import { useState } from 'react';
// @mui
import { TextField, Table, Button, TableRow, TableBody, TableCell, TableContainer, Grid, TableHead, CircularProgress, TablePagination, Paper, IconButton, Typography, Box, Card } from '@mui/material';
// components
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../actions/product.actions";
import { Add, Remove } from "@mui/icons-material";
import { decreaseQuantity, increaseQuantity } from "../../actions/order.actions";


const TABLE_HEAD = [
  "Image",
  "Name",
  "Promotion Price",
  "Quantity",
  "Total ($)",
]
export const Detail = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { pending, totalProduct } = useSelector((reduxData) => reduxData.productReducers);
  const { cart } = useSelector((reduxData) => reduxData.orderReducers);


  useEffect(() => {
    dispatch(getAllProduct(rowsPerPage, page));
  }, [rowsPerPage, page]);


  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickIncrease = (index) => {
    dispatch(increaseQuantity(index))
  }
  const handleClickDecrease = (index) => {
    dispatch(decreaseQuantity(index))
  }

  return (
    <React.Fragment>
      <Grid container rowSpacing={1}>
        {/* Result Table  */}
        <Grid container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          mt={2}>
          {pending ?
            <Grid item fullWidth textAlign="center">
              <CircularProgress />
            </Grid>
            :
            <Card>
              <TableContainer>
                <Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'center' } }}>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD.map((title, index) => {
                        return (
                          <TableCell key={index}>{title}</TableCell>
                        )
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart ? cart.map((element, index) => {
                      return (
                        <>
                          <TableRow key={index}>
                            <TableCell>
                              <Grid container maxWidth={"100px"} direction="column" justifyContent="flex-start" alignItems="center" >
                                <img src={element.product.imageUrl} />
                              </Grid>
                            </TableCell>
                            <TableCell>{element.product.name}</TableCell>
                            <TableCell>{element.product.promotionPrice}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ border: "0.2px solid #EDEFF1" }}>
                                  <IconButton size="sm" variant="outlined" onClick={() => handleClickDecrease(index)} >
                                    <Remove />
                                  </IconButton>
                                </Box>
                                <Typography textColor="text.secondary">
                                  {element.quantity}
                                </Typography>
                                <Box sx={{ border: "0.2px solid #EDEFF1" }}>
                                  <IconButton size="sm" variant="outlined" onClick={() => handleClickIncrease(index)}>
                                    <Add />
                                  </IconButton>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              {element.quantity * element.product.promotionPrice}
                            </TableCell>
                          </TableRow>
                        </>)
                    }) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          }
        </Grid>
      </Grid>
      <Grid >
        <Typography level="display2" sx={{ mt: 2 }}>Total:</Typography>
      </Grid>
    </React.Fragment>

  );
}

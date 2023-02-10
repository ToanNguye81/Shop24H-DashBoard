import React, { useEffect } from "react";
import Scrollbar from "../../scrollbar/Scrollbar";

import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Card, TextField, Table, Stack, Button, Popover, TableRow, MenuItem, TableBody, TableCell, Container, Typography, IconButton, TableContainer, Grid, TableHead, CircularProgress, TablePagination, FormControlLabel } from '@mui/material';
// components
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../actions/product.actions";
import { CardTravel, Shop2 } from "@mui/icons-material";
import Paper from '@mui/material/Paper';


const TABLE_HEAD = [
  "Image",
  "Name",
  "Buy Price",
  "Promotion Price",
  "Add to cart",
] 
export const AddToCart = () => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, pending, totalProduct } = useSelector((reduxData) => reduxData.productReducers);

  useEffect(() => {
    dispatch(fetchProduct(rowsPerPage, page));
  }, [rowsPerPage, page]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Grid container rowSpacing={1}>

        {/* Search */}
        <Grid container fullWidth columnSpacing={1}>
          <Grid item xs={8} sm={8} md={8}>
            <TextField fullWidth size="small" label="Find Products by name" />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button variant="contained" sx={{ p: 1 }} fullWidth>Find</Button>
          </Grid>
        </Grid>

        {/* Result Table  */}
        <Grid container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch" 
          height={200} mt={2}>
          {pending ?
            <Grid item fullWidth textAlign="center">
              <CircularProgress />
            </Grid>
            :
            <TableContainer>
              <Table >
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
                  {products.map((element, index) => {
                    return (
                      <>
                        <TableRow key={element._id}>
                          <TableCell>
                            <Grid container maxWidth={"100px"} direction="column" justifyContent="flex-start" alignItems="center" >
                              <img src={element.imageUrl} />
                            </Grid>
                          </TableCell>
                          <TableCell>{element.name}</TableCell>
                          <TableCell>{element.buyPrice}</TableCell>
                          <TableCell>{element.promotionPrice}</TableCell>
                          <TableCell fixed align="right">
                            <Button size="small" variant="contained" ml={0}>
                              Add To Cart
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>)
                  })}
                </TableBody>
              </Table>
              <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalProduct}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
            </TableContainer>
          }
        
        </Grid>
        <Grid item >
        </Grid>
        <Grid item >
        </Grid>
      </Grid>
    </React.Fragment>

  );
}

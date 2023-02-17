import React, { useEffect } from "react";
import { useState } from 'react';
// @mui
import { TextField, Table, Button, TableRow, TableBody, TableCell, TableContainer, Grid, TableHead, CircularProgress, TablePagination, IconButton } from '@mui/material';
// components
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../actions/product.actions";
import { AddShoppingCartSharp } from "@mui/icons-material";
import { addToCart } from "../../../actions/order.actions";


const TABLE_HEAD = [
  "Image",
  "Name",
  "Buy Price",
  "Promotion Price",
  "Add to cart",
]

export const AddToCart = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [name, setName] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, pending, totalProduct } = useSelector((reduxData) => reduxData.productReducers);
  const { cart} = useSelector((reduxData) => reduxData.orderReducers);

 
  const condition = name.trim()? { name: name.trim() } : undefined;
  const handleClickFind = () => {
    dispatch(fetchProduct(5, 0, condition))
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handelChangeName = (event) => {
    setName(event.target.value)
  }

  const handleClickAdd=(product)=>{
      dispatch(addToCart(cart,product))
  }

  useEffect(() => {
    dispatch(fetchProduct(rowsPerPage, page));
  }, [rowsPerPage, page]);

  return (
    <React.Fragment>
      <Grid container rowSpacing={1} mt={1}>
        {/* Search */}
        <Grid container fullWidth columnSpacing={1}>
          <Grid item xs={8} sm={8} md={8}>
            <TextField fullWidth size="small" label="Find Products by name" onChange={handelChangeName} value={name} />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button variant="contained" sx={{ p: 1 }} fullWidth onClick={handleClickFind}>Find</Button>
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
                  <TableRow key="head">
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
                          <TableCell fixed align="center">
                            <IconButton variant="outline" ml={0} onClick={()=>handleClickAdd(element)}>
                              <AddShoppingCartSharp variant="outline"/>
                            </IconButton>
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
      </Grid>
    </React.Fragment>

  );
}

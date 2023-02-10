import React, { useEffect } from "react";
import { useState } from 'react';
// @mui
import { TextField, Table, Button, TableRow, TableBody, TableCell, TableContainer, Grid, TableHead, CircularProgress, TablePagination, Paper, IconButton, Typography, Box } from '@mui/material';
// components
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../actions/product.actions";
import { Add, Remove } from "@mui/icons-material";


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
  const [count, setCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, pending, totalProduct } = useSelector((reduxData) => reduxData.productReducers);

  useEffect(() => {
    dispatch(fetchProduct(rowsPerPage, page));
  }, [rowsPerPage, page]);


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
        {/* Result Table  */}
        <Grid container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          maxHeight={200} mt={2}>
          {pending ?
            <Grid item fullWidth textAlign="center">
              <CircularProgress />
            </Grid>
            :
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
                          <TableCell>{element.promotionPrice}</TableCell>
                          <TableCell>
                            <Box sx={{display: 'flex',alignItems: 'center',gap: 2}}>
                              <Box sx={{border: "0.2px solid #EDEFF1"}}>
                              <IconButton size="sm" variant="outlined" onClick={() => setCount((c) => c - 1)} >
                                <Remove />
                              </IconButton>
                              </Box>
                              <Typography textColor="text.secondary">
                                {count}
                              </Typography>
                              <Box sx={{border: "0.2px solid #EDEFF1"}}>
                              <IconButton size="sm" variant="outlined" onClick={() => setCount((c) => c + 1)}>
                                <Add />
                              </IconButton>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {count*element.promotionPrice}
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
      <Grid >
      <Typography level="display2">Total: $ {count}</Typography>
      </Grid>
    </React.Fragment>

  );
}

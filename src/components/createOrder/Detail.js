import React, { useEffect } from 'react';
import { useState } from 'react';
// @mui
import {
  TextField,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Grid,
  TableHead,
  CircularProgress,
  TablePagination,
  Paper,
  IconButton,
  Typography,
  Box,
  Card,
  TableFooter,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../actions/product.actions';
import { Add, Remove } from '@mui/icons-material';
import {
  decreaseQuantity,
  getOrderNote,
  increaseQuantity,
} from '../../actions/order.actions';

const TABLE_HEAD = [
  'Image',
  'Name',
  'Promotion Price',
  'Quantity',
  'Total ($)',
];
export const Detail = () => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const { pending, totalProduct } = useSelector((reduxData) => reduxData.productReducers);
  const { cart, note } = useSelector(
    (reduxData) => reduxData.orderReducers
  );
  const {
    products,
    pending,
    totalProduct,
    error,
    category,
    productPerPage,
    page,
    sortBy,
    sortOrder,
    gender,
    brand,
    minPrice,
    maxPrice,
  } = useSelector((reduxData) => reduxData.productReducers);

  // useEffect(() => {
  //   dispatch(getAllProduct(rowsPerPage, page));
  // }, [rowsPerPage, page]);
  useEffect(() => {
    dispatch(
      getAllProduct({
        productPerPage,
        page,
        sortBy,
        sortOrder,
        gender,
        brand,
        minPrice,
        maxPrice,
        category,
      })
    );
  }, [
    page,
    sortBy,
    sortOrder,
    gender,
    brand,
    minPrice,
    maxPrice,
    category,
  ]);

  const handleClickIncrease = (index) => {
    dispatch(increaseQuantity(index));
  };
  const handleClickDecrease = (index) => {
    dispatch(decreaseQuantity(index));
  };

  const handleChangeNote = (value) => {
    dispatch(getOrderNote(value));
  };

  return (
    <React.Fragment>
      <Grid container rowSpacing={1}>
        {/* Result Table  */}
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          mt={2}
        >
          {pending ? (
            <Grid item textAlign="center">
              <CircularProgress />
            </Grid>
          ) : (
            <Card>
              <TableContainer>
                <Table sx={{ textAlign: 'center' }}>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD.map((title, index) => {
                        return (
                          <TableCell key={index}>{title}</TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart
                      ? cart.map((element, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <Grid
                                  container
                                  maxWidth={'100px'}
                                  direction="column"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                >
                                  <img
                                    src={element.product.imageUrl}
                                  />
                                </Grid>
                              </TableCell>
                              <TableCell>
                                {element.product.name}
                              </TableCell>
                              <TableCell>
                                {element.product.promotionPrice}
                              </TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      border: '0.2px solid #EDEFF1',
                                    }}
                                  >
                                    <IconButton
                                      size="sm"
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickDecrease(index)
                                      }
                                    >
                                      <Remove />
                                    </IconButton>
                                  </Box>
                                  <Typography textcolor="text.secondary">
                                    {element.quantity}
                                  </Typography>
                                  <Box
                                    sx={{
                                      border: '0.2px solid #EDEFF1',
                                    }}
                                  >
                                    <IconButton
                                      size="sm"
                                      variant="outlined"
                                      onClick={() =>
                                        handleClickIncrease(index)
                                      }
                                    >
                                      <Add />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="left">
                                {element.quantity *
                                  element.product.promotionPrice}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Typography level="display2">
                          <strong>Total:</strong>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <TextField
                          size="small"
                          required
                          fullWidth
                          id="note"
                          label="Note"
                          name="note"
                          value={note}
                          onChange={(e) =>
                            handleChangeNote(e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Card>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

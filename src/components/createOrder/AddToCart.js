import React, { useEffect } from "react";
import { useState } from "react";
// @mui
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Grid,
  TableHead,
  CircularProgress,
  IconButton,
  Card,
  Stack,
  Pagination,
} from "@mui/material";
// components
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, setPage } from "../../actions/product.actions";
import { AddShoppingCartSharp } from "@mui/icons-material";
import { addToCart } from "../../actions/order.actions";
import ProductFilter from "../productPage/ProductFilter/ProductFilter";
import ProductSort from "../productPage/ProductFilter/ProductSort";

const TABLE_HEAD = [
  "Image",
  "Name",
  "Buy Price",
  "Promotion Price",
  "Add to cart",
];

export const AddToCart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((reduxData) => reduxData.orderReducers);
  const {
    products,
    pending,
    totalProduct,
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

  const totalPages = Math.ceil(totalProduct / productPerPage);

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
  }, [page, sortBy, sortOrder, gender, brand, minPrice, maxPrice, category]);

  const handleChangePage = (event, value) => {
    dispatch(setPage(value - 1));
  };

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleClickAddToCart = (product) => {
    dispatch(addToCart(cart, product));
  };

  useEffect(() => {
    dispatch(setPage(0));
  }, [gender, brand, minPrice, maxPrice, category]);

  return (
    <React.Fragment>
      <Grid container rowSpacing={1} mt={1}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item></Grid>
          <Grid item></Grid>
          <ProductFilter
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Grid>

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
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD.map((title, index) => {
                        return <TableCell key={index}>{title}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((element, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Grid
                              container
                              maxWidth={"100px"}
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <img src={element.imageUrl} />
                            </Grid>
                          </TableCell>
                          <TableCell>{element.name}</TableCell>
                          <TableCell>{element.buyPrice}</TableCell>
                          <TableCell>{element.promotionPrice}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="outline"
                              ml={0}
                              onClick={() => handleClickAddToCart(element)}
                            >
                              <AddShoppingCartSharp variant="outline" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 5, mb: 5 }}
                >
                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handleChangePage}
                    variant="outlined"
                    color="secondary"
                  />
                </Stack>
              </TableContainer>
            </Card>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

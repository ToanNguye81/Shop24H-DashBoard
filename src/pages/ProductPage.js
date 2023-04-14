import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllProduct } from "../actions/product.actions"
import { ProductTable } from "../components/productPage/ProductTable"
import { NewProduct } from "../components/productPage/NewProduct"
import { ErrorStack } from "../components/common/ErrorStack"
import ProductFilter from "../components/productPage/ProductFilter/ProductFilter"
import ProductSort from "../components/productPage/ProductFilter/ProductSort"

export const ProductPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const { products, pending, totalProduct, error } = useSelector((reduxData) => reduxData.productReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllProduct(rowsPerPage, page))
  }, [rowsPerPage, page, role]);

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Product </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All Products
          </Typography>
          <NewProduct />
        </Stack>
        <Stack direction="row" justifyContent="flex-end"
          alignItems="center" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilter
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
        {error ? (
          <ErrorStack message="You do not have permission to access this data" />
        ) : (
          <Card>
            <ProductTable
              products={products}
              pending={pending}
              totalProduct={totalProduct}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalProduct}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
}

import { Card, Pagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllProduct, setPage } from "../actions/product.actions"
import { ProductTable } from "../components/productPage/ProductTable"
import { NewProduct } from "../components/productPage/NewProduct"
import { ErrorStack } from "../components/common/ErrorStack"
import ProductFilter from "../components/productPage/ProductFilter/ProductFilter"
import ProductSort from "../components/productPage/ProductFilter/ProductSort"

export const ProductPage = () => {
  const { products, pending, totalProduct, error, category,
    productPerPage, page, sortBy, sortOrder, gender, brand, minPrice, maxPrice } = useSelector((reduxData) => reduxData.productReducers);

  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalProduct / productPerPage)

  useEffect(() => {
    dispatch(getAllProduct({ productPerPage, page, sortBy, sortOrder, gender, brand, minPrice, maxPrice, category }))
  }, [page, sortBy, sortOrder, gender, brand, minPrice, maxPrice, category]);


  const handleChangePage = (event, value) => {
    dispatch(setPage(value - 1));
  };

  useEffect(() => {
    dispatch(setPage(0))
  }, [gender, brand, minPrice, maxPrice, category])

  const [openFilter, setOpenFilter] = useState(false);

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
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 5, mb: 5 }}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handleChangePage}
                variant="outlined" color="secondary"
              />
            </Stack>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
}

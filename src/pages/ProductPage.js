import { Card, TablePagination, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { getAllProduct } from "../actions/product.actions"
import { ProductTable } from "../components/productPage/ProductTable"
import { ErrorStack } from "../components/productPage/ErrorStack"
import { NewProduct } from "../components/productPage/NewProduct"
import { useNavigate, useParams } from "react-router-dom"

export const ProductPage = () => {
  const { products, pending, totalProduct, error } = useSelector((reduxData) => reduxData.productReducers);
  const { role } = useSelector((reduxData) => reduxData.loginReducers);
  const { productId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!productId) { dispatch(getAllProduct(rowsPerPage, page)); }
  }, [rowsPerPage, page, role, productId]);


  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Product </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {productId ? null : 'All Products'}
          </Typography>
          <NewProduct />
        </Stack>
        {error ?
          <ErrorStack />
          :
          <Card>
            <ProductTable products={products} pending={pending} totalProduct={totalProduct} />
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
        }
      </Container>
    </React.Fragment>
  )
}

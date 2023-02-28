import { Button, Card, Grid, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getProductById } from "../actions/product.actions"
import { ErrorStack } from "../components/productDetailPage/ErrorStack"
import { ProductInfo } from "../components/productPage/ProductInfo"

export const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productById, error } = useSelector((reduxData) => reduxData.productReducers);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductById(productId))
  }, [productId]);

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard: Product Detail</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product Detail
          </Typography>
        </Stack>
        {error ?
          <ErrorStack description={error.stack} />
          :
          productById ? <ProductInfo productData={productById} /> : <ErrorStack description="Not found any products" />
        }
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button color="success" variant="contained" sx={{ mt: 3, mb: 2, }}>
              Create
            </Button>
          </Grid>
          <Grid item>
            <Button color="warning" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

import { LinearProgress, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getProductById } from "../actions/product.actions"
import { ErrorStack } from "../components/productDetailPage/ErrorStack"
import { EditProduct } from "../components/productPage/EditProduct"
import { NewProduct } from "../components/productPage/NewProduct"

export const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productById, error, getProductByIdPending } = useSelector((reduxData) => reduxData.productReducers);
  const { productId } = useParams();
  useEffect(() => {
    if(productId)
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
          <NewProduct />
        </Stack>
        {error ? <ErrorStack description={error.stack} /> :
          getProductByIdPending ?
            <LinearProgress /> 
            :
            <EditProduct initProduct={productById}/>
        }
      </Container>
    </React.Fragment>
  )
}

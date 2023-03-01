import { Button, LinearProgress, Typography } from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"

import { useNavigate, useParams } from "react-router-dom"
import { getProductById, updateProductById } from "../actions/product.actions"
import { ErrorStack } from "../components/productDetailPage/ErrorStack"
import { NewProduct } from "../components/productPage/NewProduct"
import { ProductInfo } from "../components/productPage/ProductInfo"

export const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({});
  const { productById, error, getProductByIdPending } = useSelector((reduxData) => reduxData.productReducers);
  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProductById(productId))
  }, [productId]);

  const handleUpdateData = (data) => {
    setUpdatedData(data)
  };

  const handleOnClickUpdate = () => {
    dispatch(updateProductById(productId, updatedData));
  };

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
            <LinearProgress /> :
            <React.Fragment>
              <ProductInfo productData={productById} onUpdateData={handleUpdateData} />
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1} mt={2}>
                <Button variant="contained" color="warning" onClick={handleOnClickUpdate} >Update</Button>
                <Button variant="contained" color="info" onClick={() => navigate(-1)}>Cancel</Button>
              </Stack>
            </React.Fragment>
        }
      </Container>
    </React.Fragment>
  )
}

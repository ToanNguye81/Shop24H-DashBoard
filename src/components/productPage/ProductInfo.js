import React, { useEffect } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from "../../actions/product.actions";
import { Card } from "@mui/material"

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     border: '0.1 solid pink',
//     width: "100%",
//     boxShadow: 24,
//     p: 4,
// };

export const ProductInfo = ({ productData }) => {
    const dispatch = useDispatch();
    const [name, setName] = React.useState(productData.name)
    const [brand, setBrand] = React.useState(productData.brand)
    const [description, setDescription] = React.useState(productData.description)
    const [type, setType] = React.useState(productData.type)
    const [imageUrl, setImageUrl] = React.useState(productData.imageUrl)
    const [buyPrice, setBuyPrice] = React.useState(productData.buyPrice)
    const [promotionPrice, setPromotionPrice] = React.useState(productData.promotionPrice)
    const [amount, setAmount] = React.useState(productData.amount)

    return (
        <React.Fragment>
            {/* <Box sx={style}> */}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Box component="form" noValidate >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="name"
                                label="name"
                                value={name}
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="brand"
                                label="brand"
                                value={brand}
                                name="brand"
                                onChange={(event) => setBrand(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="description"
                                label="description"
                                value={description}
                                name="description"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="type"
                                label="type"
                                value={type}
                                name="type"
                                onChange={(event) => setType(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="imageUrl"
                                label="imageUrl"
                                value={imageUrl}
                                name="imageUrl"
                                onChange={(event) => setImageUrl(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="buyPrice"
                                label="buyPrice"
                                value={buyPrice}
                                name="buyPrice"
                                onChange={(event) => setBuyPrice(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="promotionPrice"
                                label="promotionPrice"
                                value={promotionPrice}
                                name="promotionPrice"
                                onChange={(event) => setPromotionPrice(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                require fullWidth
                                id="amount"
                                label="amount"
                                value={amount}
                                name="amount"
                                onChange={(event) => setAmount(event.target.value)}
                            />
                        </Grid>
                    </Grid>
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
                </Box>
            </Box>
        </React.Fragment>
    )
}
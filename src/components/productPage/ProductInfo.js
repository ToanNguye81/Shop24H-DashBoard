import React, { useEffect } from "react"

import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';

export const ProductInfo = ({ productData }) => {
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
                </Box>
            </Box>
        </React.Fragment>
    )
}
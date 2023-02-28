import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Iconify from '../iconify/Iconify';
import { IconButton,Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../actions/product.actions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '0.1 solid pink',
    width: "60%",
    boxShadow: 24,
    p: 4,
};

export const DeleteProduct = ({ productId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        createNewProduct,
    } = useSelector((reduxData) => reduxData.productReducers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(createNewProduct(data));
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(productId))
    }

    return (
        <React.Fragment>
            <IconButton sx={{ color: 'error.main' }} onClick={handleOpen}>
                <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <HighlightOffIcon sx={{ fontSize: 80, color: "#FF4842" }} />
                        </Grid>
                        <Grid item sx={{ color: "#FF4842" }} align="center">
                            <h3>Are you sure want to delete this product?</h3>
                            <h3>Product's Id = {productId}</h3>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleDeleteProduct}>
                                        Delete
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleClose} variant="contained" color='warning'>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
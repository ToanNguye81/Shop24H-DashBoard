import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify/Iconify';
import { useEffect } from 'react';
import { FormControl, InputLabel, Select, Grid, Paper, MenuItem, Link, TextField, FormLabel, ButtonGroup, IconButton, Menu } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EditProduct = ({ productId }) => {
    const navigate=useNavigate()
    return (
        <React.Fragment>
            <IconButton sx={{ color: '#3f51b5' }} onClick={()=>navigate(`/dashboard/products/${productId}`)} >
                <Iconify icon={'eva:edit-fill'} />
            </IconButton>
        </React.Fragment>
    );
}
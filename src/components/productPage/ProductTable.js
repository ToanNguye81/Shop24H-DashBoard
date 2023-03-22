import {
  TableRow,
  TableBody,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableHead,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../scrollbar/Scrollbar";
import { DeleteProduct } from "./DeleteProduct";
import Iconify from '../iconify/Iconify';


const TABLE_HEAD = [
  "Action",
  "Image",
  "Brand",
  "Name",
  "Type",
  "Buy Price",
  "Promotion Price",
  "Amount",
  "Category",
  "Inventory",
]

export const ProductTable = ({ products, pending }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {pending ?
        <Grid item md={12} sm={12} lg={12} xs={12} textAlign="center">
          <CircularProgress />
        </Grid>
        :
        <>
          <Scrollbar>
            <Table  sx={{ minWidth: 200 }}>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD.map((title, index) => {
                    return (
                      <TableCell align="left" key={index}>
                        {title}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => {
                  return (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <IconButton sx={{ color: '#3f51b5' }} onClick={() => navigate(`/dashboard/products/${product._id}`)} >
                            <Iconify icon={'eva:edit-fill'} />
                          </IconButton>
                          <DeleteProduct productId={product._id} />
                        </TableCell>
                        <TableCell>
                          <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                            <img src={product.imageUrl} maxwidth="200px" />
                          </Grid>
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.type}</TableCell>
                        <TableCell>{product.buyPrice}</TableCell>
                        <TableCell>{product.promotionPrice}</TableCell>
                        <TableCell>{product.amount}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          {product.amount > 0 ?
                            <Button color={('success')}>Is In Inventory</Button> :
                            <Button color={('banned' && 'error')}>Not In Inventory</Button>}
                        </TableCell>
                      </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </>
      }
    </React.Fragment>
  );
};

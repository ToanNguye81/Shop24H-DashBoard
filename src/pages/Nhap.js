import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EditCustomer } from '../components/customerPage/EditCustomer';
import { DeleteCustomer } from '../components/customerPage/DeleteCustomer';

const TABLE_HEAD = [
    "Action",
    "Last Name",
    "First Name",
    "Country",
    "City",
    "Phone",
    "Email",
    "Address",
    "OrderCodes",
]

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                <EditCustomer paramCustomer={row} />
                <DeleteCustomer idValue={row._id} />
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Orders
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Code</TableCell>
                                        <TableCell>Order Date</TableCell>
                                        <TableCell align="right">Shipped Date</TableCell>
                                        <TableCell align="right">Note</TableCell>
                                        <TableCell align="right">Cost</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orders.map((order) => (
                                        <TableRow key={order.orderCode}>
                                            <TableCell component="th" scope="row">
                                                {order.orderCode}
                                            </TableCell>
                                            <TableCell>{order.orderDate}</TableCell>
                                            <TableCell align="right">{order.shippedDate}</TableCell>
                                            <TableCell align="right">{order.note}</TableCell>
                                            <TableCell align="right">{order.cost}</TableCell>
                                            <TableCell align="right">{order.status}</TableCell>
                                            <TableCell align="right">
                                                {/* {Math.round(order.amount * row.price * 100) / 100} */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const rows =[
    {
      _id: "63f37b632277e947427e50c3",
      lastName: "Toàn",
      firstName: "Nguyễn",
      phone: "0333447115",
      email: "ntqtoabn@vinamilk.com.vn",
      address: "43 Lê Trọng Tấn",
      city: "none",
      country: "AI",
      orders: [
        {
          _id: "63f37b642277e947427e50c6",
          orderDate: "2023-02-20T13:30:12.477Z",
          orderDetails: [
            {
              _id: "63f37b642277e947427e50ca",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-20T13:53:40.661Z",
              updatedAt: "2023-02-20T13:53:40.661Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "1eda03",
          createdAt: "2023-02-20T13:53:40.266Z",
          updatedAt: "2023-02-20T13:53:40.664Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-20T13:53:39.388Z",
      updatedAt: "2023-02-20T13:53:40.269Z",
      __v: 0
    },
    {
      _id: "63f351bf1a51d0c0f590fa7f",
      lastName: "dsj",
      firstName: "djsdksjq",
      phone: "0989898989",
      email: "jhds@gmail.com",
      address: "kjdsk",
      city: "Alejandro Roca",
      country: "AR",
      orders: [
        {
          _id: "63f351bf1a51d0c0f590fa82",
          orderDate: "2023-02-20T09:04:49.698Z",
          orderDetails: [
            {
              _id: "63f351c01a51d0c0f590fa86",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 3,
              createdAt: "2023-02-20T10:56:00.395Z",
              updatedAt: "2023-02-20T10:56:00.395Z",
              __v: 0
            },
            {
              _id: "63f351c01a51d0c0f590fa8a",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 4,
              createdAt: "2023-02-20T10:56:00.401Z",
              updatedAt: "2023-02-20T10:56:00.401Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "1a48f6",
          createdAt: "2023-02-20T10:55:59.671Z",
          updatedAt: "2023-02-20T10:56:00.406Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-20T10:55:59.201Z",
      updatedAt: "2023-02-20T10:55:59.673Z",
      __v: 0
    },
    {
      _id: "63f34d351a51d0c0f590fa01",
      lastName: "Quoc",
      firstName: "Nguyen",
      phone: "0333417111",
      email: "dhjahdsjadh@gmail.co",
      address: "43 Lê Trọng Tấn",
      city: "Baghlān",
      country: "AF",
      orders: [
        {
          _id: "63f34d361a51d0c0f590fa04",
          orderDate: "2023-02-20T09:04:49.698Z",
          orderDetails: [
            {
              _id: "63f34d361a51d0c0f590fa08",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-20T10:36:38.944Z",
              updatedAt: "2023-02-20T10:36:38.944Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "f74d70",
          createdAt: "2023-02-20T10:36:38.427Z",
          updatedAt: "2023-02-20T10:36:38.947Z",
          __v: 0
        },
        {
          _id: "63f34d3b1a51d0c0f590fa0e",
          orderDate: "2023-02-20T09:04:49.698Z",
          orderDetails: [
            {
              _id: "63f34d3c1a51d0c0f590fa12",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-20T10:36:44.181Z",
              updatedAt: "2023-02-20T10:36:44.181Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "c1e994",
          createdAt: "2023-02-20T10:36:43.722Z",
          updatedAt: "2023-02-20T10:36:44.185Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-20T10:36:37.938Z",
      updatedAt: "2023-02-20T10:36:43.725Z",
      __v: 0
    },
    {
      _id: "63f0fe011441b97b5a712692",
      lastName: "Toan",
      firstName: "Nguy",
      phone: "0334566366",
      email: "ty@gmial.com",
      address: "dgh",
      city: "Dasht-e Archī",
      country: "AF",
      orders: [
        {
          _id: "63f0fe1e1441b97b5a712699",
          orderDate: "2023-02-18T16:29:48.604Z",
          orderDetails: [
            {
              _id: "63f0fe1e1441b97b5a71269d",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T16:34:38.975Z",
              updatedAt: "2023-02-18T16:34:38.975Z",
              __v: 0
            },
            {
              _id: "63f0fe1e1441b97b5a7126a0",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-18T16:34:38.979Z",
              updatedAt: "2023-02-18T16:34:38.979Z",
              __v: 0
            },
            {
              _id: "63f0fe1e1441b97b5a7126a4",
              product: {
                _id: "63be417c8c8edee8b3409beb",
                name: "Nike Air Force 1",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-force-1",
                imageUrl: "https://sneakerdaily.vn/wp-content/uploads/2022/03/httpswww.nicekicks.comnike-air-force-1-low-athletic-club-dh7568-800-release-date-10.png",
                buyPrice: 900,
                promotionPrice: 100,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:56:28.438Z",
                updatedAt: "2023-01-11T04:56:28.438Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T16:34:38.985Z",
              updatedAt: "2023-02-18T16:34:38.985Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "4290c6",
          createdAt: "2023-02-18T16:34:38.855Z",
          updatedAt: "2023-02-18T16:34:38.992Z",
          __v: 0
        },
        {
          _id: "63f11243de12e06faff7d249",
          orderDate: "2023-02-18T18:00:17.698Z",
          shippedDate: "2022-12-21T17:00:00.000Z",
          note: "asdasda",
          orderDetails: [],
          cost: 8998,
          status: false,
          orderCode: "589594",
          createdAt: "2023-02-18T18:00:35.394Z",
          updatedAt: "2023-02-18T18:00:35.394Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-18T16:34:09.474Z",
      updatedAt: "2023-02-18T18:00:35.397Z",
      __v: 0
    },
    {
      _id: "63f03ef8294d39d7d29a1c03",
      lastName: "hsjdhsh",
      firstName: "hajsh",
      phone: "0987654329",
      email: "dsahfsadhty@gmail.com",
      address: "sds",
      city: "Andkhoy",
      country: "AF",
      orders: [
        {
          _id: "63f03f02294d39d7d29a1c08",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f02294d39d7d29a1c0c",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T02:59:14.237Z",
              updatedAt: "2023-02-18T02:59:14.237Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "328d05",
          createdAt: "2023-02-18T02:59:14.112Z",
          updatedAt: "2023-02-18T02:59:14.239Z",
          __v: 0
        },
        {
          _id: "63f03f4b294d39d7d29a1c12",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f4b294d39d7d29a1c16",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:00:27.733Z",
              updatedAt: "2023-02-18T03:00:27.733Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "453c80",
          createdAt: "2023-02-18T03:00:27.596Z",
          updatedAt: "2023-02-18T03:00:27.735Z",
          __v: 0
        },
        {
          _id: "63f03f4e294d39d7d29a1c1c",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f4e294d39d7d29a1c20",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:00:30.593Z",
              updatedAt: "2023-02-18T03:00:30.593Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "4fcf8b",
          createdAt: "2023-02-18T03:00:30.484Z",
          updatedAt: "2023-02-18T03:00:30.596Z",
          __v: 0
        },
        {
          _id: "63f03f54294d39d7d29a1c26",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f54294d39d7d29a1c2a",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:00:36.882Z",
              updatedAt: "2023-02-18T03:00:36.882Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "5297d2",
          createdAt: "2023-02-18T03:00:36.784Z",
          updatedAt: "2023-02-18T03:00:36.884Z",
          __v: 0
        },
        {
          _id: "63f03f66294d39d7d29a1c30",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f66294d39d7d29a1c34",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:00:54.321Z",
              updatedAt: "2023-02-18T03:00:54.321Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "9f2640",
          createdAt: "2023-02-18T03:00:54.015Z",
          updatedAt: "2023-02-18T03:00:54.324Z",
          __v: 0
        },
        {
          _id: "63f03f77294d39d7d29a1c3a",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03f77294d39d7d29a1c3e",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:01:11.664Z",
              updatedAt: "2023-02-18T03:01:11.664Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "282eef",
          createdAt: "2023-02-18T03:01:11.559Z",
          updatedAt: "2023-02-18T03:01:11.666Z",
          __v: 0
        },
        {
          _id: "63f03ff7294d39d7d29a1c54",
          orderDate: "2023-02-17T16:20:22.407Z",
          orderDetails: [
            {
              _id: "63f03ff8294d39d7d29a1c58",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-18T03:03:20.030Z",
              updatedAt: "2023-02-18T03:03:20.030Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "09c49c",
          createdAt: "2023-02-18T03:03:19.882Z",
          updatedAt: "2023-02-18T03:03:20.032Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-18T02:59:04.687Z",
      updatedAt: "2023-02-18T03:03:19.885Z",
      __v: 0
    },
    {
      _id: "63ef9f5effa5ac80382a67a1",
      lastName: "dsd",
      firstName: "dd",
      phone: "0909123477",
      email: "aassshjaa125@gmail.xom",
      address: "hytusse",
      city: "none",
      country: "AX",
      orders: [
        {
          _id: "63ef9f74ffa5ac80382a67ae",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63ef9f74ffa5ac80382a67b2",
              product: {
                _id: "63be41c98c8edee8b3409bf7",
                name: "Nike Air Max 90 LTR",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90-ltr",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg",
                buyPrice: 1100,
                promotionPrice: 100,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:45.389Z",
                updatedAt: "2023-01-11T04:57:45.389Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:38:28.393Z",
              updatedAt: "2023-02-17T15:38:28.393Z",
              __v: 0
            },
            {
              _id: "63ef9f74ffa5ac80382a67b6",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:38:28.398Z",
              updatedAt: "2023-02-17T15:38:28.398Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "738ad0",
          createdAt: "2023-02-17T15:38:28.255Z",
          updatedAt: "2023-02-17T15:38:28.401Z",
          __v: 0
        },
        {
          _id: "63ef9f90ffa5ac80382a67ca",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63ef9f90ffa5ac80382a67ce",
              product: {
                _id: "63be41c98c8edee8b3409bf7",
                name: "Nike Air Max 90 LTR",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90-ltr",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg",
                buyPrice: 1100,
                promotionPrice: 100,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:45.389Z",
                updatedAt: "2023-01-11T04:57:45.389Z",
                __v: 0
              },
              quantity: 5,
              createdAt: "2023-02-17T15:38:56.155Z",
              updatedAt: "2023-02-17T15:38:56.155Z",
              __v: 0
            },
            {
              _id: "63ef9f90ffa5ac80382a67d2",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 3,
              createdAt: "2023-02-17T15:38:56.160Z",
              updatedAt: "2023-02-17T15:38:56.160Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "e8bc00",
          createdAt: "2023-02-17T15:38:56.046Z",
          updatedAt: "2023-02-17T15:38:56.163Z",
          __v: 0
        },
        {
          _id: "63efa0e6ffa5ac80382a67fa",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63efa0e6ffa5ac80382a67fe",
              product: {
                _id: "63be41c98c8edee8b3409bf7",
                name: "Nike Air Max 90 LTR",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90-ltr",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg",
                buyPrice: 1100,
                promotionPrice: 100,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:45.389Z",
                updatedAt: "2023-01-11T04:57:45.389Z",
                __v: 0
              },
              quantity: 5,
              createdAt: "2023-02-17T15:44:38.378Z",
              updatedAt: "2023-02-17T15:44:38.378Z",
              __v: 0
            },
            {
              _id: "63efa0e6ffa5ac80382a6801",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 3,
              createdAt: "2023-02-17T15:44:38.381Z",
              updatedAt: "2023-02-17T15:44:38.381Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "5119f2",
          createdAt: "2023-02-17T15:44:38.210Z",
          updatedAt: "2023-02-17T15:44:38.384Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-17T15:38:06.254Z",
      updatedAt: "2023-02-17T15:44:38.213Z",
      __v: 0
    },
    {
      _id: "63ef9f49ffa5ac80382a6787",
      lastName: "dsd",
      firstName: "dd",
      phone: "0909123499",
      email: "aassssssdhjaa125@gmail.xom",
      address: "hytusse",
      city: "none",
      country: "AX",
      orders: [
        {
          _id: "63ef9f49ffa5ac80382a678a",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63ef9f49ffa5ac80382a678e",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-17T15:37:45.638Z",
              updatedAt: "2023-02-17T15:37:45.638Z",
              __v: 0
            },
            {
              _id: "63ef9f49ffa5ac80382a6792",
              product: {
                _id: "63be41918c8edee8b3409bee",
                name: "Nike Air Max 90",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg",
                buyPrice: 1000,
                promotionPrice: 750,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:56:49.602Z",
                updatedAt: "2023-01-11T04:56:49.602Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:37:45.645Z",
              updatedAt: "2023-02-17T15:37:45.645Z",
              __v: 0
            },
            {
              _id: "63ef9f49ffa5ac80382a6795",
              product: {
                _id: "63be442d8c8edee8b3409c06",
                name: "Beck",
                brand: "YEEZY",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "beck",
                imageUrl: "https:////cdn.shopify.com/s/files/1/2657/9524/products/e5f2911872eaf0c55af2c56dd891d90d_800x.jpg",
                buyPrice: 800,
                promotionPrice: 750,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 5,
                createdAt: "2023-01-11T05:07:57.560Z",
                updatedAt: "2023-01-11T05:07:57.560Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:37:45.650Z",
              updatedAt: "2023-02-17T15:37:45.650Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "914955",
          createdAt: "2023-02-17T15:37:45.462Z",
          updatedAt: "2023-02-17T15:37:45.656Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-17T15:37:45.312Z",
      updatedAt: "2023-02-17T15:37:45.465Z",
      __v: 0
    },
    {
      _id: "63ef9ecaffa5ac80382a674f",
      lastName: "dsd",
      firstName: "dd",
      phone: "0909123453",
      email: "ssssdhjaa125@gmail.xom",
      address: "hytusse",
      city: "none",
      country: "AX",
      orders: [
        {
          _id: "63ef9ecaffa5ac80382a6752",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63ef9ecaffa5ac80382a6756",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-17T15:35:38.773Z",
              updatedAt: "2023-02-17T15:35:38.773Z",
              __v: 0
            },
            {
              _id: "63ef9ecaffa5ac80382a675a",
              product: {
                _id: "63be41ba8c8edee8b3409bf4",
                name: "Club C Revenge Mens",
                brand: "Reebok",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "club-c-revenge-mens",
                imageUrl: "https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7599294868804d78a1b1ab6f01718a5e_9366/Club_C_Revenge_Men's_Shoes_White_FV9877_01_standard.jpg",
                buyPrice: 700,
                promotionPrice: 750,
                gender: "MEN",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:30.925Z",
                updatedAt: "2023-01-11T04:57:30.925Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:35:38.781Z",
              updatedAt: "2023-02-17T15:35:38.781Z",
              __v: 0
            },
            {
              _id: "63ef9ecaffa5ac80382a675d",
              product: {
                _id: "63be41918c8edee8b3409bee",
                name: "Nike Air Max 90",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg",
                buyPrice: 1000,
                promotionPrice: 750,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:56:49.602Z",
                updatedAt: "2023-01-11T04:56:49.602Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:35:38.785Z",
              updatedAt: "2023-02-17T15:35:38.785Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "d05ae4",
          createdAt: "2023-02-17T15:35:38.646Z",
          updatedAt: "2023-02-17T15:35:38.790Z",
          __v: 0
        },
        {
          _id: "63ef9ef3ffa5ac80382a676e",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [
            {
              _id: "63ef9ef3ffa5ac80382a6772",
              product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                brand: "Vans",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "sk80-low",
                imageUrl: "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                buyPrice: 600,
                promotionPrice: 50,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:57:16.414Z",
                updatedAt: "2023-01-11T04:57:16.414Z",
                __v: 0
              },
              quantity: 2,
              createdAt: "2023-02-17T15:36:19.216Z",
              updatedAt: "2023-02-17T15:36:19.216Z",
              __v: 0
            },
            {
              _id: "63ef9ef3ffa5ac80382a6775",
              product: {
                _id: "63be41918c8edee8b3409bee",
                name: "Nike Air Max 90",
                brand: "NIKE",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "nike-air-max-90",
                imageUrl: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg",
                buyPrice: 1000,
                promotionPrice: 750,
                gender: "KIDS",
                category: "LATEST",
                is_in_inventory: true,
                amount: 3,
                createdAt: "2023-01-11T04:56:49.602Z",
                updatedAt: "2023-01-11T04:56:49.602Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:36:19.220Z",
              updatedAt: "2023-02-17T15:36:19.220Z",
              __v: 0
            },
            {
              _id: "63ef9ef3ffa5ac80382a6779",
              product: {
                _id: "63be442d8c8edee8b3409c06",
                name: "Beck",
                brand: "YEEZY",
                description: "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                type: "beck",
                imageUrl: "https:////cdn.shopify.com/s/files/1/2657/9524/products/e5f2911872eaf0c55af2c56dd891d90d_800x.jpg",
                buyPrice: 800,
                promotionPrice: 750,
                gender: "MEN",
                category: "TRENDING",
                is_in_inventory: true,
                amount: 5,
                createdAt: "2023-01-11T05:07:57.560Z",
                updatedAt: "2023-01-11T05:07:57.560Z",
                __v: 0
              },
              quantity: 1,
              createdAt: "2023-02-17T15:36:19.226Z",
              updatedAt: "2023-02-17T15:36:19.226Z",
              __v: 0
            }
          ],
          cost: 0,
          status: false,
          orderCode: "b5c1a8",
          createdAt: "2023-02-17T15:36:19.089Z",
          updatedAt: "2023-02-17T15:36:19.229Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-17T15:35:38.491Z",
      updatedAt: "2023-02-17T15:36:19.091Z",
      __v: 0
    },
    {
      _id: "63ef9da4ffa5ac80382a6733",
      lastName: "dsd",
      firstName: "dd",
      phone: "0909123451",
      email: "ssssdhjaa124@gmail.xom",
      address: "hytusse",
      city: "none",
      country: "AX",
      orders: [
        {
          _id: "63ef9da4ffa5ac80382a6736",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [],
          cost: 0,
          status: false,
          orderCode: "ece57a",
          createdAt: "2023-02-17T15:30:44.838Z",
          updatedAt: "2023-02-17T15:30:44.838Z",
          __v: 0
        },
        {
          _id: "63ef9df3ffa5ac80382a6742",
          orderDate: "2023-02-17T15:14:58.500Z",
          orderDetails: [],
          cost: 0,
          status: false,
          orderCode: "5b9e7f",
          createdAt: "2023-02-17T15:32:03.719Z",
          updatedAt: "2023-02-17T15:32:03.719Z",
          __v: 0
        }
      ],
      createdAt: "2023-02-17T15:30:44.712Z",
      updatedAt: "2023-02-17T15:32:03.722Z",
      __v: 0
    },
    {
      _id: "63ef9d8effa5ac80382a672f",
      lastName: "dsd",
      firstName: "dd",
      phone: "0909123459",
      email: "ssdhjaa124@gmail.xom",
      address: "hytusse",
      city: "none",
      country: "AX",
      orders: [],
      createdAt: "2023-02-17T15:30:22.605Z",
      updatedAt: "2023-02-17T15:30:22.605Z",
      __v: 0
    }
  ]

export const Nhap = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {TABLE_HEAD.map((title, index) =>
                            <TableCell align="right">{title}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row._id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


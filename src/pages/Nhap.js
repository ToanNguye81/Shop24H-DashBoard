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

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        orderDetails: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

const TABLE_CHILD_HEAD = ["Date", "Customer", "Amount", "Total price ($)"]

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {TABLE_CHILD_HEAD.map((value, index) =>
                                            <TableCell>{value}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderDetails.map((orderDetailsRow) => (
                                        <TableRow key={orderDetailsRow.date}>
                                            <TableCell component="th" scope="row">
                                                {orderDetailsRow.date}
                                            </TableCell>
                                            <TableCell>{orderDetailsRow.customerId}</TableCell>
                                            <TableCell align="right">{orderDetailsRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(orderDetailsRow.amount * row.price * 100) / 100}
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

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        orderDetails: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
/* const rows=[ {
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
    _id: "63f07028d370d6aea5916603",
    orderDate: "2023-02-18T06:01:42.144Z",
    orderDetails: [
        {
            _id: "63f07028d370d6aea5916607",
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
            "quantity": 1,
            "createdAt": "2023-02-18T06:28:56.646Z",
            "updatedAt": "2023-02-18T06:28:56.646Z",
            "__v": 0
        },
        {
            _id: "63f07028d370d6aea591660a",
            product: {
                _id: "63be417c8c8edee8b3409beb",
                name: "Nike Air Force 1",
                "brand": "NIKE",
                "description": "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                "type": "nike-air-force-1",
                "imageUrl": "https://sneakerdaily.vn/wp-content/uploads/2022/03/httpswww.nicekicks.comnike-air-force-1-low-athletic-club-dh7568-800-release-date-10.png",
                "buyPrice": 900,
                "promotionPrice": 100,
                "gender": "KIDS",
                "category": "LATEST",
                "is_in_inventory": true,
                "amount": 3,
                "createdAt": "2023-01-11T04:56:28.438Z",
                "updatedAt": "2023-01-11T04:56:28.438Z",
                "__v": 0
            },
            "quantity": 1,
            "createdAt": "2023-02-18T06:28:56.671Z",
            "updatedAt": "2023-02-18T06:28:56.671Z",
            "__v": 0
        }
    ],
    "cost": 0,
    "status": false,
    "orderCode": "e602a4",
    "createdAt": "2023-02-18T06:28:56.517Z",
    "updatedAt": "2023-02-18T06:28:56.676Z",
    "__v": 0
},
{
    _id: "63f0700dd370d6aea59165f5",
    orderDate: "2023-02-18T06:01:42.144Z",
    orderDetails: [
        {
            _id: "63f0700dd370d6aea59165fd",
            product: {
                _id: "63be417c8c8edee8b3409beb",
                name: "Nike Air Force 1",
                "brand": "NIKE",
                "description": "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                "type": "nike-air-force-1",
                "imageUrl": "https://sneakerdaily.vn/wp-content/uploads/2022/03/httpswww.nicekicks.comnike-air-force-1-low-athletic-club-dh7568-800-release-date-10.png",
                "buyPrice": 900,
                "promotionPrice": 100,
                "gender": "KIDS",
                "category": "LATEST",
                "is_in_inventory": true,
                "amount": 3,
                "createdAt": "2023-01-11T04:56:28.438Z",
                "updatedAt": "2023-01-11T04:56:28.438Z",
                "__v": 0
            },
            "quantity": 1,
            "createdAt": "2023-02-18T06:28:29.926Z",
            "updatedAt": "2023-02-18T06:28:29.926Z",
            "__v": 0
        },
        {
            _id: "63f0700dd370d6aea59165f9",
            product: {
                _id: "63be41ac8c8edee8b3409bf1",
                name: "SK80-Low",
                "brand": "Vans",
                "description": "Giày Auth chất lượng cao. Sản xuất từ công nghệ đỉnh nhất xứ Catalan và Romani",
                "type": "sk80-low",
                "imageUrl": "https://images.vans.com/is/image/Vans/UUK24I-HERO?$583x583$",
                "buyPrice": 600,
                "promotionPrice": 50,
                "gender": "MEN",
                "category": "TRENDING",
                "is_in_inventory": true,
                "amount": 3,
                "createdAt": "2023-01-11T04:57:16.414Z",
                "updatedAt": "2023-01-11T04:57:16.414Z",
                "__v": 0
            },
            "quantity": 1,
            "createdAt": "2023-02-18T06:28:29.921Z",
            "updatedAt": "2023-02-18T06:28:29.921Z",
            "__v": 0
        }
    ],
    "cost": 0,
    "status": false,
    "orderCode": "3eb355",
    "createdAt": "2023-02-18T06:28:29.740Z",
    "updatedAt": "2023-02-18T06:28:29.923Z",
    "__v": 0
}] */


const TABLE_TITLE = [
    "",
    "Dessert (100g serving)",
    "Calories (g)",
    "Fat (g)",
    "Carbs (g)",
    "Protein (g)",
]

export const Nhap= ()=> {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {TABLE_TITLE.map((value, index) =>
                            <TableCell>{value}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}   
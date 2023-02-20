// import { Navigate, useRoutes } from 'react-router-dom';
// // layouts
// import SimpleLayout from './layouts/simple';
// //
// import BlogPage from './pages/BlogPage';
// import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
// import DashboardAppPage from './pages/DashboardAppPage';
// import { DashboardLayout } from './layouts/dashboard/DashboardLayout';
// import { CustomerPage } from './pages/CustomerPage';
// import DemoPage from './pages/DemoPage';
// import { ProductPage } from './pages/ProductPage';
// import { OrderPage } from './pages/OrderPage';
// import { OrderDetailPage } from './pages/OrderDetailPage';
// import { NewCustomer } from './components/customerPage/NewCustomer';
// import { GoogleMaps } from './components/orderPage/NewOrder/GoogleMaps';
// import { CreateOrder } from './pages/CreateOrder';
// import { Nhap } from './pages/Nhap';
// import { useSelector } from 'react-redux';

// // ----------------------------------------------------------------------

// export default function Router() {
//   const {isAuthenticated} =useSelector((reduxData)=>reduxData.loginReducers)

//   const routes = useRoutes([
   
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//      {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: 'app', element: <DemoPage /> },
//         { path: 'createOrder', element: <CreateOrder /> },
//         // { path: 'general', element: <Nhap /> },
//         { path: 'orders', element: <OrderPage /> },
//         { path: 'orderDetails', element: <OrderDetailPage  /> },
//         { path: 'customers', element: <CustomerPage /> },
//         { path: 'products', element: <ProductPage/> },
//         { path: 'demo', element: <DemoPage /> },
//         { path: 'demo2', element: <ProductsPage /> },
//         { path: 'product-type', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       element: <SimpleLayout />,
//       children: [
//         { element: <Navigate to="/login" />, index: true },
//         { path: '404', element: <Page404 /> },
//         { path: '*', element: <Navigate to="/404" /> },
//       ],
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }

import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// layouts
import SimpleLayout from './layouts/simple';
import { DashboardLayout } from './layouts/dashboard/DashboardLayout';

// pages
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { CustomerPage } from './pages/CustomerPage';
import DemoPage from './pages/DemoPage';
import { ProductPage } from './pages/ProductPage';
import { OrderPage } from './pages/OrderPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { CreateOrder } from './pages/CreateOrder';
import { Nhap } from './pages/Nhap';

export default function Router() {
  const { isAuthenticated } = useSelector((reduxData) => reduxData.loginReducers);

  const authRoutes = {
    path: '/dashboard',
    element: isAuthenticated ? <DashboardLayout /> :  <LoginPage />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      { path: 'app', element: <DemoPage /> },
      { path: 'createOrder', element: <CreateOrder /> },
      { path: 'orders', element: <OrderPage /> },
      { path: 'orderDetails', element: <OrderDetailPage /> },
      { path: 'customers', element: <CustomerPage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'demo', element: <DemoPage /> },
      { path: 'demo2', element: <ProductsPage /> },
      { path: 'product-type', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  };

  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    authRoutes,
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import SimpleLayout from './layouts/simple';
import { DashboardLayout } from './layouts/dashboard/DashboardLayout';
// pages
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
import { ProductDetailPage } from './pages/ProductDetailPage';
import { EditOrderPage } from './pages/EditOrderPage';

export default function Router() {
  const { isAuthenticated } = useSelector((reduxData) => reduxData.loginReducers);
  const authRoutes = {
    path: '/dashboard/',
    element: isAuthenticated ? <DashboardLayout /> :  <LoginPage />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      { path: 'app', element: <DemoPage/> },
      { path: 'createOrder', element: <CreateOrder/> },
     
      { path: 'customers', element: <CustomerPage/> },
      
      { path: 'orders', element: <OrderPage/> },
      { path: 'orders/:orderId', element: <EditOrderPage/> },
      { path: 'customers/:customerId/orders', element: <OrderPage/> },

      { path: 'orderDetails', element: <OrderDetailPage /> },
      { path: 'orders/:orderId/orderDetails', element: <OrderDetailPage/> },

      { path: 'products', element: <ProductPage/> },
      { path: 'products/:productId', element: <ProductDetailPage/> },
      
      { path: 'demo', element: <DemoPage/> },
      { path: 'demo2', element: <ProductsPage/> },
      { path: 'product-type', element: <ProductsPage/> },
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
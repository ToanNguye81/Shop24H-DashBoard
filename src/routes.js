import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { DashboardLayout } from './layouts/dashboard/DashboardLayout';
import { CustomerPage } from './pages/CustomerPage';
import DemoPage from './pages/DemoPage';
import { ProductPage } from './pages/ProductPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DemoPage /> },
        { path: 'customers', element: <CustomerPage /> },
        { path: 'products', element: <ProductPage /> },
        { path: 'demo', element: <DemoPage /> },
        { path: 'demo2', element: <ProductsPage /> },
        { path: 'orders', element: <ProductsPage /> },
        { path: 'product-type', element: <ProductsPage /> },
        { path: 'order-detail', element: <ProductsPage  /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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

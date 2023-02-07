// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_order'),
  },
  {
    title: 'order detail',
    path: '/dashboard/orderDetails',
    icon: icon('ic_orderDetail'),
  },
  {
    title: 'customers',
    path: '/dashboard/customers',
    icon: icon('ic_customer'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'product type',
    path: '/dashboard/product-type',
    icon: icon('ic_productType'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

import {
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';
import AdminLogin from '../features/admin/auth/AdminLogin';
import Users from '../features/admin/user';

const routeList: RouteObject[] = [
  {
    path: "admin/login",
    element: <AdminLogin />
  },
  {
    path: "admin/users",
    element: <Users />
  }
];

const Router = createBrowserRouter(routeList);
export default Router;
import {
  RouteObject,
  createBrowserRouter,
  Navigate
} from 'react-router-dom';
import AdminLogin from '../features/admin/auth/AdminLogin';
import Users from '../features/admin/user';
import WrapperRouteComponent from 'routes/WrapperRoute';
import Layout from 'common/components/Layout';
import { Suspense } from 'react';
import AdminNotFound from 'common/components/AdminNotFound';
import Blogs from 'features/admin/blog/index';
import CreateNewBlog from 'features/admin/blog/create';

const routeList: RouteObject[] = [
  {
    path: "admin/login",
    element: <AdminLogin />
  },
  {
    path: 'admin/',
    element: (
      <WrapperRouteComponent auth={true}>
        <Layout />
      </WrapperRouteComponent>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="users" />,
      },
      {
        path: "users",
        element: (
          <WrapperRouteComponent>
            <Users />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "blogs",
        element: (
          <WrapperRouteComponent>
            <Blogs />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "blogs/create",
        element: (
          <WrapperRouteComponent>
            <CreateNewBlog />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense>
            <WrapperRouteComponent>
              <AdminNotFound />
            </WrapperRouteComponent>
          </Suspense>
        ),
      },

    ]
  }
];

const Router = createBrowserRouter(routeList);
export default Router;
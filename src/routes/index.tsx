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
import UpdateBlog from 'features/admin/blog/update';
import Scores from 'features/admin/score';
import Template from 'features/admin/template';
import CreateNewTemplate from 'features/admin/template/create';
import UpdateTemplate from 'features/admin/template/update';
import ClientHome from "features/client/home";
import Exam from 'features/admin/exam';
import CreateNewExam from 'features/admin/exam/create';
import UpdateExam from 'features/admin/exam/update';
import ClientLogin from 'features/client/login';
import ClientRegister from 'features/client/register';
import UserNotFound from 'features/client/notFound/UserNotFound';
import UserLayout from 'common/usercomponents/Layout/Layout';
import ExamIndexPage from 'features/client/exam';
import ExamDetailPage from 'features/client/exam/detail';
import ExamStartPage from 'features/client/exam/start';
import HistoryDetailPage from 'features/client/exam/history';
import ExamHistoryDetailPage from 'features/client/exam/historyDetail';
import ExamPracticePage from 'features/client/exam/practice';
import ExamSolutionPage from 'features/client/exam/solution';
import BlogIndexPage from 'features/client/blog';
import UserIndexPage from 'features/client/user';
import BlogDetailPage from 'features/client/blog/detail';
import About from 'features/client/about/about';
import Contact from 'features/client/contact/contact';
import Privacy from 'features/client/privacy/privacy';
import Terms from 'features/client/terms/terms';
import BuyingTerms from 'features/client/buying-terms/buyingTerms';

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <UserLayout/>,
    children: [
      {
        // path: "/",
        index: true,
        element: <ClientHome />,
      },
      {
        path: "login",
        element: <ClientLogin />,
      },
      {
        path: "register",
        element: <ClientRegister />,
      },
      {
        path: "exams",
        element: <ExamIndexPage />,
      },
      {
        path: "exams/:id/start",
        element: <ExamStartPage />,
      },
      {
        path: "exams/:id/practice",
        element: <ExamPracticePage />,
      },
      {
        path: "exams/:exam_id/solution/",
        element: <ExamSolutionPage />,
      },
      {
        path: "exams/:exam_id/part/:part/solution",
        element: <ExamSolutionPage />,
      },
      {
        path: "exams/:exam_id/history/:history_id/detail",
        element: <ExamHistoryDetailPage />,
      },
      {
        path: "exams/:exam_id/history/:history_id",
        element: <HistoryDetailPage />,
      },
      {
        path: "exams/:id",
        element: <ExamDetailPage />,
      },
      {
        path: "blogs",
        element: <BlogIndexPage />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "my_account",
        element: <UserIndexPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "buying-terms",
        element: <BuyingTerms />,
      },
      {
        path: "notFound",
        element: (
          <Suspense>
            <UserNotFound />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense>
            <UserNotFound />
          </Suspense>
        ),
      },
    ]
  },
  {
    path: "admin/login",
    element: <AdminLogin />,
  },
  {
    path: "admin/",
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
        path: "exams",
        element: (
          <WrapperRouteComponent>
            <Exam />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "exams/create/:id",
        element: (
          <WrapperRouteComponent>
            <CreateNewExam />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "exams/update/:id",
        element: (
          <WrapperRouteComponent>
            <UpdateExam />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "templates",
        element: (
          <WrapperRouteComponent>
            <Template />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "templates/create",
        element: (
          <WrapperRouteComponent>
            <CreateNewTemplate />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "templates/update/:id",
        element: (
          <WrapperRouteComponent>
            <UpdateTemplate />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "scores",
        element: (
          <WrapperRouteComponent>
            <Scores />
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
        path: "blogs/update/:id",
        element: (
          <WrapperRouteComponent>
            <UpdateBlog />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense>
            <WrapperRouteComponent>
              <AdminNotFound />
            </WrapperRouteComponent>
          </Suspense>
        ),
      },
    ],
  },
];

const Router = createBrowserRouter(routeList);
export default Router;

import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  DashboardPage,
  UserDashboardPage,
  LoginPage,
  MiddlewarePage,
} from '../views/pages';
import { PATHS, ROUTES } from '../global';
import { AppLayout, AuthLayout, UserLayout } from '../views/layouts';

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={ROUTES.LOGIN} />
  },
  {
    path: PATHS.ROOT,
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.AUTH,
        children: [
          {
            path: PATHS.ROOT,
            element: <MiddlewarePage />,
          },
          {
            path: PATHS.LOGIN,
            element: <LoginPage />,
          },
        ]
      },
    ]
  },
  {
    path: PATHS.ADMIN, 
    element: <AppLayout />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: <DashboardPage />,
      },
    ]
  },
  {
    path: PATHS.ROOT, 
    element: <UserLayout />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: <UserDashboardPage />,
      },
    ]
  },
]);

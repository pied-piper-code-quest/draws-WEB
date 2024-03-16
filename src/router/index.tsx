import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  LoginPage,
  MiddlewarePage,
} from '../views/pages';
import { PATHS, ROUTES } from '../global';
import { AppLayout, AuthLayout } from '../views/layouts';

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
    path: PATHS.ROOT,
    element: <AppLayout />,
    children: [

    ]
  },
]);
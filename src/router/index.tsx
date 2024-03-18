import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AdminsPage,
  CompetitorsPage,
  DashboardPage,
  AdminDrawsPage,
  UserDashboardPage,
  LoginPage,
  MiddlewarePage,
  DrawPage,
} from "../views/pages";
import { PATHS, ROUTES } from "../global";
import { AppLayout, AuthLayout, UserLayout } from "../views/layouts";

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={ROUTES.LOGIN} />,
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
        ],
      },
    ],
  },
  {
    path: PATHS.ADMIN,
    element: <AppLayout />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: PATHS.DRAWS,
        element: <AdminDrawsPage />,
      },
      {
        path: PATHS.COMPETITORS,
        element: <CompetitorsPage />,
      },
      {
        path: PATHS.ADMINS,
        element: <AdminsPage />,
      },
    ],
  },
  {
    path: PATHS.ROOT,
    element: <UserLayout />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: <UserDashboardPage />,
      },
      {
        path: PATHS.DRAW_ID,
        element: <DrawPage />,
      },
    ],
  },
]);

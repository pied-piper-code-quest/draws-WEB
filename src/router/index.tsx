import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  MiddlewarePage,
  // RootPage,
  TestPage
} from '../views/pages';
import { PATHS } from '../global';

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.TEST} />,
  },
  {
    path: PATHS.TEST,
    element: <TestPage />,
  },
  {
    path: PATHS.AUTH,
    element: <MiddlewarePage />,
  },
  {
    path: PATHS.DASHBOARD,
    element: <>Dashboard</>,
  },
]);
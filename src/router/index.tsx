import { createBrowserRouter } from 'react-router-dom';
import { RootPage, TestPage } from '../views/pages';
import { PATHS } from '../global';

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <RootPage />,
  },
  {
    path: PATHS.TEST,
    element: <TestPage />,
  },
]);
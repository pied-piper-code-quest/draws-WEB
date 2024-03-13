import { createBrowserRouter } from 'react-router-dom';
import { RootPage } from '../views/pages';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
]);
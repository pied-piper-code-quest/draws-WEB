import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { ROUTES } from '../global';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuthStore.getState();
  const location = useLocation();

  if (user === null || undefined) {
    return <Navigate to={`${ROUTES.LOGIN}`} state={{ from: location }} replace />;
  }

  return children;
};
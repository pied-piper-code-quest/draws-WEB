import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuthStore.getState();
  const location = useLocation();

  if (user === null || undefined) {
    return <Navigate to={`/auth/login`} state={{ from: location }} replace />;
  }

  return children;
};
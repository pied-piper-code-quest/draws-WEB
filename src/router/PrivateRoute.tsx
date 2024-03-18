import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores";
import { ROUTES } from "../global";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { authData } = useAuthStore.getState();
  const location = useLocation();

  if (!authData) {
    return (
      <Navigate to={`${ROUTES.LOGIN}`} state={{ from: location }} replace />
    );
  }

  return children;
};

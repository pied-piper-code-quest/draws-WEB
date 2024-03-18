import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { ROUTES } from "../../global";
import { AuthService } from "../../services/auth.service";

const PrivateRoutesLayout: FC = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const authData = useAuthStore(state => state.authData);
  const refreshAuthData = useAuthStore(state => state.refreshAuthData);

  const verifySessionStatus = async () => {
    try {
      if (!authData) {
        throw new Error("Missing AuthData");
      }
      const data = await AuthService.checkAuthStatus();
      refreshAuthData(data);
      setIsAuthorized(true);
    } catch (error) {
      refreshAuthData(null);
      navigate(ROUTES.LOGIN);
    }
  };
  useEffect(() => {
    verifySessionStatus();
  }, [authData]);

  if (!isAuthorized) return null;
  return <Outlet />;
};

export default PrivateRoutesLayout;

import { FC, useCallback, useEffect, useRef } from "react";
import { useAuthStore } from "../../../stores";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";
import { Loading } from "react-daisyui";
import { ROUTES } from "../../../global";

const MiddlewarePage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFetching = useRef(false);

  const authData = useAuthStore(state => state.authData);
  const setAuthData = useAuthStore(state => state.setAuthData);

  const getUserToken = useCallback(async (code: string) => {
    const { token, user } = await AuthService.checkDiscordAuthStatus(code);
    if (!token || !user) {
      throw new Error("Unable to authenticate");
    }
    setAuthData({ user, userType: "discord" }, token);
    navigate(`${ROUTES.USER_DASHBOARD}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authData) {
      navigate(`${ROUTES.USER_DASHBOARD}`, { replace: true });
      return;
    }
    const authCode = searchParams.get("code");
    try {
      if (!authCode) throw new Error("Code not provided");

      if (isFetching.current) return;
      isFetching.current = true;

      getUserToken(authCode);
    } catch (error) {
      console.log(error);
      navigate(`${ROUTES.LOGIN}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserToken, authData]);

  return (
    <div className="mx-auto flex h-screen flex-row justify-center items-center">
      <p className="text-center text-2xl text-white font-semibold">
        Redirigiendo...
      </p>
      <Loading size="lg" variant="bars" />
    </div>
  );
};

export default MiddlewarePage;

import { FC, useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from '../../../stores';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../../../services/auth.service';
import { Loading } from 'react-daisyui';
import { ROUTES } from '../../../global';

const MiddlewarePage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFetching = useRef(false);
  const setUserData = useAuthStore((state) => state.setUserData);

  const getUserToken = useCallback(async (code: string) => {
    try {
      const { token, user } = await AuthService.checkDiscordAthStatus(code);
      if (!token || !user) {
        throw new Error('Unable to authenticate');
      }
      setUserData(token, user);
      navigate(`/${ROUTES.USER_DASHBOARD}`, { replace: true });
    }
    catch (error) {
      console.log(error);
      navigate(`${ROUTES.LOGIN}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    const authCode = searchParams.get('code');
    getUserToken(authCode || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserToken]);

  return (
    <div className="mx-auto flex h-screen flex-row justify-center items-center">
      <p className="text-center text-2xl text-white font-semibold">Redirigiendo...</p>
      <Loading size="lg" variant="bars" />
    </div>
  );
};

export default MiddlewarePage;
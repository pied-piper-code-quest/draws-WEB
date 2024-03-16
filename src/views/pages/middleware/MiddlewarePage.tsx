import { FC, useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from '../../../stores';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../../../services/auth.service';

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
      navigate('/dashboard', { replace: true });
    }
    catch (error) {
      console.log(error);
      navigate('/test', { replace: true });
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
    <></>
  );
};

export default MiddlewarePage;
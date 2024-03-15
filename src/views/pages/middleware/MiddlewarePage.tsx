import { FC, useCallback, useEffect } from 'react';
import { useAuthStore } from '../../../stores';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MiddlewarePage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkDiscordAuthStatus = useAuthStore((state) => state.checkDiscordAuthStatus);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const getUserToken = useCallback(async (code: string) => {
    try {
      await checkDiscordAuthStatus(code);
      if (!token && !user) {
        throw new Error('Unable to authenticate');
      }
      navigate('/dashboard', { replace: true });
    }
    catch (error) {
      console.log(error);
      navigate('/test', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const authCode = searchParams.get('code');
    getUserToken(authCode || '');
  }, [getUserToken, searchParams]);

  return (
    <></>
  );
};

export default MiddlewarePage;
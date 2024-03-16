import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-center items-center bg-login">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

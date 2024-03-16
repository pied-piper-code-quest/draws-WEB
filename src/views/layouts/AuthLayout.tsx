import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-center items-center bg-[#26184A]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
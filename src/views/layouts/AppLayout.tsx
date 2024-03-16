import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './components/SideNav';

const AppLayout: FC = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="flex">
      <SideNav />
      <div className="p-2">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default AppLayout;
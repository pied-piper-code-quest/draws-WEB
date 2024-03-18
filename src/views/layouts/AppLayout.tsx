import { FC } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import { PrivateRoute } from "../../router/PrivateRoute";

const AppLayout: FC = () => {
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex">
        <SideNav />
        <div className="p-6 px-10 w-full">
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

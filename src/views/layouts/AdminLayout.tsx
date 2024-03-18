import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "./components/SideNav";
import { PrivateRoute } from "../../router/PrivateRoute";
import { useAuthStore } from "../../stores";
import { ROUTES } from "../../global";

const AdminLayout: FC = () => {
  const navigate = useNavigate();
  const authData = useAuthStore(state => state.authData)!;
  if (authData.userType !== "admin") {
    navigate(ROUTES.USER_DASHBOARD);
  }
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex">
        <SideNav />
        <div className="p-4 md:p-6 md:px-10 w-full">
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

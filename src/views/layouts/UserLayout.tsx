import { Outlet, useNavigate } from "react-router-dom";
import DiscordUsersNav from "./components/DiscordUsersNav";
import { useAuthStore } from "../../stores";
import { ROUTES } from "../../global";

const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const authData = useAuthStore(state => state.authData)!;
  if (authData.userType !== "discord") {
    navigate(ROUTES.ADMIN_DASHBOARD);
  }
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex">
        <DiscordUsersNav />
        <div className="p-4 md:p-6 md:px-10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

import { Outlet } from "react-router-dom";
import DiscordUsersNav from "./components/DiscordUsersNav";

const UserLayout: React.FC = () => {
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex">
        <DiscordUsersNav />
        <div className="p-6 px-10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

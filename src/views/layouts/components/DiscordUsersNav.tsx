import { FC } from "react";
import { Avatar, Divider, Dropdown, Tooltip } from "react-daisyui";
import DevTallesLogo from "../../assets/ISO_MONO1.png";
import { useAuthStore } from "../../../stores";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../global";
import { UserDiscord } from "../../../interfaces/users.interface";

const DiscordUsersNav: FC = () => {
  const navigate = useNavigate();
  const logoutUser = useAuthStore(state => state.logoutUser);
  const authData = useAuthStore(state => state.authData)!;
  console.log(authData);

  const handleLogout = () => {
    logoutUser();
    navigate(`${ROUTES.LOGIN}`);
  };

  return (
    <aside className="flex">
      <div className="flex flex-col items-center justify-between w-16 h-screen py-8 space-y-8 bg-devtalles-600">
        <div className="flex flex-col items-center space-y-4">
          <a href="#">
            <img className="w-auto h-10" src={DevTallesLogo} alt="" />
          </a>
          <Divider color="primary" />

          <Tooltip position="right" message="Inicio">
            <Link
              to={ROUTES.USER_DASHBOARD}
              className="p-1.5 text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg  "
            >
              <i className="bx bx-home-alt bx-sm"></i>
            </Link>
          </Tooltip>
        </div>

        <Dropdown vertical="top" horizontal="right">
          <Dropdown.Toggle button={false}>
            {(authData.user as UserDiscord).discordId &&
            (authData.user as UserDiscord).avatar ? (
              <Avatar
                className="cursor-pointer"
                shape="circle"
                src={`https://cdn.discordapp.com/avatars/${(authData.user as UserDiscord).discordId}/${(authData.user as UserDiscord).avatar}.webp?size=160`}
                online
                size="xs"
              />
            ) : (
              <Avatar
                className="cursor-pointer"
                shape="circle"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                online
                size="xs"
              />
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52">
            <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </aside>
  );
};

export default DiscordUsersNav;

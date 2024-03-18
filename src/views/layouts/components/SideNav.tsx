import { FC } from "react";
import { Avatar, Divider, Dropdown, Tooltip } from "react-daisyui";
import DevTallesLogo from "../../assets/ISO_MONO1.png";
import { useAuthStore } from "../../../stores";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../global";

const SideNav: FC = () => {
  const navigate = useNavigate();
  const logoutUser = useAuthStore(state => state.logoutUser);

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

          <Tooltip position="right" message="Tablero">
            <NavLink
              to={ROUTES.ADMIN_DASHBOARD}
              className="p-1.5 flex justify-center items-center text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg  "
            >
              <i className="bx bxs-dashboard bx-sm" />
            </NavLink>
          </Tooltip>

          <Tooltip position="right" message="Sorteos">
            <NavLink
              to={ROUTES.DRAWS}
              className="p-1.5 flex justify-center items-center text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg "
            >
              <i className="bx bx-customize bx-sm"></i>
            </NavLink>
          </Tooltip>

          <Tooltip position="right" message="Participantes">
            <NavLink
              to={ROUTES.COMPETITORS}
              className="p-1.5 flex justify-center items-center text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg "
            >
              <i className="bx bx-group bx-sm"></i>
            </NavLink>
          </Tooltip>

          <Tooltip position="right" message="Administradores">
            <NavLink
              to={ROUTES.ADMINS}
              className="p-1.5 flex justify-center items-center text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg"
            >
              <i className="bx bx-user-check bx-sm"></i>
            </NavLink>
          </Tooltip>
        </div>

        <Dropdown vertical="top" horizontal="right">
          <Dropdown.Toggle button={false}>
            <Avatar
              className="cursor-pointer"
              shape="circle"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              online
              size="xs"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52">
            <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </aside>
  );
};

export default SideNav;

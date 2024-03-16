import { FC } from 'react';
import { Avatar, Divider, Dropdown, Tooltip } from 'react-daisyui';
import DevTallesLogo from '../../assets/ISO_MONO1.png'
import { useAuthStore } from '../../../stores';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../global';

const SideNav: FC = () => {
  const navigate = useNavigate();
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleLogout = () => {
    logoutUser();
    navigate(`${ROUTES.LOGIN}`);
  }

  return (
    <aside className="flex">
      <div className="flex flex-col items-center justify-between w-16 h-screen py-8 space-y-8 bg-[#1D1238] dark:border-gray-700">

        <div className="flex flex-col items-center space-y-4">
          <a href="#">
            <img className="w-auto h-10" src={DevTallesLogo} alt="" />
          </a>
          <Divider />

          <Tooltip position="right" message="Inicio">
            <button type="button" className="p-1.5 text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg  ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
          </Tooltip>

          <Tooltip position="right" message="Inicio">
            <button type="button" className="p-1.5 text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </button>
          </Tooltip>

          <Tooltip position="right" message="Inicio">
            <button type="button" className="p-1.5 text-[#A6A1FF] hover:bg-[#ffffff]/[.15] focus:active:bg-[#ffffff]/[.15] focus:outline-nones transition-colors duration-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </button>
          </Tooltip>
        </div>

        <Dropdown vertical="top" horizontal="right">
          <Dropdown.Toggle button={false}>
            <Avatar className="cursor-pointer" shape="circle" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" online size="xs" />
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
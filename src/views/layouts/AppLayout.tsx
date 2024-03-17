import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Dropdown } from 'react-daisyui';
import SideNav from './components/SideNav';

const AppLayout: FC = () => {
  return (
    <div className="h-screen w-full bg-gray-200">
      <div className="flex">
      <SideNav />
      <div className="p-6 px-10 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold text-3xl text-devtalles-600">Dashboard Page</h2>
          </div>
          <div className="flex items-center justify-end">
            <Button
              color="primary"
              startIcon={
                <i className='bx bx-plus bx-sm'></i>
              }
            >
              CREAR
            </Button>
            <Dropdown end>
              <Dropdown.Toggle button={false}>
                <Button
                  variant="link"
                  color="primary"
                  className="border-0 no-underline hover:no-underline"
                >
                  <i className='bx bx-dots-vertical-rounded bx-lg'></i>
                </Button>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-52">
                <Dropdown.Item onClick={() => {}}>Filtrar</Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>Buscar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default AppLayout;

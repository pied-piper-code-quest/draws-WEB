import { FC } from 'react';
import { Card } from 'react-daisyui';
import EmptyLogo from '../../assets/death.png';

const isEmpty: boolean = false;

const DashboardPage: FC = () => {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center mt-72">
        <h3 className="text-gray-400 font-semibold text-3xl">Aún no tienes sorteos programados</h3>
        <img className="w-40 h-auto mt-6 opacity-35" src={EmptyLogo} alt="" />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      <div>
        <Card className="shadow-md bg-white">
          <Card.Body>
            <Card.Title tag="h3" className="text-devtalles-600 mb-2">Sorteo Membresías</Card.Title>
            <p className="text-3xl mb-0.5">200 Participantes</p>
            <span className="text-devtalles-300">Próximo</span>
          </Card.Body>
          <Card.Actions className="justify-end p-4 px-8">
            <p className="text-gray-300">Creado 2 de Dic 2024</p>
          </Card.Actions>
        </Card>
      </div>
      <div>
        <Card className="shadow-md bg-white">
          <Card.Body>
            <Card.Title tag="h3" className="text-devtalles-600 mb-2">Sorteo Membresías</Card.Title>
            <p className="text-3xl mb-0.5">120 Participantes</p>
            <span className="text-success">Activo</span>
          </Card.Body>
          <Card.Actions className="justify-end p-4 px-8">
            <p className="text-gray-300">Creado 2 de Dic 2024</p>
          </Card.Actions>
        </Card>
      </div>
      <div>
        <Card className="shadow-md bg-white">
          <Card.Body>
            <Card.Title tag="h3" className="text-devtalles-600 mb-2">Sorteo Membresías</Card.Title>
            <p className="text-3xl mb-0.5">200 Participantes</p>
            <span className="text-error">Finalizado</span>
          </Card.Body>
          <Card.Actions className="justify-end p-4 px-8">
            <p className="text-gray-300">Creado 2 de Dic 2024</p>
          </Card.Actions>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

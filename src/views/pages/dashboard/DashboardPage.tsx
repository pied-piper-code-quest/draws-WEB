import { FC } from 'react';
import EmptyLogo from '../../assets/death.png';
import DashboardCard from './components/DashboardCard';

const isEmpty: boolean = false;

const cards = [
  {
    id: 1,
    title: 'Sorteo Membresías',
    label: 'Participantes',
    value: 200,
    date: 'Creado 2 de Dic 2024',
    status: 'coming-soon',
  },
  {
    id: 2,
    title: 'Sorteo Membresías',
    label: 'Participantes',
    value: 150,
    date: 'Creado 2 de Dic 2024',
    status: 'active',
  },
  {
    id: 3,
    title: 'Sorteo Membresías',
    label: 'Participantes',
    value: 300,
    date: 'Creado 2 de Dic 2024',
    status: 'done',
  },
]

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
    <>
      <div className="flex items-start justify-between mb-5">
        <h2 className="font-bold text-3xl text-devtalles-600">Tablero</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-20">
        {cards.map(({ id, label, value, status, date, title }) => (
          <DashboardCard
            key={id}
            id={id}
            label={label}
            title={title}
            value={value}
            date={date}
            status={status}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardPage;

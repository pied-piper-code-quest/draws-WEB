import { FC } from 'react';
import { Card } from 'react-daisyui';

interface DashboardCardProps {
  id: number | string
  title: string;
  label: string;
  value: number;
  date: string;
  status: string;
}

const statusTextColor: { [x: string]: string } = {
  'coming-soon': 'text-devtalles-300',
  'active': 'text-success',
  'done': 'text-error'
}

const statusLabel: { [x: string]: string } = {
  'coming-soon': 'Próximo',
  'active': 'Activo',
  'done': 'Finalizado'
}

const DashboardCard: FC<DashboardCardProps> = ({ id, title, label, value, date, status }) => {

  console.log(id);
  

  return (
    <Card className="shadow-md bg-white">
      <Card.Body>
        <Card.Title tag="h3" className="text-devtalles-600 mb-2">{title}</Card.Title>
        <p className="text-3xl mb-0.5">{value} {label}</p>
        <span className={statusTextColor[status]}>{statusLabel[status]}</span>
      </Card.Body>
      <Card.Actions className="justify-end p-4 px-8">
        <p className="text-gray-300">{date}</p>
      </Card.Actions>
    </Card>
  );
};

export default DashboardCard;
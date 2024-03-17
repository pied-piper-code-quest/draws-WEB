import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Badge, Button, Modal } from 'react-daisyui';
import { DataTable } from '../../common';
import { ColumnType } from '../../common/DataTable';
import { useDrawsStore } from '../../../stores';
import { DrawsService } from '../../../services/draws.service';
import { Draw } from '../../../interfaces/draws.interface';
import DrawForm from './components/DrawForm';

const statusColor: { [x: string]: string } = {
  'pending': 'warning',
  'progress': 'info',
  'done': 'success',
  'cancel': 'error',
}
const statusLabel: { [x: string]: string } = {
  'pending': 'Pendiente',
  'progress': 'En Progreso',
  'done': 'Completado',
  'cancel': 'Cancelado'
}

const DrawsPage: FC = () => {
  const [limit,] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allDraws = useDrawsStore((state) => state.allDraws);
  const setAllDraws = useDrawsStore((state) => state.setAllDraws);
  const [currentStep, setCurrentStep] = useState<number>(1);

  

  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  }


  const getDraws = useCallback(async () => {
    try {
      const draws = await DrawsService.getAllDraws(limit, currentPage);
      setCurrentPage(draws.currentPage);
      setAllDraws(draws.data);

    }
    catch (err) {
      setAllDraws([]);
      console.log(err);
      throw new Error('Something went wrong')
    }
  }, [limit, currentPage, setAllDraws])

  useEffect(() => {
    getDraws();
  }, [getDraws])

  const handleCurrentStep = () => {
    setCurrentStep(currentStep + 1);
  }


  const columns: ColumnType<any>[] = [
    {
      key: 'id',
      name: 'ID'
    },
    {
      key: 'title',
      name: 'Título'
    },
    {
      key: 'description',
      name: 'Descripción'
    },
    {
      key: 'status',
      name: 'Estado',
      cell: (row: Draw) => (
        <Badge color={statusColor[row.status] as 'info' | 'warning' | 'success' | 'error'}>
          {statusLabel[row.status]}
        </Badge>
      )
    },
    {
      key: 'numberOfWinners',
      name: 'Cantidad de Ganadores'
    },
    {
      key: 'actions',
      name: 'Acciones',
      cell: (row: Draw) => (
        <>
          <Button>
            Editar
          </Button>
          <Button>
            Eliminar
          </Button>
        </>
      )
    },
  ];


  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <h2 className="font-bold text-3xl text-devtalles-600">Sorteos</h2>
        <div className="flex items-center">
          <Button
            color="primary"
            startIcon={
              <i className='bx bx-plus bx-sm'></i>
            }
            onClick={handleShow}
          >
            CREAR
          </Button>
        </div>
      </div>
      <Modal ref={ref} className={`${currentStep > 1 ? 'w-12/12 max-w-5xl' : ''}`}>
        <form method="dialog">
          <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2">
            x
          </Button>
        </form>
        <Modal.Header className="font-bold">Crear Sorteo</Modal.Header>
        <Modal.Body>
          <DrawForm currentStep={currentStep} handleCurrentStep={handleCurrentStep} />
        </Modal.Body>
      </Modal>


      <div className="w-full">
        <DataTable
          columns={columns}
          data={allDraws}
          pagination
          currentPage={currentPage}
          pageSize={limit}
          onChangePage={handleCurrentPage}
        />
      </div>
    </>
  );
};

export default DrawsPage;
import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-daisyui";
import { Alerts } from "../../../global";
import { DrawsService } from "../../../services/draws.service";
import { DateFormatter } from "./DateFormatter";
import { DrawData } from "../../../interfaces";

interface Props {
  data: DrawData;
}
export function DrawModalBody({ data }: Props) {
  const { participants, subscribed } = useMemo(() => {
    if (data.participants.length === 1) {
      return {
        participants: "Participante",
        subscribed: "inscrito",
      };
    }
    return {
      participants: "Participantes",
      subscribed: "inscritos",
    };
  }, [data.participants]);
  const subscribeToDraw = useCallback(async () => {
    const result = await Swal.fire({
      icon: "question",
      title: `¿Desea inscribirse al sorteo "${data.title}"?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Inscribirme",
    });
    if (result.isConfirmed) {
      Alerts.Loading();
      try {
        await DrawsService.subscribeToDraw(data.id);
        Alerts.Success();
      } catch (error: any) {
        Alerts.Error(error?.message || "Error Desconocido");
      }
    }
  }, []);
  return (
    <>
      <Modal.Header className="font-bold">{data.title}</Modal.Header>
      <Modal.Body>
        <p>{data.description}</p>
        <p className="text-lg font-semibold">Premios:</p>
        <ul className="list-disc ps-5 mb-4">
          {data.prizes.map((prize, index) => (
            <li key={index + prize}>{prize}</li>
          ))}
        </ul>

        <p>
          {data.participants.length} {participants} {subscribed}
        </p>
        {data.maxParticipants && (
          <span className="text-devtalles-600">
            Máximo de participantes: {data.maxParticipants}
          </span>
        )}
        {data.maxDateToJoin && (
          <span className="text-devtalles-600">
            Inscríbete antes del <DateFormatter date={data.maxDateToJoin} />
            !!
          </span>
        )}
        <Modal.Actions className="flex p-4 px-8">
          <form method="dialog">
            <button className="devtalles-button" onClick={subscribeToDraw}>
              Inscribirse
            </button>
          </form>
        </Modal.Actions>
      </Modal.Body>
    </>
  );
}

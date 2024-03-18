import { Card } from "react-daisyui";
import { DrawData, DrawStatus } from "../../../interfaces";
import { DateFormatter } from ".";
import { Link } from "react-router-dom";

interface Props extends DrawData {
  userId: string;
  handleOnClick: (id: string, title: string) => void;
}
export function DrawCard({ handleOnClick, ...props }: Props) {
  return (
    <article className="flex">
      <Card className="shadow-md bg-white w-full">
        <Card.Body>
          <Card.Title tag="h3" className="text-devtalles-600 mb-2">
            {props.title}
          </Card.Title>
          <p className="text-3xl mb-0.5">
            {props.participants.length} Participante
            {props.participants.length !== 1 && "s"}
          </p>
          {props.maxParticipants && (
            <span className="text-devtalles-600">
              Máximo de participantes: {props.maxParticipants}
            </span>
          )}
          <DrawStatus status={props.status} />
        </Card.Body>
        <Card.Actions className="flex justify-between items-center p-4 px-8">
          <p className="text-gray-300 py-4">
            Creado <DateFormatter date={props.createdAt} />
          </p>
          {(props.participants as string[]).includes(props.userId) ? (
            <Link to={`/draw/${props.id}`} className="flex devtalles-button">
              Abrir
            </Link>
          ) : (
            props.available && (
              <button
                type="button"
                className="devtalles-button"
                onClick={() => handleOnClick(props.id, props.title)}
              >
                Inscribirse
              </button>
            )
          )}
        </Card.Actions>
      </Card>
    </article>
  );
}

interface DrawStatusProps {
  status: DrawStatus;
}
function DrawStatus({ status }: DrawStatusProps) {
  if (status === "pending") {
    return <span className="text-yellow-500">Próximo</span>;
  }
  if (status === "live") {
    return <span className="text-green-500">En vivo</span>;
  }
  if (status === "finished") {
    return <span className="text-devtalles-300">Finalizado</span>;
  }
  if (status === "canceled") {
    return <span className="text-red-500">Cancelado</span>;
  }
}

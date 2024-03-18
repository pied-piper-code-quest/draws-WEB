interface MessageProps {
  id: string;
  username: string;
  message: string;
}
interface Props {
  chatRef: React.RefObject<HTMLUListElement>;
  messages: MessageProps[];
  userId: string;
  textMessage: string;
  handleSubmitMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function DrawLiveChat({
  chatRef,
  messages,
  userId,
  textMessage,
  handleSubmitMessage,
  handleOnChange,
}: Props) {
  return (
    <section className="mt-4 flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Chat en vivo</h2>
      <ul
        ref={chatRef}
        className="border-2 border-devtalles-400 bg-white rounded-xl h-96 overflow-y-auto flex flex-col gap-4 p-4"
      >
        {messages.map((message, index) => {
          if (message.id === userId) {
            return <MessageSent key={index} {...message} />;
          }
          return <MessageReceived key={index} {...message} />;
        })}
      </ul>
      <form className="flex gap-2" onSubmit={handleSubmitMessage}>
        <input
          type="text"
          name="textMessage"
          value={textMessage}
          onChange={handleOnChange}
          className="w-full rounded-xl px-4 py-1 border-devtalles-300 border-2"
        />
        <button className="devtalles-button" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}

function MessageReceived({ username, message }: MessageProps) {
  return (
    <li className="flex flex-col bg-devtalles-100/50 p-2 rounded w-10/12">
      <small className="text-base font-bold">{username}</small>
      <p>{message}</p>
    </li>
  );
}
function MessageSent({ username, message }: MessageProps) {
  return (
    <li className="flex flex-col bg-devtalles-400 text-white p-2 rounded self-end w-10/12">
      <small className="text-base font-bold">{username}</small>
      <p>{message}</p>
    </li>
  );
}

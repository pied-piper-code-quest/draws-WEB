import { DrawData } from "../../../interfaces";
import DevtallesAstronaut from "../../assets/yay.png";
import DeathCharacter from "../../assets/death.png";
import { UserDiscord } from "../../../interfaces/users.interface";
import { Loading } from "react-daisyui";

export function WaitingDraw(drawData: DrawData) {
  return (
    <div className="bg-devtalles-600 w-full min-h-60 rounded-xl p-8 text-white flex flex-col lg:flex-row gap-8 justify-center items-center">
      <div className="w-full flex flex-wrap justify-center items-center gap-8">
        <img
          className="w-auto h-auto lg:h-60"
          src={DevtallesAstronaut}
          alt=""
        />
        <p className="text-2xl sm:text-3xl lg:text-4xl text-center">
          Esperando que comience el sorteo...
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Premios:</h2>
        <ol className="list-decimal ps-5 mb-4 font-semibold text-xl">
          {drawData.prizes.map((prize, index) => (
            <li key={index + prize}>{prize}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export function WaitingWinners({
  incomingResult,
  ...drawData
}: DrawData & { incomingResult: number }) {
  return (
    <div className="bg-devtalles-600 w-full min-h-60 rounded-xl p-8 text-white flex flex-col lg:flex-row gap-8 justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <h2 className="text-3xl font-semibold">Ganadores:</h2>
        <ul className="flex flex-wrap justify-center items-center gap-16">
          {drawData.prizes.map((_, index) => {
            if (drawData.winners[index]) {
              const winner = drawData.winners[index] as UserDiscord;
              return (
                <li key={index}>
                  <div className="rounded-xl bg-devtalles-500 ske text-white text-2xl size-64 flex flex-col items-center justify-center">
                    {winner.username && winner.avatar && (
                      <img
                        src={`https://cdn.discordapp.com/avatars/${winner.discordId}/${winner.avatar}.webp?size=160`}
                        alt={winner.username}
                        className="rounded-xl w-8/12 mb-0"
                      />
                    )}
                    {winner.username}
                  </div>
                </li>
              );
            }
            if (incomingResult === index + 1) {
              return (
                <li key={index}>
                  <div className="rounded-xl bg-gray-500 text-white text-[70px] sm:text-[100px] lg:text-[120px] size-44 lg:size-64 grid place-items-center">
                    <Loading size="lg" variant="bars" />
                  </div>
                </li>
              );
            }
            return (
              <li key={index}>
                <div className="rounded-xl bg-gray-500 text-white text-[70px] sm:text-[100px] lg:text-[120px] size-44 lg:size-64 grid place-items-center">
                  ?
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Premios:</h2>
        <ol className="list-decimal ps-5 mb-4 font-semibold text-xl">
          {drawData.prizes.map((prize, index) => (
            <li key={index + prize}>{prize}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export function DrawResults(drawData: DrawData) {
  return (
    <div className="bg-devtalles-600 w-full min-h-60 rounded-xl p-8 text-white flex flex-col lg:flex-row gap-8 justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <h2 className="text-3xl font-semibold">Ganadores:</h2>
        <ul className="flex flex-wrap justify-center items-center gap-16">
          {drawData.winners.map((winner, index) => {
            const winnerData = winner as UserDiscord;
            return (
              <li key={index}>
                <div className="rounded-xl bg-devtalles-500 ske text-white text-2xl size-42 lg:size-64 flex flex-col items-center justify-center">
                  {winnerData.username && winnerData.avatar && (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${winnerData.discordId}/${winnerData.avatar}.webp?size=160`}
                      alt={winnerData.username}
                      className="rounded-xl w-8/12 mb-0"
                    />
                  )}
                  {winnerData.username}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Premios:</h2>
        <ol className="list-decimal ps-5 mb-4 font-semibold text-xl">
          {drawData.prizes.map((prize, index) => (
            <li key={index + prize}>{prize}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export function CanceledDraw() {
  return (
    <div className="bg-devtalles-600 w-full min-h-60 rounded-xl p-8 text-white flex gap-8 justify-center items-center">
      <div className="w-full flex flex-wrap justify-center items-center gap-8">
        <img
          className="w-auto h-auto md:h-60"
          src={DeathCharacter}
          alt="Draw Canceled"
        />
        <p className="text-2xl md:text-5xl text-center ">
          El sorteo fue Cancelado
        </p>
      </div>
    </div>
  );
}

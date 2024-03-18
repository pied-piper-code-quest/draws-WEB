import { FC, useEffect } from "react";
import { useGetDraws } from "../../../hooks";
import { CardSkeleton, DrawCard } from "../components";

import EmptyLogo from "../../assets/death.png";
import { connectToWebsocket } from "../../../apis/websockets";
import { useAuthStore } from "../../../stores";
import { WEBSOCKETS_MESSAGES } from "../../../global/constants";

const UserDashboardPage: FC = () => {
  const authData = useAuthStore(state => state.authData)!;
  const { draws, isLoading, getDraws, subscribeToDraw } = useGetDraws();
  useEffect(() => {
    const socket = connectToWebsocket(authData.token || "");
    socket.on(WEBSOCKETS_MESSAGES.REFRESH_DRAWS_LIST, () => {
      getDraws();
    });
    return () => {
      socket.off(WEBSOCKETS_MESSAGES.REFRESH_DRAWS_LIST);
    };
  }, []);

  if (!isLoading && draws.length === 0) {
    return (
      <div className="flex flex-col items-center mt-72">
        <h3 className="text-gray-400 font-semibold text-3xl">
          Aún no hay sorteos programados
        </h3>
        <img
          className="w-40 h-auto mt-6 opacity-35"
          src={EmptyLogo}
          alt="No hay sorteos"
        />
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <CardSkeleton key={index} />)
        : draws.map(draw => (
            <DrawCard
              key={draw.id}
              {...draw}
              userId={authData.user.id!}
              handleOnClick={subscribeToDraw}
            />
          ))}
    </div>
  );
};

export default UserDashboardPage;

import { FC } from "react";
import { useGetDraws } from "../../../hooks";
import { CardSkeleton, DrawCard } from "../components";

import EmptyLogo from "../../assets/death.png";

const UserDashboardPage: FC = () => {
  const { draws, isLoading, getDraws: _getDraws } = useGetDraws();
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
  // TODO: Draw info Modal (Option to subscribe and option to open)
  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <CardSkeleton key={index} />)
        : draws.map((draw) => <DrawCard key={draw.id} {...draw} />)}
    </div>
  );
};

export default UserDashboardPage;

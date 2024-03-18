import { FC, useCallback, useEffect, useState } from "react";
import { CompetitorsService } from "../../../../services/competitors.service";
import { useCompetitorsStore } from "../../../../stores";
import { Table } from "react-daisyui";

const CompetitorList: FC = () => {
  const [limit] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allCompetitors = useCompetitorsStore(state => state.allCompetitors);
  const selectedCompetitors = useCompetitorsStore(
    state => state.selectedCompetitors,
  );
  const setSelectedCompetitors = useCompetitorsStore(
    state => state.setSelectedCompetitors,
  );
  const setAllCompetitors = useCompetitorsStore(
    state => state.setAllCompetitors,
  );

  const handleSelectedCompetitors = (id: string) => {
    const newSelectoion = selectedCompetitors.includes(id)
      ? selectedCompetitors.filter(fila => fila !== id)
      : [...selectedCompetitors, id];

    setSelectedCompetitors(newSelectoion);
  };

  const getCompetitors = useCallback(async () => {
    try {
      const competitors = await CompetitorsService.getAllCompetitors(
        limit,
        currentPage,
      );
      setCurrentPage(competitors.currentPage);
      setAllCompetitors(competitors.data);
    } catch (err) {
      setAllCompetitors([]);
      console.log(err);
      throw new Error("Something went wrong");
    }
  }, [limit, currentPage, setAllCompetitors]);

  useEffect(() => {
    getCompetitors();
  }, [getCompetitors]);

  return (
    <div>
      <Table>
        <Table.Head>
          <span className="text-secondary">ID</span>
          <span className="text-secondary">Nombre de Usuario</span>
        </Table.Head>

        <Table.Body>
          {allCompetitors.map(({ username, id }) => (
            <Table.Row
              key={id}
              onClick={() => handleSelectedCompetitors(id)}
              className={`cursor-pointer ${selectedCompetitors.includes(id) ? "bg-[#6131D1] text-white" : ""}`}
            >
              <p>{id}</p>
              <span>{username}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <p className="text-[#6131D1] ">Total: {selectedCompetitors.length}</p>
    </div>
  );
};

export default CompetitorList;

import { FC, useState } from "react";
import { Button, Pagination, Table } from "react-daisyui";

export interface ColumnType<T> {
  name: string;
  key: string;
  cell?: (row: T) => JSX.Element;
}

interface DataTableProps<T> {
  columns: ColumnType<T>[];
  data: T[];
  pagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  onChangePage?: (page: number) => void;
}

const DataTable: FC<DataTableProps<any>> = ({
  data,
  columns,
  pagination,
  currentPage,
  pageSize,
  onChangePage,
}) => {
  const [pageCount, setPageCount] = useState<number>(1);

  if (pageSize && currentPage) {
    const pageTotal = Math.ceil(data.length / pageSize);
    if (pageTotal > 1) {
      setPageCount(pageTotal);
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table zebra>
        <Table.Head>
          {columns.map((column: ColumnType<any>) => (
            <span key={column.key}>{column.name}</span>
          ))}
        </Table.Head>

        <Table.Body>
          {data.map((item, index: number) => (
            <Table.Row key={index}>
              {columns.map(column => {
                const renderContent = column.cell
                  ? column.cell(item)
                  : item[column.key];
                return <span key={column.key}>{renderContent}</span>;
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {pagination && (
        <div className="flex justify-end">
          <Pagination>
            {Array.from(Array(pageCount).keys()).map((page: number) => (
              <Button
                className="join-item"
                key={`page-${page}`}
                onClick={() => onChangePage && onChangePage(page + 1)}
              >
                {page + 1}
              </Button>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DataTable;

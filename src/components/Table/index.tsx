import React, { ReactNode } from "react";

export interface TableColumn {
  title: string;
  key: string;
}

export interface TableRow {
  [key: string]: ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-max w-full border-collapse border border-primary-500">
        <thead className="bg-primary-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-2 border border-primary-600 text-left"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-blueGray-200 transition-all"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="p-2 border border-primary-600 text-center "
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

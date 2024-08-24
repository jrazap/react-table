/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useRowSelect, useTable } from "react-table";
import { COLUMNS } from "./columns";
import DATA from "../data/users.json";
import "../styles/table.css";
import { Checkbox } from "./Checkbox";

const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`hg-${headerGroup.id}`}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>

        <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => ({
                  id: row.id,
                  values: row.values,
                })),
              },
              null,
              2
            )}
          </code>
        </pre>
      </table>
    </>
  );
};

export default RowSelection;

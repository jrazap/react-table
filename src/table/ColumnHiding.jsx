import { useMemo } from "react";
import { useTable } from "react-table";
import DATA from "../data/users.json";

import "../styles/table.css";
import { Checkbox } from "./components/Checkbox";
import { COLUMNS } from "./columns";

const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable({
    columns: columns,
    data: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const { allColumns, getToggleHideAllColumnsProps } = tableInstance;

  return (
    <>
      <div className="d-flex align-items-center gap-3">
        <div className="toggle-all my-4">
          <Checkbox {...getToggleHideAllColumnsProps()} label="Toggle All" />
        </div>

        {allColumns.map((column) => (
          <div key={column.id}>
            <input
              type="checkbox"
              className="form-check-inline form-check-input shadow-none"
              {...column.getToggleHiddenProps()}
              id={column.id}
            />
            <label htmlFor={column.id} className="form-label">
              {column.Header}
            </label>
          </div>
        ))}
      </div>

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
          {rows.map((row) => {
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
      </table>
    </>
  );
};

export default ColumnHiding;

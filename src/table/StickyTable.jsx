import { useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS } from "./columns";
import DATA from "../data/users.json";
import "../styles/table.css";
import { Styles } from "./TableStyles";

const StickyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useBlockLayout,
    useSticky
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const firstPageRows = rows.slice(0, 20);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 1000, height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              key={`hg-${headerGroup.id}`}
              className="tr"
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="th"
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} key={row.id} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} key={cell.id} className="td">
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
};

export default StickyTable;

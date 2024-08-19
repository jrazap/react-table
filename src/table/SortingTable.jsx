import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { COLUMNS } from "./columns";
import DATA from "../data/users.json";
import "../styles/table.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div className="">
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon icon="tabler:sort-z-a" />
                      ) : (
                        <Icon icon="tabler:sort-a-z" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default SortingTable;

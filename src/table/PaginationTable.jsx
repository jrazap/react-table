import { useMemo } from "react";
import { usePagination, useTable } from "react-table";
import { COLUMNS } from "./columns";
import DATA from "../data/users.json";
import "../styles/table.css";

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      {/* Pagination Option -- Select Page Size */}
      <select
        name="pageSize"
        id="pageSize"
        className="form-select form-control shadow-none bg-dark text-white my-3"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 25, 50].map((page) => (
          <option value={page} key={`size-${page}`}>
            {page}
          </option>
        ))}
      </select>

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
          {page.map((row) => {
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

      {/* Pagination Option -- Buttons */}
      <div className="d-flex gap-3 my-3 justify-content-center align-items-center">
        <button
          className="btn btn-dark"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-dark"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <span>
          Page <strong>{pageIndex + 1}</strong> of{" "}
          <strong>{pageOptions.length}</strong>
        </span>
        <button
          className="btn btn-dark"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className="btn btn-dark"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>

      {/* Pagination Option -- Go To Page */}
      <div className="d-flex gap-3 my-3 justify-content-center align-items-center">
        <strong>Go To Page:</strong>
        <input
          type="number"
          className="form-control shadow-none text-center text-white"
          value={pageIndex + 1}
          onChange={(e) => {
            const page = parseInt(e.target.value);
            gotoPage(page - 1);
          }}
          style={{ width: "50px", backgroundColor: "transparent" }}
        />
      </div>
    </>
  );
};

export default PaginationTable;

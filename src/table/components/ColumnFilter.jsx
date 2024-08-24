/* eslint-disable react/prop-types */

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="form-group d-flex align-items-center gap-3 px-3">
      <input
        className="form-control my-3 shadow-none bg-dark text-white"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
      />
    </div>
  );
};

export default ColumnFilter;

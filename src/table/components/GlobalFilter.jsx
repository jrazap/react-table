/* eslint-disable react/prop-types */

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="form-group d-flex align-items-center gap-3 px-3">
      <label htmlFor="search" className="form-label my-3 fw-bold">
        Search:
      </label>
      <input
        id="search"
        className="form-control my-3 shadow-none bg-dark text-white"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default GlobalFilter;

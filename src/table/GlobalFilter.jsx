import React, { useState, useEffect } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter || "");

  //   const onChange = useAsyncDebounce(value => {
  //     setFilter(value || undefined)
  //   }, 1000);

//   useEffect(() => {
//     setValue(filter || "");
//   }, [filter]);

  return (
    <div className="form-group d-flex align-items-center gap-3 px-3">
      <label htmlFor="search" className="form-label my-3">
        Search:
      </label>
      <input
        id="search"
        className="form-control my-3 shadow-none"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          //   onChange(e.target.value);
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default GlobalFilter;

import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder="Search..."
      style={{
        fontSize: "1.1rem",
        border: "0",
      }}
    />
  );
}

export default GlobalFilter;

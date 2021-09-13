import React, { useState } from "react";

const FilterInput = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default FilterInput;

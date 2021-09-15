import React, { useState, createContext, useEffect } from "react";

export const TableContext = createContext();

export const TableDataProvider = ({ children }) => {
  const [natValue, setNatValue] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <TableContext.Provider
      value={{ pageIndex, setPageIndex, setNatValue, natValue }}
    >
      {children}
    </TableContext.Provider>
  );
};

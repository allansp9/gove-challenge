import React, { useState, createContext } from "react";

export const TableContext = createContext();

export const TableDataProvider = ({ children }) => {
  const [natValue, setNatValue] = useState("");

  return (
    <TableContext.Provider value={{ setNatValue, natValue }}>
      {children}
    </TableContext.Provider>
  );
};

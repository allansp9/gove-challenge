import React, { useState, createContext, useEffect } from "react";
import useSWRInfinite from "swr/infinite";

import { fetcher } from "../helpers";

export const TableContext = createContext();

export const TableDataProvider = ({ children }) => {
  const [natValue, setNatValue] = useState("");
  const [tableData, setTableData] = useState(null);

  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=50&seed=abc&page=${
        index + 1
      }&nat=${natValue}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      let users = [];
      data.map((page) => users.push(...page.results));
      setTableData(users);
    }
  }, [data]);

  return (
    <TableContext.Provider
      value={{ data, size, setSize, natValue, setNatValue, tableData }}
    >
      {children}
    </TableContext.Provider>
  );
};

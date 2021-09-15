import { useContext, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { TableContext } from "../../context/tableContext";
import { fetcher } from "../../helpers";
import TableInstance from "./TableInstance";

const TableQuery = () => {
  const [tableData, setTableData] = useState(null);

  const { natValue } = useContext(TableContext);

  const { data } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=50&seed=abc&page=${
        index + 1
      }&nat=${natValue}`,
    fetcher
  );

  useEffect(() => {
    let users = [];
    if (data) {
      data.map((page) => users.push(...page.results));
      setTableData(users);
    }
  }, [data]);

  if (!data || !tableData) {
    return <div>Loading...</div>;
  }

  return <TableInstance tableData={tableData} />;
};

export default TableQuery;

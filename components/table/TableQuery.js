import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import TableInstance from "./TableInstance";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TableQuery = () => {
  const [tableData, setTableData] = useState(null);

  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=10&seed=abc&page=${index + 1}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      let users = [];
      data.map((page) => users.push(...page.results));
      setTableData(users);
    }
  }, [data]);

  if (!tableData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableInstance tableData={tableData} />
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </>
  );
};

export default TableQuery;

import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import TableInstance from "./TableInstance";
import NatSelector from "../NatSelector";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TableQuery = () => {
  const [tableData, setTableData] = useState(null);
  const [natValue, setNatValue] = useState("");

  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=10&seed=abc&page=${
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

  if (!tableData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NatSelector natValue={natValue} setNatValue={setNatValue} />
      <TableInstance tableData={tableData} />
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </>
  );
};

export default TableQuery;

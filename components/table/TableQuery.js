import { useContext, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { TableContext } from "../../context/tableContext";
import { fetcher } from "../../helpers";
import LoadMoreButton from "../buttons/LoadMoreButton";
import TableInstance from "./TableInstance";
import TableSkeleton from "./TableSkeleton";

const TableQuery = () => {
  const [tableData, setTableData] = useState(null);

  const { natValue } = useContext(TableContext);

  const { data, size, setSize } = useSWRInfinite(
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

  return (
    <div className="max-h-[600px] pb-5 overflow-auto flex flex-col items-center space-y-5 border border-gray-300">
      {!tableData ? (
        <TableSkeleton />
      ) : (
        <>
          <TableInstance tableData={tableData} />
          <LoadMoreButton data={data} size={size} setSize={setSize} />
        </>
      )}
    </div>
  );
};

export default TableQuery;

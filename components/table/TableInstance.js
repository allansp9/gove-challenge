import { useContext, useMemo } from "react";
import Link from "next/link";
import { useGlobalFilter, useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";

import TableLayout from "./TableLayout";
import { DefaultColumnFilter, SelectColumnFilter } from "./TableFilters";
import { UserContext } from "../../context/userContext";

const TableInstance = ({ tableData }) => {
  const { natValue } = useContext(UserContext);

  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: "name.first",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Birth",
        accessor: "dob.date",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Action",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => (
          <Link
            href={`/user/[userId]${natValue && `?nat=${row.original.nat}`}`}
            as={`/user/${row.index + 1}${
              natValue && `?nat=${row.original.nat}`
            }`}
            passHref
          >
            <button className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        ),
      },
    ];
    return [columns, tableData];
  }, [tableData]);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy
  );

  return <TableLayout {...tableInstance} />;
};

export default TableInstance;

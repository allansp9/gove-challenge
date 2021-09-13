import { useContext, useMemo } from "react";
import Link from "next/link";
import { useGlobalFilter, useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";

import TableLayout from "./TableLayout";
import { SelectColumnFilter } from "./TableFilters";
import { UserContext } from "../../context/userContext";

const TableInstance = ({ tableData }) => {
  const { natValue } = useContext(UserContext);

  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: "name.first",
        disableFilters: true,
        Footer: "Name",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Filter: SelectColumnFilter,
        filter: "includes",
        Footer: "Gender",
      },
      {
        Header: "Birth",
        accessor: "dob.date",
        disableFilters: true,
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
        Footer: "Birth",
      },
      {
        Header: "Action",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          // console.log(row);
          return (
            <Link
              href={`/user/[userId]${natValue && `?nat=${row.original.nat}`}`}
              as={`/user/${row.index + 1}${
                natValue && `?nat=${row.original.nat}`
              }`}
            >
              <a>Visualizar</a>
            </Link>
          );
        },
        Footer: "Action",
      },
    ];
    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return <TableLayout {...tableInstance} />;
};

export default TableInstance;

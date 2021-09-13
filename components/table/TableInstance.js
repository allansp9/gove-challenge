import { useMemo } from "react";
import Link from "next/link";
import { useGlobalFilter, useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";

import TableLayout from "./TableLayout";
import { SelectColumnFilter } from "./TableFilters";

const TableInstance = ({ tableData }) => {
  console.log(tableData);
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: [tableData.info.page].name.first,
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
        // Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
        Footer: "Birth",
      },
      {
        Header: "Action",
        accessor: "login.uuid",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ value }) => (
          <Link href="/user/[userId]" as={`/user/${value}`}>
            <a>Visualizar</a>
          </Link>
        ),
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

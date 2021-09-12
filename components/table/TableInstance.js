import { useMemo } from "react";
import Link from "next/link";
import { useGlobalFilter, useTable, useSortBy } from "react-table";
import { format } from "date-fns";

import TableLayout from "./TableLayout";

const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: "name.first",
        Footer: "Name",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Footer: "Gender",
      },
      {
        Header: "Birth",
        accessor: "dob.date",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
        Footer: "Birth",
      },
      {
        Header: "Action",
        accessor: "login.uuid",
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
  console.log(data);

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return <TableLayout {...tableInstance} />;
};

export default TableInstance;

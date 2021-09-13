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
          >
            <a>Visualizar</a>
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

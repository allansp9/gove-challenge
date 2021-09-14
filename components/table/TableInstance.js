import { useContext, useMemo } from "react";
import Link from "next/link";
import { useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";

import TableLayout from "./TableLayout";
import { DefaultColumnFilter, SelectColumnFilter } from "./TableFilters";
import { TableContext } from "../../context/tableContext";
import SeeDetailsButton from "../SeeDetailsButton";

const TableInstance = () => {
  const { natValue, tableData } = useContext(TableContext);

  if (!tableData) return <div>Loading...</div>;

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
        Header: "",
        disableFilters: true,
        disableSortBy: true,
        accessor: "action",
        Cell: ({ row }) => (
          <Link
            href={`/user/[userId]${natValue && `?nat=${row.original.nat}`}`}
            as={`/user/${row.index + 1}${
              natValue && `?nat=${row.original.nat}`
            }`}
            passHref
          >
            <SeeDetailsButton />
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

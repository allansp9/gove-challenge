import { useContext, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { format } from "date-fns";
import Link from "next/link";

import SeeDetailsButton from "../buttons/SeeDetailsButton";
import TableLayout from "./TableLayout";
import { DefaultColumnFilter, SelectColumnFilter } from "./TableFilters";
import { TableContext } from "../../context/tableContext";

const TableInstance = ({ tableData }) => {
  const { natValue } = useContext(TableContext);

  const [columns, data] = useMemo(() => {
    const tableColumns = [
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
            <SeeDetailsButton />
          </Link>
        ),
      },
    ];
    return [tableColumns, tableData];
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

  return <TableLayout {...tableInstance}></TableLayout>;
};

export default TableInstance;

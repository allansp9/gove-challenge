import { useMemo } from "react";
import Link from "next/link";
import { useTable } from "react-table";
import TableLayout from "./TableLayout";

const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: "name.first",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Birth",
        accessor: "dob.date",
      },
      {
        Header: "Action",
        accessor: "login.uuid",
        Cell: ({ cell }) => (
          <Link href="/user/[userId]" as={`/user/${cell.value}`}>
            <a>Visualizar</a>
          </Link>
        ),
      },
    ];
    return [columns, tableData];
  }, [tableData]);
  console.log(data);

  const tableInstance = useTable({ columns, data });

  return <TableLayout {...tableInstance} />;
};

export default TableInstance;

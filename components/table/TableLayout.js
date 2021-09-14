import React, { useContext } from "react";
import { TableContext } from "../../context/tableContext";
import NatSelector from "../nat-selector/NatSelector";

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {
  const { size, setSize } = useContext(TableContext);
  return (
    <>
      <NatSelector />
      <table {...getTableProps()} id="users-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th scope="col" key={index}>
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </div>
                  <div>{column.canFilter && column.render("Filter")}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={() => setSize(size + 1)}>Load More</button>
    </>
  );
};

export default TableLayout;

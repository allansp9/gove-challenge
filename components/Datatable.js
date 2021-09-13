import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "../context/userContext";
import FilterInput from "./FilterInput";
import { tableFilter } from "../helpers";

const Datatable = () => {
  const { data, setSize, size } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (data) {
      setFilteredData(tableFilter(data, query));
    }
  }, [data, query]);

  if (!filteredData) {
    return <div>Loading...</div>;
  }

  console.log(filteredData);

  if (filteredData.length < 1) {
    return <div>No results.</div>;
  }

  return (
    <div>
      <FilterInput query={query} setQuery={setQuery} />
      {filteredData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {filteredData.map((page, pageIndex) => {
            if (page.length > 0) {
              page.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.name.first}</td>
                  <td>{row.gender}</td>
                  <td>{row.dob.date}</td>
                  <td>
                    <Link
                      href="/[pageId]/user/[userId]"
                      as={`/${pageIndex + 1}/user/${row.login.uuid}`}
                      scroll={false}
                    >
                      <a>Visualizar</a>
                    </Link>
                  </td>
                </tr>
              ));
            }
          })} */}
          </tbody>
        </table>
      )}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
};

export default Datatable;

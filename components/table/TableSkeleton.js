const TableSkeleton = () => {
  const rows = [];

  for (let index = 0; index < 19; index++) {
    rows.push(index);
  }

  return (
    <table className="w-full table-skeleton animate-pulse">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((index) => (
          <tr key={index}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;

export const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const tableFilter = (data, query) => {
  return data.map((page) =>
    page.results.filter(
      (row) => row.name.first.toLowerCase().indexOf(query) > -1
    )
  );
};

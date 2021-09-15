import React, { useContext } from "react";
import useSWRInfinite from "swr/infinite";
import { TableContext } from "../../context/tableContext";
import { fetcher } from "../../helpers";

const LoadMoreButton = () => {
  const { natValue } = useContext(TableContext);
  const { size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=50&seed=abc&page=${
        index + 1
      }&nat=${natValue}`,
    fetcher
  );

  return (
    <button
      onClick={() => setSize(size + 1)}
      className="border w-[150px] px-4 py-2 my-6 bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-900"
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;

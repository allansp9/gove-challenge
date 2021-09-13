import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const baseUrl = "https://randomuser.me/api/?results=50&seed=abc&page=";

export const useGetUsers = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = baseUrl + path;

  const { data: users, error } = useSWR(url, fetcher);

  return { users, error };
};

export const useGetInfiniteUsers = () => {
  const url = baseUrl;

  const { data, size, setSize, error } = useSWRInfinite(
    (index) => url + (index + 1),
    fetcher
  );

  return { data, error, size, setSize };
};

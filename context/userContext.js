import React, { useState, createContext } from "react";
import useSWRInfinite from "swr/infinite";

export const UserContext = createContext();

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const UserProvider = ({ children }) => {
  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=50&seed=abc&page=${index + 1}`,
    fetcher
  );

  //   const pages = data ? [].concat(...data) : [];
  let users = [];

  // data?.map((page) => users.push(...page));

  // if (data) {
  //   console.log(data);
  // }

  return (
    <UserContext.Provider value={{ data, size, setSize }}>
      {children}
    </UserContext.Provider>
  );
};

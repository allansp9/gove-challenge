import Head from "next/head";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=10&seed=abc&page=${index + 1}`,
    fetcher
  );

  let users = [];
  if (data) {
    data.map((page) => users.push(...page.results));
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!data && <div>Loading...</div>}
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
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name.first}</td>
                <td>{user.gender}</td>
                <td>{user.dob.date}</td>
                <td>visualizar</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}

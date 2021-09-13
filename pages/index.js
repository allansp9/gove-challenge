import Head from "next/head";

import TableQuery from "../components/table/TableQuery";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TableQuery />
    </div>
  );
}

import Head from "next/head";
import NatSelector from "../components/nat-selector/NatSelector";
import Navbar from "../components/Navbar";
import TableQuery from "../components/table/TableQuery";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container m-auto pt-[30px]">
        <NatSelector />

        <TableQuery />
      </main>
    </div>
  );
}

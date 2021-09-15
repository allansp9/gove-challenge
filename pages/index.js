import Head from "next/head";
import LoadMoreButton from "../components/buttons/LoadMoreButton";
import NatSelector from "../components/nat-selector/NatSelector";
import TableQuery from "../components/table/TableQuery";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container m-auto">
        <NatSelector />

        <TableQuery />
        <LoadMoreButton />
      </main>
    </div>
  );
}

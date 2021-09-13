import Head from "next/head";
import React, { useState } from "react";

import { UserProvider } from "../context/userContext";
import { search } from "../helpers";
import Datatable from "../components/Datatable";

export default function Home() {
  return (
    <UserProvider>
      <div className="flex flex-col items-center min-h-screen py-2">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Datatable />
      </div>
    </UserProvider>
  );
}

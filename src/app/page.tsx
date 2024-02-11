"use client";

import ConnectQuickBooks from "@/components/ConnectQuickBooks";
import CreateUser from "@/components/CreateUser";
import useAlloyHooks from "./useAlloyHook";
import { useEffect } from "react";

export default function Home() {
  const {
    createUser,
    errorMsg,
    username,
    connectToQuickBooks,
    userId,
    connectionId,
    getUser,
  } = useAlloyHooks();

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target.elements.username.value);
    createUser(e.target.elements.username.value);
  };

  return (
    <div>
      {userId ? (
        <ConnectQuickBooks
          username={username}
          connectToQuickBooks={connectToQuickBooks}
          errorMsg={errorMsg}
          connectionId={connectionId}
        />
      ) : (
        <CreateUser errorMsg={errorMsg} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

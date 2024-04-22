"use client";

import ConnectShopify from "@/components/ConnectShopify";
import CreateUser from "@/components/CreateUser";
import useAlloyHooks from "./useAlloyHook";
import { useEffect } from "react";

export default function Home() {
  const {
    createUser,
    errorMsg,
    username,
    userId,
    connectSuccess,
    getUser,
    connectToShopify,
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
      {
        <ConnectShopify
          username={""}
          connectToShopify={connectToShopify}
          errorMsg={errorMsg}
          connectSuccess={connectSuccess}
        />
      }
    </div>
  );
}

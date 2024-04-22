"use client";

import ConnectShopify from "@/components/ConnectShopify";
import CreateUser from "@/components/CreateUser";
import useAlloyHooks from "./useAlloyHook";
import ShowIntegrations from "@/components/ShowIntegrations";

export default function Home() {
  const {
    createUser,
    msg,
    username,
    userId,
    integrations,
    connectSuccess,
    getIntegrations,
    installIntegration,
  } = useAlloyHooks();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target.elements.username.value);
    createUser(e.target.elements.username.value);
  };

  return (
    <div>
      <CreateUser handleSubmit={handleSubmit} msg={msg} />
      <ShowIntegrations
        getIntegrations={getIntegrations}
        integrations={integrations}
        installIntegration={installIntegration}
      />
    </div>
  );
}

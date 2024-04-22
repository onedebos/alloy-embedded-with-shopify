import axios from "axios";
import { useState } from "react";

// Step 0: Install and import alloy-frontend
import Alloy from "alloy-frontend";

const useAlloyHooks = () => {
  const [username, setUsername] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("6622a1914268110c7ca94986");
  const [loading, setLoading] = useState<boolean>(true);
  const [connectSuccess, setConnectSuccess] = useState<boolean>(false);
  const [integrations, setIntegrations] = useState([]);

  const alloy = Alloy();

  // Step 1: Create a user in Alloy
  const createUser = async (username: string) => {
    try {
      setMsg("");
      setLoading(true);
      const response = await axios.post("/api/create-user", { username });
      const { userId } = response.data.data;
      setUsername(username);
      setUserId(userId);
      localStorage.setItem("userId", userId);
      setMsg("User created!");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setMsg(error.response.data.message);
    }
  };

  // Step 2: Get Integrations
  const getIntegrations = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`/api/get-integrations/${userId}`);
      const { data } = response.data.data;
      console.log(data);
      setIntegrations(data);
      localStorage.setItem("integrationId", data.integrationID);
    } catch (error) {
      console.log(error);
    }
  };

  // Step 3: Connect Shopify to App
  const installIntegration = async (integrationId) => {
    try {
      setMsg("");
      const response = await axios.get(`/api/get-token/${userId}`);
      const { token } = response.data.data;

      setToken(token);

      alloy.setToken(token);
      console.log({ token, integrationId });
      alloy.install({
        integrationId,
        callback: () => {
          // console.log(data);
          // setConnectSuccess(true);
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    username,
    msg,
    token,
    createUser,
    loading,
    userId,
    installIntegration,
    getIntegrations,
    connectSuccess,
    integrations,
  };
};

export default useAlloyHooks;

import axios from "axios";
import { useState } from "react";
import Alloy from "alloy-frontend";
import { NextApiResponse } from "next";

interface AlloyHooksResponse extends NextApiResponse {
  data: { message: string; data: { userId: string; username: string } };
}

const useAlloyHooks = () => {
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("6622a1914268110c7ca94986");
  const [loading, setLoading] = useState<boolean>(true);
  const [connectSuccess, setConnectSuccess] = useState<boolean>(false);
  const [orders, setOrders] = useState([]);

  const alloy = Alloy();

  const createUser = async (username: string) => {
    try {
      setErrorMsg("");
      setLoading(true);
      const response: AlloyHooksResponse = await axios.post(
        "/api/create-user",
        { username }
      );
      const { userId } = response.data.data;
      setUsername(username);
      setUserId(userId);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const response: AlloyHooksResponse = await axios.get(
        `api/get-user/${userId}`
      );

      setUsername(response.data.data.username);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.response.data.message);
    }
  };

  const connectToShopify = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(`/api/get-token/${userId}`);
      const { token } = response.data.data;

      setToken(token);

      alloy.setToken(token);
      alloy.authenticate({
        app: "shopify",
        callback: (data: any) => {
          setConnectSuccess(true);
        },
      });
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  const getCredentialId = async () => {
    try {
      const response = await axios.get(`/api/get-credentials/${userId}`);
      const credentialId = response.data.data;

      localStorage.setItem("credentialId", credentialId);
    } catch (error) {}
  };

  const fetchOrders = async () => {
    try {
      setErrorMsg("");
      getCredentialId();
      const credentialId = localStorage.getItem("credentialId");
      const response = await axios.get(`/api/get-orders/${credentialId}`);
      console.log(response.data.data.orders);
      setOrders(response.data.data.orders);
      console.log({ orders });
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  return {
    username,
    errorMsg,
    token,
    createUser,
    loading,
    userId,
    connectToShopify,
    fetchOrders,
    getUser,
    connectSuccess,
    orders,
  };
};

export default useAlloyHooks;

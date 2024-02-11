import axios from "axios";
import { useState, useEffect } from "react";
import Alloy from "alloy-frontend";
import { NextApiResponse } from "next";

interface AlloyHooksResponse extends NextApiResponse {
  data: { message: { userId: string; username: string } };
}

interface Customer {
  taxNumber: string;
  name: string;
  email: string;
  phoneNumber: string;
  remoteId: string;
}

interface CreateCustomer {
  name: string;
  email: string;
  taxNumber: string;
}

const useAlloyHooks = () => {
  // Track user profile
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("65c7b8f3a17e01bd0a554399");
  // const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [connectionId, setConnectionId] = useState<string>("");
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    phone: "",
    currency: "",
  });
  const [customerInfo, setCustomerInfo] = useState({});
  const [successMsg, setSuccessMsg] = useState<string>("");
  const alloy = Alloy();

  const createUser = async (username: string) => {
    try {
      setErrorMsg("");
      setLoading(true);
      const response: AlloyHooksResponse = await axios.post(
        "/api/create-user",
        { username }
      );
      const { userId } = response.data.message;
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

      setUsername(response.data.message.username);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.response.data.message);
    }
  };

  const connectToQuickBooks = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(`/api/get-token/${userId}`);
      const { token } = response.data.message;

      setToken(token);

      alloy.setToken(token);
      alloy.authenticate({
        app: "quickbooks",
        callback: (data: any) => {
          const { connectionId } = data;

          localStorage.setItem("connectionId", connectionId);
          setConnectionId(connectionId);
        },
      });
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      setErrorMsg("");
      const connectionId = localStorage.getItem("connectionId");

      const response = await axios.get(`/api/get-company-info/${connectionId}`);
      console.log(response.data);
      const { companyInfo } = response.data.message;
      const { companyName, companyPhoneNumbers, currency } = companyInfo[0];
      setCompanyInfo({
        companyName,
        phone: companyPhoneNumbers[0].phoneNumber,
        currency,
      });
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  const fetchCustomerInfo = async () => {
    try {
      setErrorMsg("");
      const connectionId = localStorage.getItem("connectionId");
      const response = await axios.get(
        `/api/get-customer-list/${connectionId}`
      );

      const { customers } = response.data.message;
      const customerList: Customer[] = [];
      customers.map((customer: any) => {
        const { remoteId, customerName, email, phoneNumbers, taxNumber } =
          customer;
        customerList.push({
          remoteId,
          name: customerName,
          email,
          phoneNumber: phoneNumbers[0]?.phoneNumber,
          taxNumber,
        });
      });

      setCustomerInfo(customerList);
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  const createCustomer = async ({ name, email, taxNumber }: CreateCustomer) => {
    try {
      setErrorMsg("");
      setLoading(true);
      const connectionId = localStorage.getItem("connectionId");
      const response: AlloyHooksResponse = await axios.post(
        `/api/create-customer/${connectionId}`,
        { customerName: name, email, taxNumber }
      );

      setSuccessMsg("User successfully created");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
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
    connectToQuickBooks,
    connectionId,
    companyInfo,
    fetchCompanyInfo,
    fetchCustomerInfo,
    customerInfo,
    createCustomer,
    successMsg,
    getUser,
  };
};

export default useAlloyHooks;

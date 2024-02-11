"use client";

import Customers from "@/components/Customers";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import useAlloyHooks from "../useAlloyHook";

const CustomersList = () => {
  const { fetchCustomerInfo, customerInfo } = useAlloyHooks();

  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  return (
    <div className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar />
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 w-1/2">
        <Customers customers={customerInfo.length > 0 ? customerInfo : []} />
      </div>
    </div>
  );
};

export default CustomersList;

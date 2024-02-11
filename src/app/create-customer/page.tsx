"use client";

import Sidebar from "@/components/Sidebar";
import useAlloyHooks from "../useAlloyHook";

const CustomersList = () => {
  const { createCustomer, successMsg, errorMsg } = useAlloyHooks();

  const handleCreateCustomer = (e: any) => {
    e.preventDefault();
    const { name, email, taxNumber } = e.target.elements;

    createCustomer({
      name: name.value,
      email: email.value,
      taxNumber: taxNumber.value,
    });
  };

  return (
    <div className="bg-gray-900 p-10 min-h-screen flex gap-4">
      <Sidebar />
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 w-1/2">
        <form onSubmit={handleCreateCustomer} className="max-w-sm mx-auto mt-6">
          <div className="mb-5">
            <label
              htmlFor="customerName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Flora Neumann"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Flora@acme.inc"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="taxId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tax ID:
            </label>
            <input
              type="text"
              id="taxNumber"
              name="taxNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123456"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone No:
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            Submit
          </button>
        </form>
        <p className="mt-2 text-center text-green-400">
          {successMsg && successMsg}
        </p>
        <p className="mt-2 text-center text-red-400">{errorMsg && errorMsg}</p>
      </div>
    </div>
  );
};

export default CustomersList;

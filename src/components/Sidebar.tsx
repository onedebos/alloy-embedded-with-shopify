import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="mt-10 p-10 bg-gray-800 max-w-sm rounded-lg">
      <h3 className="text-center font-medium text-xl">Quicker Books</h3>
      <div className="flex flex-col mt-10">
        <Link
          href="/dashboard"
          className="p-3 text-center text-sm rounded-md bg-indigo-600 px-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
          Company Info
        </Link>
        <Link
          href="/customers"
          className="p-3 text-center text-sm rounded-md bg-indigo-600 px-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
        >
          See Customers
        </Link>
        <Link
          href="/create-customer"
          className="p-3 text-center text-sm rounded-md bg-indigo-600 px-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
        >
          Create Customer
        </Link>
      </div>
    </div>
  );
}

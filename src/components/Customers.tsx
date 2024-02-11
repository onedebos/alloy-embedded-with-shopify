interface CustomersProp {
  customers: {
    name: string;
    email: string;
    phoneNumber: string;
    remoteId: string;
  }[];
}

const Customers = ({ customers }: CustomersProp) => {
  return (
    <div className="relative overflow-x-auto mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-sm">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer name
            </th>
            <th scope="col" className="px-6 py-3">
              E-mail
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              RemoteID
            </th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {customer.name}
              </th>
              <td className="px-6 py-4">{customer.email}</td>
              <td className="px-6 py-4">{customer.phoneNumber}</td>
              <td className="px-6 py-4">{customer.remoteId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;

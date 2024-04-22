const Customers = ({ orders }) => {
  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-sm">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3">
              Order Number
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.id}
              </th>
              <td className="px-6 py-4">{order.paymentStatus}</td>
              <td className="px-6 py-4">{order.orderNumber}</td>
              <td className="px-6 py-4">${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;

import Link from "next/link";
interface ConnectShopifyProps {
  username: string;
  connectSuccess: boolean;
  connectToShopify: () => void;
}

const ConnectShopify = ({
  username,
  connectToShopify,
  connectSuccess,
}: ConnectShopifyProps) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Welcome {username}
          Step 3: Connect to Shopify.
        </h2>
        <button
          type="submit"
          onClick={connectToShopify}
          className={`mt-5 flex w-full justify-center rounded-md ${
            !connectSuccess ? "bg-indigo-600" : "bg-green-600"
          } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
            !connectSuccess ? "hover:bg-indigo-500" : "bg-green-500"
          } focus-visible:outline focus-visible:outline-2`}
        >
          {!connectSuccess ? "Connect Shopify Store" : "Connection Successful"}
        </button>
      </div>

      <div>Step 4: Show user's countries</div>
    </div>
  );
};

export default ConnectShopify;

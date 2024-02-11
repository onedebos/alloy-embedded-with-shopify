import Link from "next/link";
interface ConnectQuickBooksProps {
  username: string;
  errorMsg: string;
  connectionId: string;
  connectToQuickBooks: () => void;
}

const ConnectQuickBooks = ({
  username,
  connectToQuickBooks,
  errorMsg,
  connectionId,
}: ConnectQuickBooksProps) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Welcome, @{username}
        </h2>
        <button
          type="submit"
          onClick={connectToQuickBooks}
          className={`mt-5 flex w-full justify-center rounded-md ${
            !connectionId ? "bg-indigo-600" : "bg-green-600"
          } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
            !connectionId ? "hover:bg-indigo-500" : "bg-green-500"
          } focus-visible:outline focus-visible:outline-2`}
        >
          {!connectionId ? "Connect to QuickBooks" : "Connection Successful"}
        </button>
      </div>
      <p className="mt-2 text-center text-red-400">{errorMsg && errorMsg}</p>

      <Link href="/dashboard" className="text-center text-blue-200">
        {connectionId && "Go to Dashboard"}
      </Link>
    </div>
  );
};

export default ConnectQuickBooks;

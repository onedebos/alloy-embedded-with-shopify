interface createUserProps {
  handleSubmit: (e: any) => void;
  errorMsg: string;
}

export default function CreateUser({
  handleSubmit,
  errorMsg,
}: createUserProps) {
  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Shoppers.io
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p>To get started, Enter your username: </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm px-2 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-red-400">{errorMsg && errorMsg}</p>
      </div>
    </main>
  );
}

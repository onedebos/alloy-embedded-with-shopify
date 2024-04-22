interface createUserProps {
  getIntegrations: () => void;
}

export default function ShowIntegrations({
  getIntegrations,
  integrations,
  installIntegration,
}: createUserProps) {
  return (
    <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Step 2: Show Integrations
        </h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          {integrations &&
            integrations.map((integration) => (
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex flex-col items-center">
                  <img width={64} height={64} src={integration.icon} />
                  <p>{integration.app}</p>
                  <p>{integration.installed}</p>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={() =>
                      installIntegration(integration.integrationId)
                    }
                  >
                    install
                  </button>
                </div>
              </div>
            ))}
        </div>

        {integrations.length < 1 && (
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4`}
            onClick={getIntegrations}
          >
            Get Integrations
          </button>
        )}
      </div>
    </main>
  );
}

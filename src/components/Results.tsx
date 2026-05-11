

type Props = {
  audit: any;
};

export default function Results({
  audit,
}: Props) {    

  if (!audit.results.length) {

  return (
    <div className="mt-10 bg-gray-900 border border-gray-700 rounded-2xl p-10 text-center">

      <h2 className="text-3xl font-bold text-white">
        No Savings Found
      </h2>

      <p className="text-gray-400 mt-4">
        Your current AI tooling stack appears reasonably optimized.
      </p>

    </div>
  );
}



  return (
    <div className="mt-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 text-white">

      <h2 className="text-4xl font-extrabold">
        Audit Results
      </h2>

      <div className="mt-8">

        <p className="text-6xl font-extrabold text-green-400">
          ${audit.totalMonthlySavings}/mo
        </p>

        <p className="text-2xl text-gray-300 mt-3">
          ${audit.totalAnnualSavings}/year
        </p>

      </div>

      <div className="mt-10 space-y-6">

        {audit.results.map(
          (result: any, index: number) => (

            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6"
            >

              <h3 className="text-3xl font-bold capitalize">
                {result.tool}
              </h3>

              <p className="mt-3 text-gray-300">
                Current Plan:
                {" "}
                <strong>
                  {result.currentPlan}
                </strong>
                {" "}
                (${result.currentSpend})
              </p>

              <p className="mt-3">

                Recommendation:
                {" "}

                <span className="text-green-400 font-bold">
                  {result.recommendation}
                </span>

              </p>

              <p className="mt-4 text-2xl font-bold text-green-400">
                Save ${result.savings}/month
              </p>

              <p className="mt-4 text-gray-300 leading-7">
                {result.reason}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}
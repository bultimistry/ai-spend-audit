import { supabase } from "@/lib/supabase";
import CopyLinkButton from "@/components/CopyLinkButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/*
  OPEN GRAPH METADATA
*/

export async function generateMetadata({
  params,
}: Props) {

  const { id } = await params;

  const { data } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  if (!data) {

    return {
      title: "StackAudit Report",
      description:
        "AI spend optimization audit",
    };
  }

  return {

    title:
      `Save $${data.total_monthly_savings}/mo with StackAudit`,

    description:
      "AI tooling cost optimization report",

    openGraph: {

      title:
        `Save $${data.total_monthly_savings}/mo with StackAudit`,

      description:
        "AI tooling spend audit",

      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      ],
    },
  };
}

export default async function ResultPage({
  params,
}: Props) {

  const { id } = await params;

  /*
    FETCH AUDIT
  */

  const { data, error } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  /*
    NOT FOUND
  */

  if (!data || error) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Audit Not Found
          </h1>

          <p className="text-gray-400 mt-4">
            This audit may have been deleted or never existed.
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 text-white py-10 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h1 className="text-6xl font-extrabold">
              StackAudit Report
            </h1>

            <p className="mt-4 text-gray-300">
              AI spend optimization audit
            </p>

          </div>

          <CopyLinkButton
            url={`http://localhost:3000/result/${id}`}
          />

        </div>

        {/* HERO */}

        <div className="mt-10 bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl">

          <p className="text-gray-400 text-lg">
            Potential Savings
          </p>

          <h2 className="text-7xl font-extrabold text-green-400 mt-3">

            $
            {data.total_monthly_savings}
            /mo

          </h2>

          <p className="text-3xl text-gray-300 mt-4">

            $
            {data.total_annual_savings}
            /year

          </p>

        </div>

        {/* TOOL BREAKDOWN */}

        <div className="mt-10">

          <h2 className="text-4xl font-bold mb-6">
            Tool Recommendations
          </h2>

          <div className="space-y-6">

            {data.audit.results.map(
              (
                result: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
                >

                  <h3 className="text-3xl font-bold capitalize">
                    {result.tool}
                  </h3>

                  <p className="mt-4 text-gray-300">

                    Current:
                    {" "}

                    {result.currentPlan}
                    {" "}

                    (${result.currentSpend})

                  </p>

                  <p className="mt-4">

                    Recommendation:
                    {" "}

                    <span className="text-green-400 font-bold">
                      {result.recommendation}
                    </span>

                  </p>

                  <p className="mt-4 text-2xl font-bold text-green-400">

                    Save $
                    {result.savings}
                    /month

                  </p>

                  <p className="mt-5 text-gray-300 leading-7">
                    {result.reason}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* AI SUMMARY */}

        <div className="mt-10 bg-blue-950 border border-blue-800 rounded-2xl p-8 shadow-xl">

          <h3 className="text-3xl font-bold">
            AI Executive Summary
          </h3>

          <p className="mt-5 text-gray-300 leading-8 text-lg">

            {data.summary}

          </p>

        </div>

        {/* HIGH SAVINGS CTA */}

        {data.total_monthly_savings > 500 && (

          <div className="mt-10 bg-green-950 border border-green-700 rounded-2xl p-8 shadow-xl">

            <h3 className="text-4xl font-bold text-green-400">

              You may be significantly overspending on AI tooling.

            </h3>

            <p className="mt-4 text-gray-300 text-lg">

              Credex can help optimize procurement, credits, and enterprise AI spend strategy.

            </p>

            <button className="mt-6 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition">

              Book Credex Consultation

            </button>

          </div>
        )}

        {/* FOOTER */}

        <div className="mt-16 text-center text-gray-500">

          <p>
            Generated by StackAudit
          </p>

        </div>

      </div>

    </main>
  );
}
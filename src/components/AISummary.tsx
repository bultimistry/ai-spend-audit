type Props = {
  summary: string;
};

export default function AISummary({
  summary,
}: Props) {

  return (
    <div className="mt-8 bg-blue-950 border border-blue-800 rounded-2xl p-8 text-white shadow-xl">

      <h3 className="text-3xl font-bold">
        AI Executive Summary
      </h3>

      <p className="mt-5 text-gray-300 leading-8 text-lg">
        {summary}
      </p>

    </div>
  );
}
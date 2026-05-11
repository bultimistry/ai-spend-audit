import ToolForm from "@/components/ToolForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold tracking-tight">
            StackAudit
          </h1>

          <p className="mt-5 text-xl text-gray-300">
            Find wasted AI spend in minutes.
          </p>

        </div>

        <div className="mt-12">
          <ToolForm />
        </div>

      </div>

    </main>
  );
}
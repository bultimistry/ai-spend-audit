"use client";
import axios from "axios";
import Results from "./Results";
import AISummary from "./AISummary";
import { useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { toolConfig } from "@/lib/toolConfig";
import EmailCapture from "./EmailCapture";

const toolOptions = [
  "chatgpt",
  "claude",
  "copilot",
  "cursor",
  "gemini",
  "openaiApi",
  "anthropicApi",
  "windsurf",
];

export default function ToolForm() {
  const { tools, setTools, teamSize, setTeamSize, useCase, setUseCase } =
    useFormStore();

  const [tool, setTool] = useState({
    name: "chatgpt",
    plan: "",
    spend: 0,
    seats: 1,
  });

  const [audit, setAudit] = useState<any>(null);

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [savedUrl, setSavedUrl] = useState("");

  const addTool = () => {
    // prevent invalid tool
    if (!tool.plan || tool.spend <= 0) {
      alert("Please fill all fields");
      return;
    }

    setTools([
      ...tools,
      {
        ...tool,
        spend: Number(tool.spend),
        seats: Number(tool.seats),
      },
    ]);

    // reset form
    setTool({
      name: "chatgpt",
      plan: "plus",
      spend: 0,
      seats: 1,
    });
  };

  const runAudit = async () => {
    setLoading(true);

    try {
      /*
        RUN AUDIT
      */

      const auditRes = await axios.post("/api/audit", {
        tools,
        teamSize,
        useCase,
      });

      setAudit(auditRes.data);

      /*
        GENERATE SUMMARY
      */

      const summaryRes = await axios.post("/api/generate-summary", {
        audit: auditRes.data,
        useCase,
      });

      setSummary(summaryRes.data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveAudit = async (leadData: any) => {
    try {
      /*
        START LOADING
      */

      setSaving(true);

      /*
        SAVE AUDIT
      */

      const res = await axios.post("/api/save-audit", {
        ...leadData,

        teamSize,

        useCase,

        tools,

        audit,

        summary,
      });

      const auditUrl = `http://localhost:3000/result/${res.data.auditId}`;

      setSavedUrl(auditUrl);

      /*
        SEND EMAIL
      */

      await axios.post("/api/send-email", {
        email: leadData.email,

        auditUrl,

        monthlySavings: audit.totalMonthlySavings,
      });
    } catch (error) {
      console.error(error);
    } finally {
      /*
        STOP LOADING
      */

      setSaving(false);
    }
  };
  return (
    <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-white">Your AI Stack</h2>

      <div className="grid grid-cols-2 gap-4">
        <select
          className="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={tool.name}
          onChange={(e) => {
            const selectedTool = e.target.value;

            setTool({
              ...tool,
              name: selectedTool,

              plan: toolConfig[selectedTool as keyof typeof toolConfig][0],
            });
          }}
        >
          {toolOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          className="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={tool.plan}
          onChange={(e) =>
            setTool({
              ...tool,
              plan: e.target.value,
            })
          }
        >
          <option value="">Select Plan</option>

          {toolConfig[tool.name as keyof typeof toolConfig]?.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Number of Seats"
          className="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={tool.seats}
          onChange={(e) =>
            setTool({
              ...tool,
              seats: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          placeholder="Monthly Spend USD"
          className="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={tool.spend}
          onChange={(e) =>
            setTool({
              ...tool,
              spend: Number(e.target.value),
            })
          }
        />
      </div>

      <button
        onClick={addTool}
        className="bg-white text-black font-semibold px-6 py-3 rounded-lg mt-6 hover:bg-gray-200 transition"
      >
        Add Tool
      </button>

      <button
        onClick={runAudit}
        className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg mt-4 ml-4 transition"
      >
        {loading ? "Running Audit..." : "Run Audit"}
      </button>

      <button
        onClick={() => {
          setTools([]);

          setTeamSize(1);

          setUseCase("coding");

          localStorage.removeItem("stackaudit-storage");
        }}
        className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg mt-4 ml-4 hover:bg-gray-800 transition"
      >
        Reset Form
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-white">Team Information</h3>

        <input
          type="number"
          className="border p-3 rounded w-full mb-4"
          placeholder="Team Size"
          value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
        />

        <select
          className="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <option value="coding">Coding</option>

          <option value="writing">Writing</option>

          <option value="research">Research</option>

          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-4">Added Tools</h3>
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-5 rounded-xl mb-4 text-white"
          >
            <div className="flex justify-between">
              <div>
                <p>
                  <strong>Tool:</strong> {tool.name}
                </p>

                <p>
                  <strong>Plan:</strong> {tool.plan}
                </p>

                <p>
                  <strong>Spend:</strong> ${tool.spend}
                </p>

                <p>
                  <strong>Seats:</strong> {tool.seats}
                </p>
              </div>

              <button
                onClick={() => {
                  const updated = tools.filter((_, i) => i !== index);

                  setTools(updated);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded h-fit"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {audit && <Results audit={audit} />}

      {summary && <AISummary summary={summary} />}

      {audit && <EmailCapture onSubmit={saveAudit} saving={saving} />}

      {savedUrl && (
        <div className="mt-6 bg-green-900 border border-green-700 p-5 rounded-xl">
          <p className="text-green-300 font-bold">Audit Saved Successfully</p>

          <a href={savedUrl} className="text-white underline break-all">
            {savedUrl}
          </a>

          <button
            onClick={() => {
              navigator.clipboard.writeText(savedUrl);
            }}
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg font-semibold"
          >
            Copy Share Link
          </button>
        </div>
      )}
    </div>
  );
}

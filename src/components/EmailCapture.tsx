"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: any) => void;
  saving: boolean;
};

export default function EmailCapture({
  onSubmit,
  saving,
}: Props) {

  const [form, setForm] =
    useState({
      email: "",
      company: "",
      role: "",
      website: "",
    });

  return (
    <div className="mt-8 bg-gray-900 border border-gray-700 rounded-2xl p-8">

      <h3 className="text-3xl font-bold text-white">
        Save Your Audit
      </h3>

      <p className="text-gray-400 mt-3">
        Get a shareable audit link and future optimization updates.
      </p>

      <div className="mt-6 space-y-4">

        <input
          type="email"
          placeholder="Work Email"
          className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Company (Optional)"
          className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg"
          value={form.company}
          onChange={(e) =>
            setForm({
              ...form,
              company: e.target.value,
            })
          }
        />


        <input
          type="text"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) =>
            setForm({
              ...form,
              website: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Role (Optional)"
          className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        />

        <button
          onClick={() =>
            onSubmit(form)
          }
          className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-lg w-full"
        >
          {saving
            ? "Saving..."
            : "Save Audit Report"}
        </button>

      </div>

    </div>
  );
}
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function SendFeedbackPage() {
  const [userEmail, setUserEmail] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // NOTE: API call preserved exactly: sends { userEmail, hrEmail }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simple client-side validation
    const isValidEmail = (em: string) => /\S+@\S+\.\S+/.test(em);

    if (!isValidEmail(userEmail)) {
      toast.warning("Please enter a valid user email.");
      return;
    }
    if (!isValidEmail(hrEmail)) {
      toast.warning("Please enter a valid HR email.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/feedback/send-request", { userEmail, hrEmail });
      toast.success("Feedback request sent successfully!");
      setUserEmail("");
      setHrEmail("");
    } catch (err: any) {
      // preserve server message when available
      const msg = err?.response?.data?.message || "Failed to send feedback request.";
      toast.error(msg);
      console.error("Send request error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-8"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Send Feedback Request</h2>
          <p className="text-sm text-slate-500 mt-1">Send a secure feedback link to an intern or employee.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-600 block mb-2">Employee Email (userEmail)</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="employee@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-2">HR/Requester Email (hrEmail)</label>
            <input
              value={hrEmail}
              onChange={(e) => setHrEmail(e.target.value)}
              type="email"
              placeholder="hr@company.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

            <button
              type="button"
              onClick={() => {
                setUserEmail("");
                setHrEmail("");
              }}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition"
            >
              Clear
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Tip: For Resend sandbox testing, use your own email as recipient or verify a domain for production sending.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

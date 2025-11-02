"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// ✅ Define the FeedbackItem type
type FeedbackItem = {
  _id: string;
  userEmail: string;
  hrEmail?: string;
  status: string;
  rating?: number;
  message?: string;
  createdAt: string;
  submittedAt?: string;
};

export default function FeedbackListPage() {
  // ✅ Typed states
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/feedback");
        if (!res.ok) throw new Error("Failed to fetch feedback");

        // ✅ Correctly read from { success: true, data: [...] }
        const result = await res.json();
        const data: FeedbackItem[] = result.data || [];
        console.log("✅ Fetched feedback data:", data);

        setFeedbackList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Fetch feedback error:", err);
        toast.error("Failed to load feedback list.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ✅ TEMP FIX — show all feedback to confirm data is loading
  const filtered = feedbackList; // ← replaced filter logic

  return (
    <div className="min-h-[70vh] py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            📋 Feedback Requests
          </h2>
          <div className="flex gap-2">
            {(["all", "pending", "submitted"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  filter === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Table */}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading feedback...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No feedback requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead className="bg-slate-50 text-slate-600 text-sm">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Sent</th>
                  <th className="p-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <motion.tr
                    key={f._id}
                    whileHover={{ y: -3 }}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-3 align-top">
                      <div className="font-medium text-slate-800">
                        {f.userEmail || "—"}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {f.hrEmail || ""}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          f.status?.toLowerCase().includes("submitted")
                            ? "bg-green-100 text-green-700"
                            : f.status?.toLowerCase().includes("pending")
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {f.status || "—"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-slate-600">
                      {f.createdAt
                        ? new Date(f.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-sm">
                      {f.rating ? `${f.rating}/5` : "—"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "@/lib/api"; // ✅ make sure this file exists (axios instance)

export default function FeedbackForm() {
  const { token } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing feedback link!");
      return;
    }

    setLoading(true);
    try {
      // ✅ send feedback to backend
      const res = await api.post(`/feedback/submit/${token}`, {
        name: form.name,
        feedback: form.feedback,
      });

      if (res.status === 200) {
        toast.success("Feedback submitted successfully!");
        setForm({ name: "", feedback: "" });
        router.push("/thankyou");
      } else {
        toast.error("Unexpected server response. Try again.");
      }
    } catch (err: any) {
      console.error("Error submitting feedback:", err);
      toast.error(err.response?.data?.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-blue-700 text-center mb-6">
          Submit Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.2 }}
            type="submit"
            disabled={loading}
            className={`w-full font-medium py-2 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

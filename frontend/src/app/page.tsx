"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getStatistics } from "@/lib/api";

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    submitted: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStatistics();
        setStats(res.data || res);
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      }
    };
    loadStats();
  }, []);

  return (
    <section className="min-h-[72vh] flex items-center">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Hero text */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Internship Feedback Portal
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Collect and manage feedback effortlessly — polished UI, simple workflow, and production-like UX for your internship demos.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/dashboard/send"
                className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 bg-white hover:shadow-lg transition rounded-lg"
              >
                Send Feedback
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-slate-500">Requests</div>
                <div className="text-lg font-semibold text-slate-900">{stats.total}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-slate-500">Avg Rating</div>
                <div className="text-lg font-semibold text-slate-900">{stats.avgRating?.toFixed(1) || 0}</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="text-sm text-slate-500">Submitted</div>
                <div className="text-lg font-semibold text-slate-900">{stats.submitted}</div>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-b from-white to-slate-50 border border-gray-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-500">HR Dashboard Preview</div>
                  <div className="text-lg font-semibold text-slate-900">Overview • Feedback • Requests</div>
                </div>
                <div className="text-sm text-slate-500">Live</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 text-blue-700 rounded-lg p-3 text-center">
                  <div className="text-sm">Total</div>
                  <div className="text-lg font-semibold">{stats.total}</div>
                </div>
                <div className="bg-yellow-50 text-yellow-700 rounded-lg p-3 text-center">
                  <div className="text-sm">Pending</div>
                  <div className="text-lg font-semibold">{stats.pending}</div>
                </div>
                <div className="bg-green-50 text-green-700 rounded-lg p-3 text-center">
                  <div className="text-sm">Submitted</div>
                  <div className="text-lg font-semibold">{stats.submitted}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

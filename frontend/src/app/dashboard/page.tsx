"use client";

import { useEffect, useState } from "react";
import { getStatistics } from "@/lib/api";

export default function DashboardPage() {
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
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-[70vh] p-10 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="text-slate-500 font-medium">Total Requests</div>
          <div className="text-3xl font-bold text-slate-800 mt-2">{stats.total}</div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="text-slate-500 font-medium">Pending</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="text-slate-500 font-medium">Submitted</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{stats.submitted}</div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <div className="text-slate-500 font-medium">Avg Rating</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {stats.avgRating?.toFixed(1) || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

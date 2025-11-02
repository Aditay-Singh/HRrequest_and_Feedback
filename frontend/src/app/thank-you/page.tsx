"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200 text-center"
      >
        <h1 className="text-3xl font-semibold text-blue-700 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-600 mb-8">
          Your feedback has been successfully submitted.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

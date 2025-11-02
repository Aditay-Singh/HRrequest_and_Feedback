"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-blue-600 shadow-md"
    >
      <div className="container mx-auto py-4 flex justify-center items-center">
        <h1 className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
          Internship Feedback Portal
        </h1>
      </div>
    </motion.header>
  );
}

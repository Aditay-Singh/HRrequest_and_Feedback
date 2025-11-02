"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="w-full bg-white border-t border-gray-200 mt-10"
    >
      <div className="container mx-auto py-4 flex justify-center items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Internship Feedback Portal. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

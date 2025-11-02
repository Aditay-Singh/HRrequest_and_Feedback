import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Internship Feedback Portal",
  description: "A modern HR feedback management system",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Internship Feedback Portal
          </h1>
          <nav className="space-x-4">
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
            <a href="/dashboard" className="hover:text-blue-500">
              Dashboard
            </a>
            <a href="/dashboard/send" className="hover:text-blue-500">
              Send Request
            </a>
            <a href="/dashboard/list" className="hover:text-blue-500">
              Feedback List
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto flex-grow px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-200   text-center py-4 text-sm text-gray-600">
          © 2025 Internship Feedback Portal. All rights reserved.
        </footer>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}

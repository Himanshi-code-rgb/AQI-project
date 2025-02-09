// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { FiActivity, FiClock, FiMapPin } from "react-icons/fi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-gray-900 bg-gray-50 min-h-screen transition-colors">
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <FiActivity className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AirGuard
              </span>
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <FiMapPin className="w-5 h-5" />
                <select className="bg-transparent outline-none">
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                </select>
              </div>
              
              <div className="flex gap-4">
                <Link href="/" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <FiActivity className="w-5 h-5" />
                  <span>Realtime</span>
                </Link>
                <Link href="/history" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <FiClock className="w-5 h-5" />
                  <span>History</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
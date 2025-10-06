"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = document.cookie
      .split('; ')
      .find(row => row.startsWith('isLoggedIn='))
      ?.split('=')[1];

    if (isLoggedIn === 'true') {
      router.push('/games');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comeon Test Project
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            This is Comeon Test Project.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
            Welcome to my test application. Please login to access the games.
          </p>
          <Link
            href="/login"
            className="inline-block bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

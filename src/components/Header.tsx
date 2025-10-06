"use client";

import Image from "next/image";
import { ChevronLeftIcon, SearchIcon, UserIcon } from "lucide-react";
import { useSearch, useUser } from "@/contexts";
import { MESSAGES } from "@/constants";

export const Header = () => {
  const { user, logout, isLoading } = useUser();
  const { searchQuery, setSearchQuery } = useSearch();


  if (isLoading) {
    return (
      <header className="dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-sm">C</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comeon Test Project
              </h1>
            </div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-24 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 sm:pt-8">
          {user && (
            <div className="space-y-4 lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row lg:flex-wrap gap-3">
              <div className="block lg:hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <Image
                        src={`/${user.avatar}`}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.event}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-3 hover:cursor-pointer rounded-sm transition-colors duration-200 flex items-center gap-1 text-sm"
                  >
                    <ChevronLeftIcon className="w-4 h-4" strokeWidth={3} /> {MESSAGES.LOGOUT}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={MESSAGES.SEARCH_HEADER_PLACEHOLDER}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label={MESSAGES.SEARCH_GAMES}
                    className="w-full rounded-sm border border-gray-300 dark:border-gray-600 p-2 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                </div>
              </div>

              <div className="hidden lg:block w-full">
                <div className="grid grid-cols-12 items-center w-full m-0">
                  <div className="col-span-9 flex items-center">
                    <div className="flex items-center space-x-2">
                      {user.avatar ? (
                        <Image
                          src={`/${user.avatar}`}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.event}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 relative pl-8">
                    <input
                      type="text"
                      placeholder={MESSAGES.SEARCH_HEADER_PLACEHOLDER}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label={MESSAGES.SEARCH_GAMES}
                      className="w-full rounded-sm border border-gray-300 dark:border-gray-600 p-2 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center justify-start mt-4">
                  <button
                    onClick={logout}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 hover:cursor-pointer rounded-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <ChevronLeftIcon className="w-5 h-5" strokeWidth={3} /> {MESSAGES.LOGOUT}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
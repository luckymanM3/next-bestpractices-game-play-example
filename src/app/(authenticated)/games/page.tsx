"use client";

import { GameListSkeleton, CategorySkeleton } from "@/components";
import GameCard from "@/components/GameCard";
import { useAuth, useGames } from "@/hooks";
import { MESSAGES } from "@/constants";

export default function GamesPage() {
  const { isLoading: authLoading } = useAuth();
  const {
    filteredGames,
    categories,
    isLoading,
    error,
    selectedCategory,
    selectCategory,
    retry,
    hasGames,
    hasFilteredGames
  } = useGames();

  if (isLoading || authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-top w-full m-0 gap-6 lg:gap-0">
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Games
            </h2>
            <GameListSkeleton />
          </div>
          <div className="lg:col-span-3 lg:pl-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {MESSAGES.CATEGORIES}
            </h2>
            <CategorySkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {MESSAGES.GAMES_ERROR}
          </h1>
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            {MESSAGES.RETRY}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-top w-full m-0 gap-6 lg:gap-0">
        <div className="lg:col-span-9">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Games
          </h2>
          {!hasFilteredGames ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {!hasGames ? MESSAGES.NO_GAMES_AVAILABLE : MESSAGES.NO_GAMES_FOUND}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {!hasGames
                  ? 'There are currently no games available. Please check back later.'
                  : 'Try adjusting your search or category filter.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGames.map((game) => (
                <div key={game.code}>
                  <GameCard game={game} isMobile={true} />
                  <GameCard game={game} isMobile={false} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-3 lg:pl-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {MESSAGES.CATEGORIES}
          </h2>
          <div className="border-t-2 border-gray-200 dark:border-gray-700 p-4 lg:p-6 lg:px-2 transition-colors duration-200">
            {categories.map((category) => (
              <div
                key={category.id}
                role="button"
                tabIndex={0}
                aria-label={`${MESSAGES.SELECT_CATEGORY}: ${category.name}`}
                className={`font-bold cursor-pointer p-3 lg:p-2 rounded-md lg:rounded-none hover:bg-gray-100 dark:hover:bg-gray-700 lg:hover:bg-gray-200 transition-colors duration-200 ${selectedCategory === category.id ? "bg-gray-100 dark:bg-gray-700 lg:bg-gray-200" : ""
                  }`}
                onClick={() => selectCategory(category.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCategory(category.id);
                  }
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

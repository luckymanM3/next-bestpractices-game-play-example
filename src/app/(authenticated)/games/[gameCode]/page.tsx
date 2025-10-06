"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useAuth, useGame } from "@/hooks";
import { MESSAGES, ROUTES } from "@/constants";
import { GameDetailSkeleton } from "@/components";

export default function GamePlayPage() {
  const router = useRouter();
  const params = useParams();
  const { isLoading: authLoading } = useAuth();
  const gameCode = params.gameCode as string;
  const { game, isLoading, categories, isNotFound } = useGame(gameCode);

  const handleBackToGames = () => {
    router.push(ROUTES.GAMES);
  };

  if (authLoading || isLoading) {
    return <GameDetailSkeleton />;
  }

  if (isNotFound || !game) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Game Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The game you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={handleBackToGames}
            className="bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <ChevronLeftIcon className="w-4 h-4" strokeWidth={2} />
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToGames}
              aria-label={MESSAGES.BACK_TO_GAMES}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ChevronLeftIcon className="w-5 h-5" strokeWidth={2} />
              Back to Games
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {game.name}
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="mb-4 sm:mb-6 flex justify-center">
                {game.icon ? (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto">
                    <Image
                      src={`/images/game-icon/${game.icon.split('/').pop()}`}
                      alt={game.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center hidden">
                      <span className="text-3xl sm:text-4xl">🎮</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-3xl sm:text-4xl">🎮</span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
                {game.name}
              </h2>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  About This Game
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base px-2 sm:px-0">
                  {game.description}
                </p>
              </div>

              {categories.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full"
                      >
                        {category?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  aria-label={`${MESSAGES.PLAY_GAME} ${game.name}`}
                  className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  {MESSAGES.PLAY_GAME}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3
                className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4"
                aria-label={MESSAGES.GAME_DETAILS}
              >
                Game Details
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Game Code
                  </span>
                  <p className="text-gray-900 dark:text-white font-mono">
                    {game.code}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Categories
                  </span>
                  <p className="text-gray-900 dark:text-white">
                    {categories.length} category{categories.length !== 1 ? 'ies' : 'y'}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </span>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

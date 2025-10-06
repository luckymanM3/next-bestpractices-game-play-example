import React from 'react';
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Game } from "@/types";
import { MESSAGES, ROUTES } from "@/constants";

interface GameCardProps {
  game: Game;
  isMobile?: boolean;
}

const GameCard: React.FC<GameCardProps> = React.memo(({ game, isMobile = false }) => {
  const gameIcon = game.icon ? (
    <div className={`${isMobile ? 'w-20 h-20' : 'w-40 h-20'} mx-auto relative`}>
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
      <div className={`${isMobile ? 'w-20 h-20' : 'w-20 h-20'} bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center hidden`}>
        <span className="text-2xl">🎮</span>
      </div>
    </div>
  ) : (
    <div className={`${isMobile ? 'w-20 h-20' : 'w-20 h-20'} bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto`}>
      <span className="text-2xl">🎮</span>
    </div>
  );

  if (isMobile) {
    return (
      <div
        key={game.code}
        data-testid="game-card"
        className="block lg:hidden bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 py-6 transition-colors duration-200"
      >
        <div className="rounded-lg p-4 lg:rounded-none">
          <div className="text-center mb-4">
            {gameIcon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            {game.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 text-center px-4">
            {game.description}
          </p>
          <div className="flex justify-center">
            <Link
              href={`${ROUTES.GAMES}/${game.code}`}
              aria-label={`${MESSAGES.PLAY_GAME} ${game.name}`}
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-sm transition-colors duration-200 flex items-center gap-2"
            >
              {MESSAGES.PLAY_GAME} <ChevronRightIcon className="w-4 h-4" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={game.code}
      data-testid="game-card"
      className="hidden lg:block dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 py-6 transition-colors duration-200"
    >
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0" data-testid="game-icon">
          {gameIcon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {game.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {game.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          href={`${ROUTES.GAMES}/${game.code}`}
          aria-label={`${MESSAGES.PLAY_GAME} ${game.name}`}
          className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-sm transition-colors duration-200 flex items-center gap-2"
        >
          {MESSAGES.PLAY_GAME} <ChevronRightIcon className="w-5 h-5" strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;

import { useEffect, useState } from "react";
import { Game } from "@/types";
import { useGames } from "./useGames";

export const useGame = (gameCode: string) => {
  const { games, categories } = useGames();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (games.length > 0) {
      const foundGame = games.find(g => g.code === gameCode);
      if (foundGame) {
        setGame(foundGame);
        setError("");
      } else {
        setError("Game not found");
      }
      setIsLoading(false);
    }
  }, [games, gameCode]);

  const getGameCategories = () => {
    if (!game) return [];
    return game.categoryIds.map(categoryId =>
      categories.find(cat => cat.id === categoryId)
    ).filter(Boolean);
  };

  return {
    game,
    isLoading,
    error,
    categories: getGameCategories(),
    hasGame: !!game,
    isNotFound: !isLoading && !game
  };
};

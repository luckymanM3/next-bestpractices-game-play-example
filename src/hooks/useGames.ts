import { useEffect, useState } from "react";
import { getGames, getCategories } from "@/services";
import { Game, Category, parseApiError } from "@/types";
import { useSearch } from "@/contexts";

export const useGames = () => {
  const { searchQuery } = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, categoriesData] = await Promise.all([
          getGames(),
          getCategories()
        ]);

        setGames(gamesData);
        setFilteredGames(gamesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        const parsedError = parseApiError(err);
        setError(parsedError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = games;

    if (searchQuery.trim()) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 0) {
      filtered = filtered.filter(game =>
        game.categoryIds.includes(selectedCategory)
      );
    }

    setFilteredGames(filtered);
  }, [games, searchQuery, selectedCategory]);

  const selectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const retry = () => {
    setError("");
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [gamesData, categoriesData] = await Promise.all([
          getGames(),
          getCategories()
        ]);

        setGames(gamesData);
        setFilteredGames(gamesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        const parsedError = parseApiError(err);
        setError(parsedError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return {
    games,
    filteredGames,
    categories,
    isLoading,
    error,
    selectedCategory,
    selectCategory,
    retry,
    hasGames: games.length > 0,
    hasFilteredGames: filteredGames.length > 0,
    isSearching: searchQuery.trim().length > 0,
    isFiltering: selectedCategory !== 0
  };
};

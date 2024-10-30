import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';  // Composant de pagination réutilisable

interface Game {
  id: number;
  name: string;
  // Ajoute d'autres propriétés du jeu selon ton modèle
}

interface PaginatedGames {
  games: Game[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const PaginatedGamesComponent: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaginatedGames = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<PaginatedGames>(`http://localhost:5000/games?page=${page}&limit=10`);
      setGames(response.data.games);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedGames(currentPage);
  }, [currentPage]);

  return (
    <div>
      {loading ? (
        <p>Chargement des jeux...</p>
      ) : (
        <div>
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                {game.name}
                {/* Tu peux ajouter des liens vers les jeux ou d'autres détails */}
              </li>
            ))}
          </ul>

          {/* Composant de pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default PaginatedGamesComponent;

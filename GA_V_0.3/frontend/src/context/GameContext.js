import React, { createContext, useState } from "react";
import axios from "axios";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  // Fonction pour soumettre un jeu
  const submitGame = async (gameData) => {
    const token = sessionStorage.getItem("token"); // On récupère le token d'authentification
    if (!token) {
      console.log("Aucun token trouvé, utilisateur non connecté.");
      return;
    }

    try {
      // Envoi des données du jeu avec le token pour l'autorisation
      console.log("FormData prêt à être envoyé :", gameData);
      const response = await axios.post("http://localhost:3000/api/Game/submit", gameData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      console.log("Réponse du serveur pour la soumission du jeu :", response.data);
      setGames((prevGames) => [...prevGames, response.data]); // Mise à jour de la liste des jeux avec le nouveau jeu
    } catch (err) {
      console.error("Erreur lors de la soumission du jeu :", err);
      setError("Une erreur est survenue lors de la soumission du jeu.");
    }
  };

  return (
    <GameContext.Provider value={{ games, submitGame, error }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => React.useContext(GameContext);

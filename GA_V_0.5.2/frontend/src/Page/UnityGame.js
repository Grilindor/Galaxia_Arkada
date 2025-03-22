import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UnityGame() {
  const { id: gameId } = useParams();
  const [gameUrl, setGameUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        console.log("📡 Récupération des fichiers du jeu...");
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}/files`);
        console.log("✅ Données reçues :", response.data);

        if (response.data.extractedPath) {
          setGameUrl(`http://localhost:5000/${response.data.extractedPath}/index.html`); //dernière modife ici
        } else {
          throw new Error("Chemin du jeu introuvable");
        }
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des fichiers du jeu:", err);
        setError("Erreur lors du chargement du jeu.");
      }
    };

    fetchGameData();
  }, [gameId]);

  if (error) {
    return <p>❌ {error}</p>;
  }

  if (!gameUrl) {
    return <p>⏳ Chargement du jeu...</p>;
  }

  return (
    <div>
      <h2>Jeu Unity</h2>
      <iframe
        src={gameUrl}
        title="Unity Game"
        width="100%"
        height="600px"
        style={{ border: "none" }}
      />
    </div>
  );
}

export default UnityGame;

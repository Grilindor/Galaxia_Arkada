import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UnityGame() {
  const { id: gameId } = useParams();
  const [gamePath, setGamePath] = useState(null);
  const [gameFiles, setGameFiles] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        console.log("📡 Récupération des fichiers du jeu...");
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}/files`);
        console.log("✅ Données reçues :", response.data);

        setGamePath(response.data.extractedPath);
        setGameFiles(response.data.files);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des fichiers du jeu:", err);
        setError("Erreur lors du chargement des fichiers du jeu.");
      }
    };

    fetchGameData();
  }, [gameId]);

  useEffect(() => {
    if (gamePath && gameFiles) {
      const checkGameReady = async () => {
        const url = `http://localhost:5000/${gamePath}/Build/${gameFiles.loader}`;
        try {
          console.log("🔍 Vérification de la disponibilité du fichier :", url);
          const res = await fetch(url, { method: "HEAD" });

          if (res.ok) {
            console.log("✅ Le jeu est prêt !");
            setIsReady(true);
          } else {
            throw new Error("Fichier Unity introuvable.");
          }
        } catch (err) {
          console.error("❌ Le jeu n'est pas encore disponible :", err);
          setError("Le jeu n'est pas encore disponible.");
        }
      };

      checkGameReady();
    }
  }, [gamePath, gameFiles]);

  useEffect(() => {
    if (isReady && gamePath && gameFiles) {
      console.log("🛠 Chargement du script Unity...");
      const script = document.createElement("script");
      script.src = `http://localhost:5000/${gamePath}/Build/${gameFiles.loader}`;
      script.onload = () => {
        console.log("🚀 Initialisation du jeu Unity...");
        window.createUnityInstance(document.getElementById("unity-container"), {
          dataUrl: `http://localhost:5000/${gamePath}/Build/${gameFiles.data}`,
          frameworkUrl: `http://localhost:5000/${gamePath}/Build/${gameFiles.framework}`,
          codeUrl: `http://localhost:5000/${gamePath}/Build/${gameFiles.wasm}`,
        }).catch((error) => {
          console.error("❌ Erreur lors du chargement du jeu Unity:", error);
          setError("Erreur lors du chargement du jeu.");
        });
      };
      script.onerror = () => {
        console.error("❌ Impossible de charger le script Unity.");
        setError("Impossible de charger le script Unity.");
      };

      document.body.appendChild(script);
    }
  }, [isReady, gamePath, gameFiles]);

  if (error) {
    return <p>❌ {error}</p>;
  }

  if (!gamePath || !gameFiles || !isReady) {
    return <p>⏳ Chargement du jeu...</p>;
  }

  return (
    <div>
      <h2>Jeu Unity</h2>
      <div id="unity-container" style={{ width: "100%", height: "600px" }} />
    </div>
  );
}

export default UnityGame;

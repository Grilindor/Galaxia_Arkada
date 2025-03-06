import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams } from "react-router-dom";
import axios from "axios";

function UnityGame() {
  const { id: gameId } = useParams();
  console.log("🕹️ gameId reçu :", gameId);

  const [gamePath, setGamePath] = useState(null);
  const [gameFiles, setGameFiles] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      console.log("📡 Récupération des données du jeu...");
      try {
        const response = await axios.get(`/api/games/${gameId}`);
        console.log("✅ Réponse API reçue :", response.data);

        let extractedPath = response.data.extractedPath;
        let possiblePath = `${extractedPath}/Build`;

        // On vérifie si le chemin contient bien les fichiers Unity
        const checkPath = await axios
          .get(`/api/check-path?path=${possiblePath}`)
          .catch(() => null);

        if (!checkPath) {
          console.warn("⚠️ Fichiers Unity non trouvés dans :", possiblePath);

          // On teste avec le dossier en doublon
          const doublePath = `${extractedPath}/${extractedPath
            .split("/")
            .pop()}/Build`;
          const checkDoublePath = await axios
            .get(`/api/check-path?path=${doublePath}`)
            .catch(() => null);

          if (checkDoublePath) {
            console.log("✅ Correction du chemin :", doublePath);
            extractedPath = `${extractedPath}/${extractedPath
              .split("/")
              .pop()}`;
          } else {
            console.error("❌ Aucun fichier Unity trouvé !");
          }
        }

        setGamePath(extractedPath);
        setGameFiles(response.data.files);
      } catch (error) {
        console.error(
          "❌ Erreur lors de la récupération des fichiers du jeu:",
          error
        );
      }
    };

    fetchGameData();
  }, [gameId]);

  const { unityProvider } = useUnityContext({
    loaderUrl: gameFiles ? `${gamePath}/Build/${gameFiles.loader}` : "",
    dataUrl: gameFiles ? `${gamePath}/Build/${gameFiles.data}` : "",
    frameworkUrl: gameFiles ? `${gamePath}/Build/${gameFiles.framework}` : "",
    codeUrl: gameFiles ? `${gamePath}/Build/${gameFiles.wasm}` : "",
  });

  console.log("📌 État actuel - gamePath :", gamePath);
  console.log("📌 État actuel - gameFiles :", gameFiles);

  console.log(
    "🛠️ Unity Loader URL :",
    gameFiles ? `${gamePath}/Build/${gameFiles.loader}` : "❌ Non défini"
  );
  console.log(
    "🛠️ Unity Data URL :",
    gameFiles ? `${gamePath}/Build/${gameFiles.data}` : "❌ Non défini"
  );
  console.log(
    "🛠️ Unity Framework URL :",
    gameFiles ? `${gamePath}/Build/${gameFiles.framework}` : "❌ Non défini"
  );
  console.log(
    "🛠️ Unity Code URL :",
    gameFiles ? `${gamePath}/Build/${gameFiles.wasm}` : "❌ Non défini"
  );

  if (!gamePath || !gameFiles) {
    return <p>⏳ Chargement du jeu...</p>;
  }

  return (
    <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
  );
}

export default UnityGame;

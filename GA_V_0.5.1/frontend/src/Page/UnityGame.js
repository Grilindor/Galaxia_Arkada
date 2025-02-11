import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams } from "react-router-dom";
import axios from "axios";
import JSZip from "jszip";

function UnityGame() {
  const { id } = useParams();
  const [gameFiles, setGameFiles] = useState(null);
  const [gameRoot, setGameRoot] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("🔹 Component UnityGame monté avec id :", id);

  // 🔹 Initialisation de useUnityContext
  const { unityProvider } = useUnityContext({
    loaderUrl: "",
    dataUrl: "",
    frameworkUrl: "",
    codeUrl: "",
  });

  useEffect(() => {
    if (isLoaded) return; // Empêche un second téléchargement

    console.log("🔹 useEffect[ID] déclenché, téléchargement du jeu en cours...");

    const downloadAndExtractGame = async () => {
      try {
        console.log(`🔹 Téléchargement du fichier ZIP depuis /api/games/${id}/download`);

        // 🔹 Télécharger le fichier ZIP
        const response = await axios.get(
          `http://localhost:3000/api/games/${id}/download`,
          { responseType: "arraybuffer" }
        );

        console.log("✅ Fichier ZIP téléchargé avec succès, taille :", response.data.byteLength, "octets");

        // 🔹 Décompresser le fichier ZIP avec JSZip
        const zip = await JSZip.loadAsync(response.data);
        console.log("✅ Fichier ZIP décompressé");

        const extractedFiles = {};
        let rootFolder = "";

        // 🔹 Parcourir les fichiers extraits
        await Promise.all(
          Object.keys(zip.files).map(async (filePath) => {
            if (!zip.files[filePath].dir) {
              console.log(`📂 Extraction du fichier : ${filePath}`);

              // 🔹 Détecter le dossier racine
              const parts = filePath.split("/");
              if (!rootFolder) {
                rootFolder = parts[0]; // Prend le premier dossier rencontré
                console.log("📌 Dossier racine détecté :", rootFolder);
              }

              // 🔹 Enlever le préfixe du dossier racine pour uniformiser
              const newPath = filePath.replace(`${rootFolder}/`, "");
              extractedFiles[newPath] = await zip.files[filePath].async("blob");
              console.log(`📥 Fichier extrait : ${newPath}, taille : ${extractedFiles[newPath].size} octets`);
            }
          })
        );

        console.log("✅ Extraction terminée, fichiers récupérés :", Object.keys(extractedFiles));

        // 🔹 Stocker les fichiers extraits et marquer comme chargé
        setGameRoot(rootFolder);
        setGameFiles(extractedFiles);
        setIsLoaded(true); // Éviter un re-téléchargement
      } catch (error) {
        console.error("❌ Erreur lors du téléchargement et de l'extraction du jeu :", error);
      }
    };

    downloadAndExtractGame();
  }, [id, isLoaded]); // Ajout de isLoaded pour éviter un second appel

  useEffect(() => {
    if (gameFiles) {
      console.log("🔹 useEffect[gameFiles] déclenché, configuration de Unity...");

      try {
        unityProvider.loaderUrl = URL.createObjectURL(gameFiles["Build/" + gameRoot + ".loader.js"]);
        unityProvider.dataUrl = URL.createObjectURL(gameFiles["Build/" + gameRoot + ".data"]);
        unityProvider.frameworkUrl = URL.createObjectURL(gameFiles["Build/" + gameRoot + ".framework.js"]);
        unityProvider.codeUrl = URL.createObjectURL(gameFiles["Build/" + gameRoot + ".wasm"]);

        console.log("✅ Unity chargé avec succès !");
        console.log("🔹 loaderUrl :", unityProvider.loaderUrl);
        console.log("🔹 dataUrl :", unityProvider.dataUrl);
        console.log("🔹 frameworkUrl :", unityProvider.frameworkUrl);
        console.log("🔹 codeUrl :", unityProvider.codeUrl);
      } catch (error) {
        console.error("❌ Erreur lors de la configuration de Unity :", error);
      }
    }
  }, [gameFiles, gameRoot, unityProvider]);

  if (!gameFiles) {
    console.log("⏳ En attente du chargement du jeu...");
    return <p>Chargement du jeu...</p>;
  }

  console.log("🎮 Jeu chargé, affichage de Unity...");
  return <Unity unityProvider={unityProvider} />;
}

export default UnityGame;

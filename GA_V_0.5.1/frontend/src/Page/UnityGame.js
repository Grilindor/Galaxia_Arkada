/* global createUnityInstance */
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import JSZip from "jszip";

function UnityGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileUrls, setFileUrls] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameName, setGameName] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        console.log(`🔹 Récupération des détails du jeu ID: ${id}`);
        const response = await axios.get(`http://localhost:3000/api/games/${id}`);
        setGameName(response.data.name);
        console.log(`✅ Nom du jeu récupéré : ${response.data.name}`);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération du jeu :", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  useEffect(() => {
    if (!gameName || isLoaded) return;

    const downloadAndExtractGame = async () => {
      try {
        console.log(`🔹 Téléchargement du fichier ZIP depuis /api/games/${id}/download`);
        const response = await axios.get(
          `http://localhost:3000/api/games/${id}/download`,
          { responseType: "arraybuffer" }
        );

        console.log("✅ ZIP téléchargé, taille :", response.data.byteLength, "octets");

        const zip = await JSZip.loadAsync(response.data);
        console.log("✅ ZIP décompressé");

        const urls = {};
        let rootFolder = "";

        const filePaths = Object.keys(zip.files);
        if (filePaths.length > 0) {
          rootFolder = filePaths[0].split("/")[0];
          console.log(`📌 Dossier racine détecté : ${rootFolder}`);
        } else {
          console.error("❌ Impossible de détecter le dossier racine !");
          return;
        }

        await Promise.all(
          filePaths.map(async (filePath) => {
            if (!zip.files[filePath].dir) {
              console.log(`📂 Extraction du fichier : ${filePath}`);
              const newPath = filePath.replace(`${rootFolder}/`, "");
              const fileData = await zip.files[filePath].async("arraybuffer");

              let blob;
              if (newPath.endsWith(".wasm")) {
                blob = new Blob([fileData], { type: "application/wasm" });
              } else {
                blob = new Blob([fileData]);
              }

              urls[newPath] = URL.createObjectURL(blob);
              console.log(`📥 Fichier extrait : ${newPath}, taille : ${blob.size} octets`);
            }
          })
        );

        console.log("✅ Extraction terminée, fichiers récupérés :", Object.keys(urls));

        const requiredFiles = [
          `Build/${rootFolder}.loader.js`,
          `Build/${rootFolder}.framework.js`,
          `Build/${rootFolder}.data`,
          `Build/${rootFolder}.wasm`,
        ];

        const missingFiles = requiredFiles.filter((file) => !urls[file]);

        if (missingFiles.length > 0) {
          console.error("❌ Fichiers Unity WebGL manquants !", missingFiles);
          return;
        }

        console.log("✅ Tous les fichiers Unity sont présents !");
        setFileUrls(urls);
        setIsLoaded(true);
      } catch (error) {
        console.error("❌ Erreur lors du téléchargement et de l'extraction du jeu :", error);
      }
    };

    downloadAndExtractGame();
  }, [id, gameName, isLoaded]);

  useEffect(() => {
    if (!isLoaded || Object.keys(fileUrls).length === 0) return;

    console.log("✅ Initialisation de Unity WebGL...");

    const loaderUrl = fileUrls[Object.keys(fileUrls).find(key => key.endsWith(".loader.js"))];
    const dataUrl = fileUrls[Object.keys(fileUrls).find(key => key.endsWith(".data"))];
    const frameworkUrl = fileUrls[Object.keys(fileUrls).find(key => key.endsWith(".framework.js"))];
    const codeUrl = fileUrls[Object.keys(fileUrls).find(key => key.endsWith(".wasm"))];

    if (!loaderUrl || !dataUrl || !frameworkUrl || !codeUrl) {
      console.error("❌ Fichiers Unity WebGL manquants après extraction !");
      return;
    }

    console.log("📌 Fichiers Unity détectés :", {
      loaderUrl,
      dataUrl,
      frameworkUrl,
      codeUrl,
    });

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      console.log("✅ Script Unity chargé :", loaderUrl);

      if (typeof createUnityInstance !== "function") {
        console.error("❌ createUnityInstance n'est pas encore disponible !");
        return;
      }

      createUnityInstance(canvasRef.current, {
        dataUrl,
        frameworkUrl,
        codeUrl,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Test",
        productName: "Game",
        productVersion: "1.0",
      })
        .then(() => {
          console.log("🎮 Unity instance créée avec succès !");
          navigate(`/game/loader/${id}`);
        })
        .catch((error) => {
          console.error("❌ Erreur lors de l'initialisation de Unity :", error);
        });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [fileUrls, id, isLoaded, gameName, navigate]);

  if (!isLoaded) {
    console.log("⏳ En attente du chargement du jeu...");
    return <p>Chargement du jeu...</p>;
  }

  console.log("🎮 Jeu chargé, affichage de Unity...");
  return <canvas ref={canvasRef} id="unity-canvas" width="960" height="600" />;
}

export default UnityGame;

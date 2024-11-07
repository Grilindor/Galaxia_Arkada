const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Configuration de multer pour stocker temporairement le fichier .zip
const upload = multer({ dest: "temp/" });

// Liste des fichiers attendus dans un projet Unity
const UNITY_FILES = ["index.html", "Build", "TemplateData"];

// Middleware principal pour vérifier le contenu Unity du fichier .zip
async function checkUnityZipFile(req, res, next) {
  if (!req.file) {
    console.log("Aucun fichier zip fourni");
    return res.status(400).json({ message: "No zip file provided" });
  }

  console.log("Fichier zip reçu:", req.file);
  
  const tempZipPath = req.file.path;
  const tempExtractPath = path.join(__dirname, "../temp", uuidv4()); // Dossier temporaire pour extraction

  try {
    console.log("Décompression du fichier...");
    await fs.promises.mkdir(tempExtractPath, { recursive: true });

    // Décompression du fichier
    await new Promise((resolve, reject) => {
      fs.createReadStream(tempZipPath)
        .pipe(unzipper.Extract({ path: tempExtractPath }))
        .on("finish", resolve)
        .on("error", reject);
    });

    console.log("Vérification du contenu...");
    const extractedFiles = await fs.promises.readdir(tempExtractPath);
    const isUnityProject = UNITY_FILES.every((file) => {
      const fullPath = path.join(tempExtractPath, file);
      return fs.existsSync(fullPath) || fs.lstatSync(fullPath).isDirectory();
    });

    if (!isUnityProject) {
      console.log("Le fichier zip ne contient pas les fichiers Unity requis.");
      await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
      await fs.promises.unlink(tempZipPath); // Supprime le zip temporaire
      return res
        .status(400)
        .json({ message: "Invalid Unity project structure" });
    }

    console.log("Validation réussie. Suppression des fichiers temporaires...");
    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    await fs.promises.unlink(tempZipPath); // Supprime le zip temporaire
    next(); // Passe au controller si tout est valide
  } catch (error) {
    console.error("Erreur lors de la vérification du fichier Unity:", error);
    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    await fs.promises.unlink(tempZipPath); // Supprime le zip temporaire en cas d'erreur
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  upload,
  checkUnityZipFile,
};

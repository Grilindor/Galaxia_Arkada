const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configuration de multer pour stocker temporairement le fichier .zip
const upload = multer({ dest: 'temp/' });

// Liste des fichiers attendus dans un projet Unity
const UNITY_FILES = ['index.html', 'Build', 'TemplateData'];

// Middleware principal pour vérifier le contenu Unity du fichier .zip
async function checkUnityZipFile(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: "No zip file provided" });
  }

  const tempZipPath = req.file.path;
  const tempExtractPath = path.join(__dirname, '../temp', uuidv4());

  try {
    console.log("Décompression du fichier:", tempZipPath);
    await fs.promises.mkdir(tempExtractPath, { recursive: true });

    await fs.createReadStream(tempZipPath)
      .pipe(unzipper.Extract({ path: tempExtractPath }))
      .promise();

    console.log("Vérification des fichiers extraits...");
    const extractedFiles = await fs.promises.readdir(tempExtractPath);
    console.log("Fichiers trouvés:", extractedFiles);

    const isUnityProject = UNITY_FILES.every(file => extractedFiles.includes(file));

    if (!isUnityProject) {
      console.log("Échec de la validation : fichiers Unity manquants.");
      await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
      return res.status(400).json({ message: "Invalid Unity project structure" });
    }

    console.log("Validation réussie. Suppression des fichiers temporaires...");
    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    fs.unlinkSync(tempZipPath); // Supprime le fichier zip temporaire

    next();

  } catch (error) {
    console.error("Erreur lors de la vérification du fichier Unity:", error);
    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    fs.unlinkSync(tempZipPath); // Supprime le fichier zip en cas d'erreur
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  upload,
  checkUnityZipFile
};

const multer = require("multer");
const path = require("path");

// Configuration du stockage des fichiers `.zip`
const storageZip = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Game_Files/"); // Stockage des jeux dans `Game_Files/`
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Vérification du format `.zip`
const fileFilterZip = (req, file, cb) => {
  if (
    file.mimetype === "application/zip" ||
    file.mimetype === "application/x-zip-compressed"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers .zip sont autorisés !"), false);
  }
};

/* une autre version pour controler le zip
const fileFilterZip = (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === ".zip") {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers .zip sont autorisés !"), false);
    }
};
*/

const uploadZip = multer({ storage: storageZip, fileFilter: fileFilterZip });

module.exports = uploadZip;

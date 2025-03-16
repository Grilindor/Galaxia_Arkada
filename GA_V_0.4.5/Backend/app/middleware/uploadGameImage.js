const multer = require("multer");
const path = require("path");

// Configuration du stockage des images `.png`
const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Game_Images/"); // Stockage des images dans `Game_Images/`
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

// Vérification du format `.png`
const fileFilterImage = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PNG sont autorisés !"), false);
  }
};

const uploadImage = multer({
  storage: storageImage,
  fileFilter: fileFilterImage,
});

module.exports = uploadImage;

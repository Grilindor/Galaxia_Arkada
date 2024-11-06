const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const gameController = require("../controllers/game.controller");
const { upload } = require("../middleware/CheckUnity");
const Game = require('../models/game.model');
const Tag = require('../models/Tag.model');

console.log('Game model:', Game);
console.log('Tag model:', Tag);

router.post('/submitWithTags',
  [
    authJwt.verifyToken,
    upload.single("zipFile")
  ],
  gameController.submitGameWithTags
);

module.exports = router;

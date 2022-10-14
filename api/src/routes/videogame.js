const express = require("express");
const router = express.Router();
const {
  getVideogames,
  // getNamesGames,
  getGameID,
  postGame
} = require("../controllers/videoGamesController");

router.get("/", getVideogames);
router.get("/:id", getGameID);
router.post("/share", postGame);

module.exports = router;

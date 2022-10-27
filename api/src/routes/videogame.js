const express = require("express");
const router = express.Router();
const { conn, Videogames } = require("../db");
const {
  getVideogames,
  getGameID,
  postGame
} = require("../controllers/videoGamesController");

router.get("/", getVideogames);
router.get("/:id", getGameID);
router.post("/create", postGame);

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, description, platforms, genres, released } = req.body;
  try {
    let modifique = await Videogames.update({ name, image, description, platforms, genres, released },
      { where: { id: id } }
    )
    res.status(200).send(modifique, `Videogame ${name} update successfully`)
  }
  catch (error) {
    console.log(error)
  }
})


router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  try {
    const dbGame = await Videogames.findAll({
      where: {
        id: id
      }
    })
    if (dbGame) {
      Videogames.destroy({
        where: {
          id: id
        }
      })
      return res.status(200)
    } else {
      return res.status(404).send("error")
    }
  } catch (error) {
    console.log(error)
  }
});




module.exports = router;

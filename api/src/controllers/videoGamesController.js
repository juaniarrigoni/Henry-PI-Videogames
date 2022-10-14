const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

/////-----TREAER LA DATA-----/////
const data = async () => {
  let apiGames = [];

  const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
  const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
  const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
  const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
  const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)

  apiGames = url1.data.results.concat(
    url2.data.results,
    url3.data.results,
    url4.data.results,
    url5.data.results,
  );


  apiGames = apiGames.map((game) => {
    const platforms = game.platforms.map((g) => g.platform);
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres,
      platforms: platforms,
      rating: game.rating,
      released: game.released,
    };
  });
  return apiGames;
};

const dataBase = async () => {
  return await Videogame.findAll({
    include: [Genre, Platform],
    // traigo el nombre del genero
  });
};

const getAllGames = async () => {
  const apiData = await data(); // devuelvo todo la pi
  const dbInfo = await dataBase();
  const total = apiData.concat(dbInfo);
  return total;
};

/////-----TRAER TODOS LOS VIDEOJUEGOS-----/////
const getVideogames = async (req, res) => {
  const { name } = req.query;
  let totalGames = await getAllGames();
  if (name) {
    let searchGame = totalGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    searchGame.length ?
      res.status(200).send(searchGame) :
      res.status(404).json({ msg: 'Game not Found 😕' });
  } else {
    res.status(200).json(totalGames);

  }
}

/////-----BUSCAR POR NOMBRE-----/////
const getNamesGames = async (name) => {
  try {
    let nameGame = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    let nameGames = nameGame.data.results;
    const DBGame = await Videogame.findAll({
      includes: Genre,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: [
        "name",
        "id",
        "description",
        "released",
        "rating",
        "platforms",
        "image",
        "createdInDb",
      ],
    });

    let VideoGamesNames = DBGame ? [...nameGames, ...DBGame] : [...nameGames];

    const mapGame = VideoGamesNames.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image ? el.background_image : el.image,
        rating: el.rating,
        genres: el.genres.map((e) => e.name),
        platforms: el.platforms?.map((e) =>
          e.platform?.name ? e.platform.name : e
        ),
      };
    });
    return mapGame;
  } catch (error) {
    console.log(error);
  }
};

/////-----BUSCAR POR ID-----/////
const getGameID = async (req, res) => {
  const { id } = req.params // const id = req.params.id   es lo mismo
  try {
    if (id.includes('-')) {//detectar UUID en BD
      const gameDb = await Videogame.findOne({
        where: { id },
        include: [Genre, Platform],
      });
      return res.json(gameDb);
    }
    const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    res.json(gameApi.data);

  } catch (error) {
    res.status(404).json({ error: 'Id not found 😕' });
  }
};

/////-----POST-----/////
const postGame = async (req, res) => {
  let { name, image, description, released, rating, genres, platforms, createdInDb } = req.body

  let newGame = await Videogame.create({
    name,
    image,
    description,
    released,
    rating: rating || 1,
    createdInDb
  })

  let genreDb = await Genre.findAll({
    where: { name: genres }
  })

  let platformDb = await Platform.findAll({
    where: { name: platforms }
  });

  newGame.addGenres(genreDb);
  newGame.addPlatforms(platformDb);

  res.status(200).send(`Video juego creado con exito 👌, su id es ${newGame.id}`);
}

module.exports = {
  getVideogames,
  getNamesGames,
  getGameID,
  postGame,
};

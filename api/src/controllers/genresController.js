const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

const controllerGenres = async (req, res) => {
    try {
        var arrGenres = await Genres.findAll()

        if (!arrGenres.length) {
            var genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
                .then(res => res.data.results)
                .then(response => response.map(e => e.name))
                .catch(() => "")
            for (let i = 0; i < genres.length; i++) {
                await Genres.create({ name: genres[i] })
            }
            res.send(await Genres.findAll())
        } else {
            res.send(arrGenres)
        }
    } catch (e) {
        res.send("Cannot bring the genres")
    }
}
// {
//     const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
//     const nameGenres = genresApi.data.results;

//     nameGenres.forEach(async (g) => {
//         await Genres.findOrCreate({
//             where: {
//                 name: g.name,
//             }
//         })
//     });
//     const allGenres = await Genres.findAll();
//     res.status(200).json(allGenres)
// }

module.exports = { controllerGenres }
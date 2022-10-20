const { Platforms } = require("../db")

const platformControllers = async (req, res) => {
    try {
        res.send(await Platforms.findAll())
    } catch (e) {
        res.send("Cannot bring the plataforms")
    }
}

module.exports = { platformControllers }

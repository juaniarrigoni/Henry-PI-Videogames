const { Router } = require('express');
const router = Router()
const { platformControllers } = require("../controllers/platformsController")

router.get('/', platformControllers)

module.exports = router;
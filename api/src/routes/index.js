const { Router } = require('express');
const { countryRoute } = require("../routes/country");
const activityRoute = require("./Activity.js")

const router = Router();

router.use('/countries', countryRoute)
router.use('/activities', activityRoute)

module.exports = router;

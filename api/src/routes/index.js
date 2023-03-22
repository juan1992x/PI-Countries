const { Router } = require('express');
const { countryRoute } = require('./country');  // Importar todos los routers;
const activityRoute = require('./activity');  // Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries', countryRoute) // Configurar los routers
router.use('/activities', activityRoute) // Ejemplo: router.use('/auth', authRouter);


module.exports = router;

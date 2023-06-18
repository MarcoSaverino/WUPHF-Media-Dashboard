const router = require('express').Router();

const eventRoutes = require('./event-routes');

router.use('/event', eventRoutes);

module.exports = router;
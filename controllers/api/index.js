const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const eventRoutes = require('./event-routes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/event', eventRoutes);

module.exports = router;
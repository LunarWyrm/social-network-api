const express = require('express');
const thoughtsRoutes = require('./ThoughtsRoutes');
const userRoutes = require('./UserRoutes');

const router = express.Router();

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);

module.exports = router;

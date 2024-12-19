const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const stuffRoutes = require('./stuff');

router.use('/user',userRoutes);
router.use('/stuff', stuffRoutes)

module.exports = router;
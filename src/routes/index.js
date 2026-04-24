const express = require('express');

const bookRoutes = require('./book.routes');

const router = express.Router();

router.use(bookRoutes);

module.exports = router;

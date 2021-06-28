
const express = require('express');

const router = express.Router();

const SearchControllers = require('../controllers/SearchControllers');

router.get('/', SearchControllers.search);
// GET : --------> Filter/Order apartments

router.get('/admin', SearchControllers.search);

module.exports = router;
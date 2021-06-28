
const express = require('express');

const router = express.Router();

const BookingControllers = require('../controllers/BookingControllers');

router.get('/occupancy', BookingControllers.checkOccupancy);

router.post('/new-reservation', BookingControllers.booking);
// POST /:id : ----------------------------> Book apartment



module.exports = router;


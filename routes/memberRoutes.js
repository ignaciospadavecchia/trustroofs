
const express = require('express');

const router = express.Router();

const ApartmentControllers = require('../controllers/ApartmentControllers');

router.get('/', ApartmentControllers.getApartmentsForMembers);
// GET / : -----------------------------> Get all apartments

router.get('/apartment/:idApartment', ApartmentControllers.details);
// GET /:id : Get single apartment -----> Detail / Booking Form View

module.exports = router;

const express = require('express');

const router = express.Router();

const ApartmentControllers = require('../controllers/ApartmentControllers');

// (!) All routes prefixed with admin/

router.get('/', ApartmentControllers.getApartmentsForAdmins);
// GET / : -----------------------------> Get all apartments

router.get('/apartment/:idApartment', ApartmentControllers.editForm);
// GET /:id : Get single apartment ---------> Edit/ Update Form View

router.post('/apartment/:idApartment', ApartmentControllers.addApartment);
// POST /:id : ------------------------------------------> Edit / Update

router.get('/add-new', ApartmentControllers.addApartmentForm);
// GET / : --------------------------> Add / Create Form View

router.post('/add-new', ApartmentControllers.addApartment);
// POST / : ------------------> Add / Create new apartment

router.get('/apartment/:idApartment/deactivate', ApartmentControllers.delete);
// GET(DELETE) /:id : ------------------------> Deregister("delete") / Recover

router.get("/apartment/:idApartment/reactivate"), async (req,res) => {
    
    const {idApartment} = req.params;

    const Apartment = await Apartment.findById(idApartment);
    
    Apartment.pull({deregistered});
    
    await Apartment.save();

    res.redirect("/admin");
}

module.exports = router;
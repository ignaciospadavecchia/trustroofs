const express = require("express");

const mongoose = require("mongoose");

const Apartment = require("../models/ApartmentModel");

// router.get('/',      ( for Members )
exports.getApartmentsForMembers = async (req, res) => {
  
  const allApartments = await Apartment.find({deregistered: { $exists: false }});

  res.render("pages/index", {
    apartments: allApartments,
    mainPhoto: "",
    feedback:"",
    userType: "member",
    admin: true,
    member: true,
    filters: {},
  });
};

// router.get('/apartments/:idApartment',   ( for Members )
exports.details = async (req, res) => {

  const { idApartment } = req.params;

  const singleApartment = await Apartment.findById(idApartment);

  console.log(singleApartment.contact);

  res.render("pages/detail", {
    apartment: singleApartment,
    userType: "member",
    feedback: "",
    admin: true,
    member: true,
    filters: {},  
  });

};

// router.get('/ ,    ( for ADMINS )
exports.getApartmentsForAdmins = async (req, res) => {
  const allApartments = await Apartment.find({
    deregistered: { $exists: false },
  });

  res.render("pages/index", {
    apartments: allApartments,
    mainPhoto: "",
    feedback: "",
    userType: "admin",
    admin: true,
    member: true,
    filters: {},
  });
};

// router.get('/add-new',   ( for ADMINS )
exports.addApartmentForm = (req, res) => {
 
  res.render("pages/add-apartment", {
    apartment: {},
    userType: "admin",
    admin: true,
    member: true,
    filters: {},
  });
};

// router.GET('/apartments/:idApartment',    ( for ADMINS )
exports.editForm = async (req, res) => {
  const { idApartment } = req.params;

  const apartmentToEdit = await Apartment.findById(idApartment);

  res.render("pages/edit", {
    apartment: apartmentToEdit,
    feedback: "",
    userType: "admin",
    admin: true,
    member: true,
    filters: {},
  });
};

// router.post('/add-new'   ( for ADMINS )
exports.addApartment = async (req, res) => {
  const { idApartment } = req.body;

  // If exists, edit
  if (idApartment) {
    const { 
      title, 
      description,
      rules,
      payment,
      price, 
      size, 
      mainPhoto,
      mainPhotoCap, 
      photo1, 
      photo1Cap,
      photo2, 
      photo2Cap,
      photo3, 
      photo3Cap,
      maxPeople,
      bathrooms,
      beds, 
      checkInFrom,
      checkOutUntil,
      shower,
      wifi,
      tv,
      kitchen,
      heating,
      accesible,
      contactName,
      phone, 
      address,
      email,
      province,
      city,
      gpsLon,
      gpsLat,
    } = req.body;

    const query = { _id: idApartment };

    const update = {
      $set: {
        title, 
        description,
        rules,
        payment,
        price, 
        size, 
        mainPhoto,
        mainPhotoCap, 
        photo1, 
        photo1Cap,
        photo2, 
        photo2Cap,
        photo3,
        photo3Cap,
        maxPeople,
        bathrooms,
        beds, 
        checkInFrom,
        checkOutUntil,
        services: {
          shower : shower,
          wifi : wifi,
          tv : tv,
          kitchen : kitchen,
          heating : heating,
          accesible : accesible,
        },
        contact:{
          contactName : contactName,
          phone : phone,
          address : address,
          email : email,
        },
        location:{
          province : province,
          city : city,
          gps: [
            gpsLat,
            gpsLon,
            ] ,       
        },
      },
    };

    const options = { upsert: false };

    let apartment = Apartment.updateOne(query, update, options)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(`Successfully edited the apartment.`);
        }
      })
      .catch((err) => console.error(`Failed to edit the apartment: ${err}`));

      const allApartments = await Apartment.find({deregistered: { $exists: false },
      });

    res.render("pages/index", {
      apartment: apartment,
      apartments: allApartments,
      filters: {},
      feedback: "Apartamento editado con éxito.",
      userType: "admin",
      admin: true,
      member: true,
    });
  }
  
  // If new, add
  else {
    const { 
      title, 
      description,
      rules,
      payment,
      price, 
      size, 
      mainPhoto,
      mainPhotoCap, 
      photo1, 
      photo1Cap,
      photo2, 
      photo2Cap,
      photo3, 
      photo3Cap,
      maxPeople,
      bathrooms,
      beds, 
      checkInFrom,
      checkOutUntil,
      shower,
      wifi,
      tv,
      kitchen,
      heating,
      accesible,
      contactName,
      phone, 
      address,
      email,
      province,
      city,
      gpsLat,
      gpsLon,
    } = req.body;

    const apartment = new Apartment({
      title, 
      description,
      rules,
      payment,
      price, 
      size, 
      mainPhoto,
      mainPhotoCap, 
      photo1, 
      photo1Cap,
      photo2, 
      photo2Cap,
      photo3,
      photo3Cap,
      maxPeople,
      bathrooms,
      beds, 
      checkInFrom,
      checkOutUntil,
      services: {
        shower : shower,
        wifi : wifi,
        tv : tv,
        kitchen : kitchen,
        heating : heating,
        accesible : accesible,
      },
      contact:{
        contactName : contactName,
        phone : phone,
        address : address,
        email : email,
      },
      location:{
        province : province,
        city : city,
        gps: [
          gpsLat,
          gpsLon,
          ] ,       
        },
    });
    await apartment.save();

    const allApartments = await Apartment.find({
      deregistered: { $exists: false },
    });

    res.render("pages/index", {
      apartments: allApartments,
      mainPhoto: "  ",
      filters: {},
      feedback: "Apartamento creado con éxito",
      userType: "admin",
      admin: true,
      member: true,
    });
  }
};

// router.get('/apartment/:idApartment/deactivate'   ( for ADMINS )
exports.delete = async (req, res) => {
  const { idApartment } = req.params;

  const apartment = await Apartment.findById(idApartment);

  apartment.deregistered = Date();

  await apartment.save();

  const allApartments = await Apartment.find({deregistered: { $exists: false }
  });

  res.render("pages/index", {
    apartments: allApartments,
    mainPhoto: " ",
    feedback: "",
    userType: "admin",
    admin: true,
    member: true,
    feedback: `El apartamento ${idApartment} ha sido dado de baja.`,
    filters: {},
  });
};


const express = require('express');

const mongoose = require('mongoose');

const Booking = require('../models/BookingModel');

const Apartment = require('../models/ApartmentModel');

exports.booking = async (req, res) => {

    const { 
        idApartment,
        checkIn,
        checkOut,
        Adults,
        Kids,
    } = req.body;

    // New reservation as an instance of the Booking model
    const newBooking = new Booking({
        idApartment,
        checkIn,
        checkOut,
        Adults, 
        Kids,
    })

    const confirmed = await newBooking.save();

    res.render("pages/confirm", {
        confirmed: confirmed,
        feedback: "¡Ha realizado su reserva exitosamente!",
        checkIn,
        checkOut,
        Kids, 
        Adults,
        userType: "member",
        admin: true,
        member: true,
        });
 

}

exports.checkOccupancy = async (req, res) => {
    
    const { idApartment, checkIn, checkOut } = req.query;


    // Checking if queried dates are impossible dates ...
    if(checkIn, checkOut) {

        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.render('pages/index', {
                apartments: [],
                filters: "",
                feedback: "Por favor indique una fecha de check in anterior a su fecha de check out",
                userType:"member",  
                member: true,
                admin: true,
            })
        }  
    }

    // Checking all booked dates ...
	const bookedDates = await Booking.find({
        $or:[ 
        {checkIn: {$gte: new Date(checkIn), $lte: new Date(checkOut)}},
        {checkOut: {$gte: new Date(checkIn), $lte: new Date(checkOut)}},
        {$and: [{checkIn: {$lt: new Date(checkIn)}}, {checkOut: {$gt: new Date(checkOut)}} ]}
        ]
    })

    // If no booked dates 
    if ( bookedDates.length == 0 || bookedDates == undefined ) {
               
        const allApartments = await Apartment.find({deregistered: { $exists: false }}); 

        res.render("pages/index", {
            apartments: allApartments,
            mainPhoto: " ",
            feedback: "",
            userType: "member",
            admin: true,
            member: true,
            feedback: ` Los apartamentos listados debajo se encuentran disponibles entre las fechas ${checkIn} y ${checkOut}.`,
            filters: {},
          });
     
    // Dates are booked, rendering a list of available dates ...    
    } else if ( bookedDates.length >= 1 ) {

        let nonAvailables = []
        console.log(bookedDates)

        // Agrego un identificador a los reservados para no mostrarlos
        bookedDates.forEach(element => { 
            
            nonAvailables = element.idApartment 
        });

        //await nonAvailables.save();

        console.log(nonAvailables)
        
        const availableApartments = await Apartment.find({ _id:{$nin: nonAvailables}});

          res.render("pages/index", {
            apartments: availableApartments,
            mainPhoto: " ",
            feedback: "",
            userType: "member",
            admin: true,
            member: true,
            feedback: ` Los siguientes apartamentos se encuentran disponibles entre las fechas ${checkIn} y ${checkOut}.`,
            filters: {},
          });
    }

    
}


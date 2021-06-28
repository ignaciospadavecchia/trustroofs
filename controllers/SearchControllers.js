
const express = require('express');

const mongoose = require('mongoose');

const Apartment = require('../models/ApartmentModel');

const Booking = require('../models/BookingModel');

// @desc        Search in Apartments and Filters by Price, Capacity, Province, City.
// @route       GET router.get('/search', callback  ( by Price )
// @controller       
exports.search = async (req, res) => {
  
    const { idApartment, price, maxPeople, city, province } = req.query;
   
    let query = {};

    let filters = {};

    // Search by Capacity ( apartments that match maxPeople apartments or more )

    if (maxPeople) {
        query.maxPeople = { $gte: maxPeople };
    }

    // Search by City

    if (city) {
        query = {"location.city":city};
        filters.city = city;
    }

    // Search by Province

    if (province) {
        query = {"location.province" : province};
        filters.province = province;
    }

    // Search by Budget (Price)

    if(price) {
        query.price = { $lte: price };
        filters.price = price;
    }   

    const filteredApartments = await Apartment.find(query);

    res.render('pages/index', {
        apartments: filteredApartments,
        filters: filters,
        feedback : "",
        userType:"member",  
        member: true,
        admin: true,
    })
}



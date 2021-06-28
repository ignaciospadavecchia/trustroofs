const mongoose = require("mongoose");

// How an apartment must be
const apartmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  rules: String,
  price: Number,
  payment: Array,
  size: Number,
  mainPhoto: String,
  mainPhotoCap: String,
  photo1: String,
  photo1Cap: String,
  photo2: String,
  photo2Cap: String,
  photo3: String,
  photo3Cap: String,
  maxPeople: Number,
  bathrooms: Number,
  beds: Number,
  checkInFrom: String,
  checkOutUntil: String,
  services: Object,
  contact: Object,
  location: Object,
  deregistered: Date,
});

// Apply Schema to a Collection
const Apartment = mongoose.model("Apartments", apartmentSchema);

// Export
module.exports = Apartment;

// Schema completo
/* const apartmentSchema = new mongoose.Schema({
    //_id: {},
    title: {
        type: String,
        required: [true, 'Por favor, añada un título'],
        trim: true,
        maxlength: [30, 'El título puede contener hasta 30 caractéres.']
      },
    description: String,
    rulesDescription: String,
    rulesTags: {
        Smoking: Boolean,
        Pets: Boolean,
    },
    beds: Number,
    bathRooms: Number,
    mainPhoto: String,
    photo1: String,
    photo2: String,
    photo3: String,
    price: {
        type: Number,
        default: 0,
    },
    size: {
        type: Number,
        default: 0,
    },
    services: {
        ac: Boolean,
        heating: Boolean,
        reducedMobility: Boolean,
        tv: Boolean,
        kitchen: Boolean,
        wifi: Boolean,
        iron: Boolean,
    },
    deregistered: Date,
    date: {
        type: Date,
        default: new Date()
    },
    location: {
        formattedAddress: String,
        street: String,
        city: String,
        province: String,
        zipcode: String,
        country: String,
        gps:Number,
      },
    reservations: [
        {
            start: Date,
            end: Date,
        }
    ],
    hidden: Boolean,
}) */


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  idApartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartments" },
  checkIn: Date,
  checkOut: Date,
  Adults: Number,
  Kids: Number,
  /*  payment: Array, */
  /* isReserved: Boolean, */
});

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports = Booking;

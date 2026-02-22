const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  passengerPhone: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

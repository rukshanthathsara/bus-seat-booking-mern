const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
});

module.exports = mongoose.model("Seat", seatSchema);

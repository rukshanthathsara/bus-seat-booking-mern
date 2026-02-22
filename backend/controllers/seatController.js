const Seat = require("../models/Seat");

// Create seats for a schedule (2×2 layout example - extended rows)
const createSeatsForSchedule = async (scheduleId) => {
  const rows = ["A", "B", "C", "D", "E", "F"]; // 6 rows
  const seatLayout = [];

  rows.forEach((row) => {
    seatLayout.push(`${row}1`);
    seatLayout.push(`${row}2`);
  });

  const seats = seatLayout.map((seat) => ({
    scheduleId,
    seatNumber: seat,
  }));

  await Seat.insertMany(seats);
};

// Get seats for a schedule
// GET /api/seats/:scheduleId
const getSeatsBySchedule = async (req, res) => {
  try {
    const seats = await Seat.find({ scheduleId: req.params.scheduleId });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSeatsForSchedule,
  getSeatsBySchedule,
};
const express = require("express");
const router = express.Router();

const {
  bookSeat,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// User books seat
router.post("/", protect, bookSeat);

//User delete booking
router.delete("/:id", protect, cancelBooking);

// User views own bookings
router.get("/my", protect, getMyBookings);

// Admin views all bookings
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;

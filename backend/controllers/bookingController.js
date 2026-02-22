const Booking = require("../models/Booking");
const Seat = require("../models/Seat");

// Generate simple booking ID
const generateBookingId = () => {
  return "BK" + Date.now();
};

// Book multiple seats (USER ONLY)
const bookSeat = async (req, res) => {
  try {
    const {
      scheduleId,
      seatNumbers, // changed from seatNumber to seatNumbers (array)
      passengerName,
      passengerPhone,
    } = req.body;

    if (
      !scheduleId ||
      !seatNumbers ||
      seatNumbers.length === 0 ||
      !passengerName ||
      !passengerPhone
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const createdBookings = [];

    for (let seatNumber of seatNumbers) {
      // Check seat availability
      const seat = await Seat.findOne({ scheduleId, seatNumber });

      if (!seat) {
        return res.status(404).json({
          message: `Seat ${seatNumber} not found`,
        });
      }

      if (seat.status === "booked") {
        return res.status(400).json({
          message: `Seat ${seatNumber} already booked`,
        });
      }

      // Create booking for each seat
      const booking = await Booking.create({
        userId: req.user._id,
        scheduleId,
        seatNumber,
        passengerName,
        passengerPhone,
        bookingId: generateBookingId(),
      });

      // Lock seat
      seat.status = "booked";
      await seat.save();

      createdBookings.push(booking);
    }

    res.status(201).json({
      message: "Seats booked successfully",
      bookings: createdBookings,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/bookings/:id
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Make seat available again
    await Seat.findOneAndUpdate(
      {
        scheduleId: booking.scheduleId,
        seatNumber: booking.seatNumber,
      },
      { status: "available" }
    );

    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: "scheduleId",
        populate: { path: "routeId" },
      });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "scheduleId",
        populate: { path: "routeId" },
      });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookSeat,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};
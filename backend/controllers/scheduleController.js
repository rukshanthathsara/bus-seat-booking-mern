const Schedule = require("../models/Schedule");
const { createSeatsForSchedule } = require("./seatController");


// Add a new schedule (Admin action)
const addSchedule = async (req, res) => {
  try {
    const { routeId, travelDate, departureTime } = req.body;

    if (!routeId || !travelDate || !departureTime) {
      return res.status(400).json({
        message: "Route, date, and time are required",
      });
    }

    const schedule = new Schedule({
      routeId,
      travelDate,
      departureTime,
    });

    //create seats automatically
    await createSeatsForSchedule(schedule._id)

    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/schedules/:id
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await schedule.deleteOne();

    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("routeId");
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get schedules by route
const getSchedulesByRoute = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      routeId: req.params.routeId,
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSchedule,
  getSchedulesByRoute,
  getAllSchedules,
   deleteSchedule,
};

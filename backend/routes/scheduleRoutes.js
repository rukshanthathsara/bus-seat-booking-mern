const express = require("express");
const router = express.Router();

const {
  addSchedule,
  getSchedulesByRoute,
  getAllSchedules,
  deleteSchedule,
} = require("../controllers/scheduleController");

// IMPORTANT: specific route first
router.get("/route/:routeId", getSchedulesByRoute);

// get all schedules
router.get("/", getAllSchedules);

// add schedule
router.post("/", addSchedule);

// delete schedule
router.delete("/:id", deleteSchedule);

module.exports = router;
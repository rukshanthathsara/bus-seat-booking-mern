const express = require("express");
const router = express.Router();

const { getSeatsBySchedule } = require("../controllers/seatController");

router.get("/:scheduleId", getSeatsBySchedule);

module.exports = router;

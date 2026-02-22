const express = require("express");
const router = express.Router();

const {
  addRoute,
  getRoutes,
  deleteRoute
} = require("../controllers/routeController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin adds routes
router.post("/", protect, adminOnly, addRoute);

//Admin delete routes
router.delete("/:id", protect, adminOnly, deleteRoute);

// Anyone can view routes
router.get("/", getRoutes);

module.exports = router;

const Route = require("../models/Route");

// @desc    Add a new bus route
// @route   POST /api/routes
// @access  Admin
const addRoute = async (req, res) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To are required" });
    }

    const route = new Route({ from, to });
    const savedRoute = await route.save();

    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete Route
// @route /api/routes/:id
// @access  Admin
const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    await route.deleteOne();

    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRoute,
  getRoutes,
  deleteRoute,
};

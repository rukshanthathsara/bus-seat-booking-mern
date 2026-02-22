import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [bookings, setBookings] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [routeId, setRouteId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fetchData = async () => {
    try {
      const bookingsRes = await api.get("/bookings");
      const routesRes = await api.get("/routes");
      const schedulesRes = await api.get("/schedules");

      setBookings(bookingsRes.data);
      setRoutes(routesRes.data);
      setSchedules(schedulesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Stats
  const totalRoutes = routes.length;
  const totalSchedules = schedules.length;
  const totalBookings = bookings.length;
  const totalSeatsSold = bookings.length;

  const handleCreateRoute = async (e) => {
    e.preventDefault();
    await api.post("/routes", { from, to });
    setFrom("");
    setTo("");
    fetchData();
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    await api.post("/schedules", {
      routeId,
      travelDate: date,
      departureTime: time,
    });
    setRouteId("");
    setDate("");
    setTime("");
    fetchData();
  };

  const handleDeleteRoute = async (id) => {
    await api.delete(`/routes/${id}`);
    fetchData();
  };

  const handleDeleteSchedule = async (id) => {
    await api.delete(`/schedules/${id}`);
    fetchData();
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <button onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActiveTab("routes")}>
          Routes
        </button>

        <button onClick={() => setActiveTab("schedules")}>
          Schedules
        </button>

        <button onClick={() => setActiveTab("bookings")}>
          Bookings
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-content">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>

            <div className="stats-container">
              <div className="stat-card">
                <h3>{totalRoutes}</h3>
                <p>Total Routes</p>
              </div>

              <div className="stat-card">
                <h3>{totalSchedules}</h3>
                <p>Total Schedules</p>
              </div>

              <div className="stat-card">
                <h3>{totalBookings}</h3>
                <p>Total Bookings</p>
              </div>

              <div className="stat-card">
                <h3>{totalSeatsSold}</h3>
                <p>Seats Sold</p>
              </div>
            </div>
          </>
        )}

        {/* ROUTES */}
        {activeTab === "routes" && (
  <>
    <h2>Manage Routes</h2>

    <form onSubmit={handleCreateRoute} className="admin-form">
      <input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
      />
      <input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <button type="submit">Add Route</button>
    </form>

    <table className="admin-table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => (
          <tr key={route._id}>
            <td>{route.from}</td>
            <td>{route.to}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => handleDeleteRoute(route._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}
        {activeTab === "schedules" && (
  <>
    <h2>Manage Schedules</h2>

    <form onSubmit={handleCreateSchedule} className="admin-form">
      <select
        value={routeId}
        onChange={(e) => setRouteId(e.target.value)}
        required
      >
        <option value="">Select Route</option>
        {routes.map((route) => (
          <option key={route._id} value={route._id}>
            {route.from} → {route.to}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <button type="submit">Add Schedule</button>
    </form>

    <table className="admin-table">
      <thead>
        <tr>
          <th>Route</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => (
          <tr key={schedule._id}>
            <td>
              {schedule.routeId?.from} → {schedule.routeId?.to}
            </td>
            <td>{schedule.travelDate}</td>
            <td>{schedule.departureTime}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => handleDeleteSchedule(schedule._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

  {activeTab === "bookings" && (
  <>
    <h2>All Bookings</h2>

    <table className="admin-table">
      <thead>
        <tr>
          <th>Passenger</th>
          <th>Seat</th>
          <th>Route</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td>{booking.passengerName}</td>
            <td>{booking.seatNumber}</td>
            <td>
              {booking.scheduleId?.routeId?.from} →
              {booking.scheduleId?.routeId?.to}
            </td>
            <td>{booking.scheduleId?.travelDate}</td>
            <td>{booking.scheduleId?.departureTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}
    </div>
  </div>
 );
}

export default AdminDashboard;
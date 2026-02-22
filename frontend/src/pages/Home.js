import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { isLoggedIn } from "../utils/auth";
import "./Home.css";

function Home() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get("/routes");
        setRoutes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutes();
  }, []);

  const handleRouteClick = (routeId) => {
    navigate(`/route/${routeId}`);
  };

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Travel Smart, Travel Easy</h1>
          <p>Book bus tickets instantly with a modern seat booking system.</p>

          <button
            className="hero-btn"
            onClick={() => {
              if (isLoggedIn()) {
                navigate("/my-bookings");
              } else {
                navigate("/login");
              }
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* ROUTES SECTION */}
      <section className="routes-section">
        <h2>Available Routes</h2>

        <div className="routes-grid">
          {routes.map((route) => (
            <div
              key={route._id}
              className="route-card"
              onClick={() => handleRouteClick(route._id)}
            >
              <h3>{route.from} → {route.to}</h3>
              <p>Click to view schedules</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>⚡ Instant Booking</h3>
            <p>Reserve seats in seconds with real-time availability.</p>
          </div>

          <div className="feature-card">
            <h3>💺 Smart Seat Selection</h3>
            <p>Select your preferred seat with interactive layout.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure System</h3>
            <p>Protected with JWT authentication and admin control.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
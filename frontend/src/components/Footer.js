import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>BusBook</h3>
          <p>
            A modern bus seat booking system built with the MERN stack.
            Travel smart and book your seats easily.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@busbook.com</p>
          <p>Phone: +94 77 123 4567</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BusBook. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
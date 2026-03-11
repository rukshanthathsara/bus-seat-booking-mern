import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, isAdmin, logout } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        BusBooking Change
      </div>

      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          Home
        </Link>

        {isLoggedIn() && (
          <Link
            to="/my-bookings"
            className={`nav-link ${isActive("/my-bookings")}`}
          >
            My Bookings
          </Link>
        )}

        {isAdmin() && (
          <Link
            to="/admin"
            className={`nav-link ${isActive("/admin")}`}
          >
            Admin
          </Link>
        )}

        {!isLoggedIn() ? (
          <>
            <Link
              to="/login"
              className={`nav-link ${isActive("/login")}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`nav-link ${isActive("/register")}`}
            >
              Register
            </Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
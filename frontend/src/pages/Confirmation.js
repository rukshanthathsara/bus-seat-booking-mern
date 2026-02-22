import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="confirmation-container">
        <h2>No booking information found.</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">

        <div className="success-icon">✔</div>

        <h2>Booking Confirmed!</h2>
        <p className="confirmation-subtext">
          Your seat has been successfully reserved.
        </p>

        <div className="booking-details">
          <div className="detail-row">
            <span>Passenger</span>
            <strong>{booking.passengerName}</strong>
          </div>

          <div className="detail-row">
            <span>Seat</span>
            <strong>{booking.seatNumber}</strong>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <strong>{booking.scheduleId?.travelDate}</strong>
          </div>

          <div className="detail-row">
            <span>Time</span>
            <strong>{booking.scheduleId?.departureTime}</strong>
          </div>

          <div className="detail-row">
            <span>Route</span>
            <strong>
              {booking.scheduleId?.routeId?.from} →{" "}
              {booking.scheduleId?.routeId?.to}
            </strong>
          </div>
        </div>

        <div className="confirmation-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default Confirmation;
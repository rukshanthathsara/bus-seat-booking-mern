import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="mybookings-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">

              <div className="route-title">
                {booking.scheduleId?.routeId?.from} →
                {booking.scheduleId?.routeId?.to}
              </div>

              <div className="booking-info">
                <div>
                  <span>Date</span>
                  <strong>{booking.scheduleId?.travelDate}</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>{booking.scheduleId?.departureTime}</strong>
                </div>

                <div>
                  <span>Seat</span>
                  <strong>{booking.seatNumber}</strong>
                </div>

                <div>
                  <span>Passenger</span>
                  <strong>{booking.passengerName}</strong>
                </div>
              </div>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
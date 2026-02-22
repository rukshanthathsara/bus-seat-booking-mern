import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Booking.css";

function Booking() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchSeats = async () => {
    try {
      const res = await api.get(`/seats/${scheduleId}`);
      setSeats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
          alert("Please select at least one seat");
    return;
    }

    try {
      const res = await api.post("/bookings", {
        scheduleId,
        seatNumbers: selectedSeats,
        passengerName: name,
        passengerPhone: phone,
      });

      navigate("/confirmation", { state: res.data.booking });
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-container">

      {/* LEFT SIDE - FORM */}
      <div className="booking-form-card">
        <h2>Passenger Details</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>

      {/* RIGHT SIDE - SEATS */}
      <div className="seat-layout-card">
        <h2>Select Your Seat</h2>

        <div className="bus-layout">
          {seats.map((seat) => (
            <div
              key={seat._id}
              className={`seat 
                ${seat.status === "booked" ? "booked" : ""} 
               ${selectedSeats.includes(seat.seatNumber) ? "selected" : ""}
              `}
              onClick={() => {
  if (seat.status === "booked") return;

  if (selectedSeats.includes(seat.seatNumber)) {
    // Unselect seat
    setSelectedSeats(
      selectedSeats.filter(
        (s) => s !== seat.seatNumber
      )
    );
  } else {
    // Select seat
    setSelectedSeats([...selectedSeats, seat.seatNumber]);
  }
}}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>

        <div className="seat-legend">
          <div><span className="legend available"></span> Available</div>
          <div><span className="legend selected"></span> Selected</div>
          <div><span className="legend booked"></span> Booked</div>
        </div>
      </div>

    </div>
  );
}

export default Booking;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./RouteSchedules.css";


function RouteSchedules() {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await api.get(`/schedules/route/${routeId}`);
        setSchedules(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedules();
  }, [routeId]);

  return (
    <div className="route-schedules-container">
      <h2>Available Schedules</h2>

      {schedules.length === 0 ? (
        <p>No schedules available for this route.</p>
      ) : (
        <div className="schedule-grid">
          {schedules.map((schedule) => (
            <div key={schedule._id} className="schedule-card">
              <h3>{schedule.travelDate}</h3>
              <p>Departure: {schedule.departureTime}</p>

              <button
                onClick={() =>
                  navigate(`/book/${schedule._id}`)
                }
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RouteSchedules;
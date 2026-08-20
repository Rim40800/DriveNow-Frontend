import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import formatDate from "../utils/formatDate.js";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(
          "/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Could not load bookings"
        );
      }
    };

    getMyBookings();
  }, []);

  return (
    <main className="bookings-page">
      <section className="bookings-heading">
        <span className="section-label">
          Your Reservations
        </span>

        <h1>My Bookings</h1>

        <p>
          Review your requested rental periods, total
          prices and current booking status.
        </p>
      </section>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!error && bookings.length === 0 && (
        <section className="empty-bookings">
          <span>DriveNow</span>
          <h2>No bookings yet</h2>
          <p>
            Explore our premium fleet and request your
            first vehicle.
          </p>

          <Link className="primary-button" to="/cars">
            Explore Cars
          </Link>
        </section>
      )}

      <section className="bookings-list">
        {bookings.map((booking, index) => (
          <article
            className="booking-item"
            key={booking.id}
          >
            <div className="booking-item-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="booking-item-main">
              <span className="booking-reference">
                Booking #{booking.id}
              </span>

              <h2>
                {booking.brand} {booking.model}
              </h2>

              <div className="booking-dates">
                <div>
                  <span>Start date</span>
                  <strong>
                    {formatDate(booking.start_date)}
                  </strong>
                </div>

                <div className="booking-date-line" />

                <div>
                  <span>End date</span>
                  <strong>
                    {formatDate(booking.end_date)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="booking-item-summary">
              <span
                className={`booking-status status-${booking.status}`}
              >
                {booking.status}
              </span>

              <div className="booking-total">
                <span>Total price</span>
                <strong>
                  €{booking.total_price}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default MyBookings;
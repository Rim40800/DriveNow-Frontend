import { useEffect, useState } from "react";
import api from "../services/api.js";
import AdminCars from "../components/AdminCars.jsx";
import AdminContacts from "../components/AdminContacts.jsx";
import formatDate from "../utils/formatDate.js";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const getBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load bookings"
      );
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getBookings();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not update booking"
      );
    }
  };

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  return (
    <main className="admin-page">
      <section className="admin-heading">
        <div>
          <span className="section-label">
            DriveNow Management
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage booking requests, vehicles and
            customer messages from one place.
          </p>
        </div>

        <span className="admin-badge">
          Administrator
        </span>
      </section>

      <section className="admin-statistics">
        <article>
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </article>

        <article>
          <span>Pending</span>
          <strong>{pendingBookings}</strong>
        </article>

        <article>
          <span>Accepted</span>
          <strong>{acceptedBookings}</strong>
        </article>

        <article>
          <span>Rejected</span>
          <strong>{rejectedBookings}</strong>
        </article>
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span>Booking Management</span>
            <h2>Booking Requests</h2>
          </div>

          <p>{bookings.length} requests</p>
        </div>

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!error && bookings.length === 0 && (
          <p className="admin-empty-message">
            There are currently no booking requests.
          </p>
        )}

        <div className="admin-bookings">
          {bookings.map((booking) => (
            <article
              className="admin-booking-card"
              key={booking.id}
            >
              <div className="admin-booking-top">
                <div>
                  <span>
                    Booking #{booking.id}
                  </span>

                  <h3>
                    {booking.brand} {booking.model}
                  </h3>
                </div>

                <span
                  className={`booking-status status-${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="admin-booking-grid">
                <div>
                  <span>Customer</span>
                  <strong>{booking.user_name}</strong>
                  <small>{booking.user_email}</small>
                </div>

                <div>
                  <span>Rental period</span>
                  <strong>
                    {formatDate(booking.start_date)}
                  </strong>
                  <small>
                    to {formatDate(booking.end_date)}
                  </small>
                </div>

                <div>
                  <span>Total price</span>
                  <strong>
                    €{booking.total_price}
                  </strong>
                </div>
              </div>

              <div className="admin-booking-actions">
                <button
                  className="accept-button"
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "accepted"
                    )
                  }
                  disabled={
                    booking.status === "accepted"
                  }
                >
                  Accept
                </button>

                <button
                  className="reject-button"
                  onClick={() =>
                    updateStatus(
                      booking.id,
                      "rejected"
                    )
                  }
                  disabled={
                    booking.status === "rejected"
                  }
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <AdminCars />
      </section>

      <section className="admin-section">
        <AdminContacts />
      </section>
    </main>
  );
};

export default AdminDashboard;
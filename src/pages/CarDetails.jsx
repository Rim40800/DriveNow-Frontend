import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  const [bookingData, setBookingData] = useState({
    start_date: "",
    end_date: "",
  });

  const [bookingMessage, setBookingMessage] =
    useState("");

  const [bookingError, setBookingError] =
    useState("");

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        setError("Could not load car");
      }
    };

    getCar();
  }, [id]);

  const handleChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setBookingError(
        "Please login before booking a car"
      );
      return;
    }

    try {
      const response = await api.post(
        "/bookings",
        {
          car_id: Number(id),
          start_date: bookingData.start_date,
          end_date: bookingData.end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingMessage(response.data.message);
      setBookingError("");

      setBookingData({
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      setBookingError(
        error.response?.data?.message ||
          "Booking failed"
      );

      setBookingMessage("");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
  <main className="car-details-page">
    <div className="details-heading">
      <span>Vehicle Details</span>

      <h1>
        {car.brand} {car.model}
      </h1>

      <p>
        Discover the details and request your preferred
        booking period.
      </p>
    </div>

    <section className="details-layout">
      <div className="details-car">
        <div className="details-image-wrapper">
          <img
            className="details-image"
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
          />

          <span
            className={
              car.available
                ? "availability available"
                : "availability unavailable"
            }
          >
            {car.available
              ? "Available"
              : "Not available"}
          </span>
        </div>

        <div className="details-information">
          <div>
            <span>Brand</span>
            <strong>{car.brand}</strong>
          </div>

          <div>
            <span>Model</span>
            <strong>{car.model}</strong>
          </div>

          <div>
            <span>Year</span>
            <strong>{car.year}</strong>
          </div>

          <div>
            <span>Daily price</span>
            <strong>€{car.price_per_day}</strong>
          </div>
        </div>

        <p className="details-description">
          {car.description}
        </p>
      </div>

      <aside className="booking-card">
        <span className="booking-label">
          Reserve Your Car
        </span>

        <h2>Book this vehicle</h2>

        <p className="booking-intro">
          Select your preferred dates and send your
          booking request.
        </p>

        <form
          className="booking-form"
          onSubmit={handleBooking}
        >
          <label>
            Start date
            <input
              type="date"
              name="start_date"
              value={bookingData.start_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            End date
            <input
              type="date"
              name="end_date"
              value={bookingData.end_date}
              onChange={handleChange}
              required
            />
          </label>

          <div className="booking-price">
            <span>Price per day</span>
            <strong>€{car.price_per_day}</strong>
          </div>

          <button
            className="booking-button"
            type="submit"
          >
            Request Booking
          </button>
        </form>

        {bookingMessage && (
          <p className="success-message">
            {bookingMessage}
          </p>
        )}

        {bookingError && (
          <p className="error-message">
            {bookingError}
          </p>
        )}
      </aside>
    </section>
  </main>
);
};

export default CarDetails;
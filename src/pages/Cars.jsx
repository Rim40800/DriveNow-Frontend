import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        setError("Could not load cars");
      }
    };

    getCars();
  }, []);

  return (
    <main className="cars-page">
      <div className="page-heading">
        <span>Our Fleet</span>

        <h1>Choose your perfect car</h1>

        <p>
          Explore our exclusive selection of comfortable
          and reliable premium vehicles.
        </p>
      </div>

      {error && (
        <p className="error-message">{error}</p>
      )}

      <div className="cars-grid">
        {cars.map((car) => (
          <article className="car-card" key={car.id}>
            <div className="car-card-image">
              <img
                src={car.image_url}
                alt={`${car.brand} ${car.model}`}
              />

              <span className="car-year">
                {car.year}
              </span>
            </div>

            <div className="car-card-content">
              <span className="car-category">
                Premium Collection
              </span>

              <h2>
                {car.brand} {car.model}
              </h2>

              <p className="car-description">
                {car.description}
              </p>

              <div className="car-card-footer">
                <p className="car-price">
                  <strong>€{car.price_per_day}</strong>
                  <span> / day</span>
                </p>

                <Link
                  className="details-button"
                  to={`/cars/${car.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Cars;
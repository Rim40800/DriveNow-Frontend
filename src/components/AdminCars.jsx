import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [editingCarId, setEditingCarId] =
    useState(null);
  const [error, setError] = useState("");

  const emptyForm = {
    brand: "",
    model: "",
    year: "",
    price_per_day: "",
    image_url: "",
    description: "",
    available: true,
  };

  const [formData, setFormData] =
    useState(emptyForm);

  const getCars = async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      setError("Could not load cars");
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveCar = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingCarId) {
        await api.put(
          `/cars/${editingCarId}`,
          formData,
          config
        );
      } else {
        await api.post("/cars", formData, config);
      }

      setFormData(emptyForm);
      setEditingCarId(null);
      setError("");
      getCars();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not save car"
      );
    }
  };

  const startEdit = (car) => {
    setEditingCarId(car.id);

    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      image_url: car.image_url || "",
      description: car.description || "",
      available: car.available,
    });

    setTimeout(() => {
      document
        .getElementById("car-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 0);
  };

  const cancelEdit = () => {
    setEditingCarId(null);
    setFormData(emptyForm);
  };

  const deleteCar = async (id) => {
    const shouldDelete = window.confirm(
      "Do you really want to delete this car?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      getCars();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not delete car"
      );
    }
  };

  return (
    <div className="admin-cars">
      <div className="admin-section-heading">
        <div>
          <span>Fleet Management</span>
          <h2>Manage Cars</h2>
        </div>

        <p>{cars.length} vehicles</p>
      </div>

      <form
        id="car-form"
        className="admin-car-form"
        onSubmit={saveCar}
      >
        <div className="admin-form-title">
          <span>
            {editingCarId
              ? "Editing Vehicle"
              : "New Vehicle"}
          </span>

          <h3>
            {editingCarId
              ? "Update car information"
              : "Add a car to the fleet"}
          </h3>
        </div>

        <div className="admin-car-fields">
          <label>
            Brand
            <input
              type="text"
              name="brand"
              placeholder="Mercedes-Benz"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Model
            <input
              type="text"
              name="model"
              placeholder="C-Class"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Year
            <input
              type="number"
              name="year"
              placeholder="2024"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price per day
            <input
              type="number"
              name="price_per_day"
              placeholder="95"
              value={formData.price_per_day}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </label>

          <label className="admin-image-field">
            Image URL
            <input
              type="text"
              name="image_url"
              placeholder="/images/cars/example.jpg"
              value={formData.image_url}
              onChange={handleChange}
              required
            />
          </label>

          <label className="admin-description-field">
            Description
            <textarea
              name="description"
              placeholder="Describe the vehicle..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </label>
        </div>

        <label className="availability-checkbox">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Vehicle is available for booking
        </label>

        <div className="admin-form-actions">
          <button
            className="admin-save-button"
            type="submit"
          >
            {editingCarId
              ? "Save Changes"
              : "Add Vehicle"}
          </button>

          {editingCarId && (
            <button
              className="admin-cancel-button"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && (
        <p className="error-message admin-car-error">
          {error}
        </p>
      )}

      <div className="admin-cars-grid">
        {cars.map((car) => (
          <article
            className="admin-car-card"
            key={car.id}
          >
            <div className="admin-car-image">
              <img
                src={car.image_url}
                alt={`${car.brand} ${car.model}`}
              />

              <span
                className={
                  car.available
                    ? "admin-car-available"
                    : "admin-car-unavailable"
                }
              >
                {car.available
                  ? "Available"
                  : "Unavailable"}
              </span>
            </div>

            <div className="admin-car-content">
              <span>Vehicle #{car.id}</span>

              <h3>
                {car.brand} {car.model}
              </h3>

              <div className="admin-car-details">
                <p>
                  <span>Year</span>
                  <strong>{car.year}</strong>
                </p>

                <p>
                  <span>Daily price</span>
                  <strong>
                    €{car.price_per_day}
                  </strong>
                </p>
              </div>

              <div className="admin-car-actions">
                <button
                  className="admin-edit-button"
                  onClick={() => startEdit(car)}
                >
                  Edit
                </button>

                <button
                  className="admin-delete-button"
                  onClick={() => deleteCar(car.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminCars;
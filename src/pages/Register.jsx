import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/users/register",
        formData
      );

      setMessage(response.data.message);
      setError("");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
      );

      setMessage("");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <div className="auth-image register-image">
          <div className="auth-image-overlay">
            <span>Join DriveNow</span>

            <h2>
              Discover premium mobility.
            </h2>

            <p>
              Create your account and request your next
              vehicle quickly and comfortably.
            </p>
          </div>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-heading">
            <span>New Membership</span>
            <h1>Create your account</h1>
            <p>
              Enter your information to get started.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="6"
                required
              />
            </label>

            <button
              className="auth-button"
              type="submit"
            >
              Create Account
            </button>
          </form>

          {message && (
            <p className="success-message auth-message">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message auth-message">
              {error}
            </p>
          )}

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
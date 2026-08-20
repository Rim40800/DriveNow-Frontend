import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import api from "../services/api.js";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        "/users/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setError("");
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <div className="auth-image">
          <div className="auth-image-overlay">
            <span>DriveNow Membership</span>

            <h2>
              Your premium journey starts here.
            </h2>

            <p>
              Sign in to manage your bookings and
              discover your next vehicle.
            </p>
          </div>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-heading">
            <span>Welcome Back</span>
            <h1>Login to your account</h1>
            <p>
              Enter your account details to continue.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </label>

            <button
              className="auth-button"
              type="submit"
            >
              Login
            </button>
          </form>

          {error && (
            <p className="error-message auth-message">
              {error}
            </p>
          )}

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
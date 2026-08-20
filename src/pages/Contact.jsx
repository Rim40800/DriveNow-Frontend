import { useState } from "react";
import api from "../services/api.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] =
    useState("");

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
        "/contacts",
        formData
      );

      setResponseMessage(response.data.message);
      setError("");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not send message"
      );

      setResponseMessage("");
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-heading">
        <span className="section-label">
          Contact DriveNow
        </span>

        <h1>How can we help you?</h1>

        <p>
          Send us a message about a vehicle, booking or
          any other question.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-information">
          <span className="contact-small-title">
            Customer Support
          </span>

          <h2>
            Let&apos;s talk about your next journey.
          </h2>

          <p>
            Our contact form gives you a simple way to
            reach the DriveNow team whenever you need
            assistance.
          </p>

          <div className="contact-benefits">
            <article>
              <span>01</span>
              <div>
                <h3>Booking Assistance</h3>
                <p>
                  Questions about your booking request or
                  its current status.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h3>Vehicle Information</h3>
                <p>
                  More information about our available
                  premium vehicles.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h3>General Support</h3>
                <p>
                  Help with your account or the DriveNow
                  platform.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="contact-form-card">
          <span className="contact-form-label">
            Send a Message
          </span>

          <h2>We are here to help.</h2>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form-row">
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
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
            </div>

            <label>
              Subject
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>

            <button
              className="contact-button"
              type="submit"
            >
              Send Message
            </button>
          </form>

          {responseMessage && (
            <p className="success-message contact-message">
              {responseMessage}
            </p>
          )}

          {error && (
            <p className="error-message contact-message">
              {error}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Contact;
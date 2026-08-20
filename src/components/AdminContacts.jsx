import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContacts(response.data);
        setError("");
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Could not load messages"
        );
      }
    };

    getContacts();
  }, []);

  return (
    <div className="admin-contacts">
      <div className="admin-section-heading">
        <div>
          <span>Customer Communication</span>
          <h2>Contact Messages</h2>
        </div>

        <p>{contacts.length} messages</p>
      </div>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {contacts.length === 0 && !error && (
        <p className="admin-empty-message">
          No contact messages available.
        </p>
      )}

      <div className="admin-contacts-grid">
        {contacts.map((contact, index) => (
          <article
            className="admin-contact-card"
            key={contact.id}
          >
            <div className="admin-contact-top">
              <span className="admin-contact-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="admin-contact-id">
                Message #{contact.id}
              </span>
            </div>

            <h3>{contact.subject}</h3>

            <div className="admin-contact-person">
              <div>
                <span>Customer</span>
                <strong>{contact.name}</strong>
              </div>

              <div>
                <span>Email address</span>
                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="admin-contact-message">
              <span>Message</span>
              <p>{contact.message}</p>
            </div>

            <a
              className="admin-reply-button"
              href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
            >
              Reply by Email
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
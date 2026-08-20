import { Link } from "react-router-dom";

const Services = () => {
  return (
    <main className="services-page">
      <section className="services-heading">
        <span className="section-label">
          DriveNow Services
        </span>

        <h1>
          Premium service for every journey.
        </h1>

        <p>
          From choosing your vehicle to managing your
          booking, DriveNow keeps every step simple and
          transparent.
        </p>
      </section>

      <section className="services-grid">
        <article className="service-card featured-service">
          <span className="service-number">01</span>
          <h2>Premium Car Rental</h2>
          <p>
            Explore our collection of comfortable
            premium cars and select the vehicle that
            suits your journey.
          </p>
        </article>

        <article className="service-card">
          <span className="service-number">02</span>
          <h2>Flexible Booking</h2>
          <p>
            Select the start and end dates that fit your
            personal travel plans.
          </p>
        </article>

        <article className="service-card">
          <span className="service-number">03</span>
          <h2>Online Requests</h2>
          <p>
            Send your booking request directly through
            your DriveNow account.
          </p>
        </article>

        <article className="service-card">
          <span className="service-number">04</span>
          <h2>Booking Management</h2>
          <p>
            Review your booking information and current
            status from My Bookings.
          </p>
        </article>

        <article className="service-card">
          <span className="service-number">05</span>
          <h2>Clear Pricing</h2>
          <p>
            View the daily rental price and total
            booking cost clearly before your journey.
          </p>
        </article>

        <article className="service-card">
          <span className="service-number">06</span>
          <h2>Reliable Support</h2>
          <p>
            Contact our team whenever you need help or
            have a question about your booking.
          </p>
        </article>
      </section>

      <section className="service-process">
        <div className="process-heading">
          <span>How It Works</span>
          <h2>Book your car in three steps.</h2>
        </div>

        <div className="process-steps">
          <article>
            <strong>01</strong>
            <div>
              <h3>Choose a car</h3>
              <p>
                Explore our fleet and open the vehicle
                details.
              </p>
            </div>
          </article>

          <article>
            <strong>02</strong>
            <div>
              <h3>Select your dates</h3>
              <p>
                Enter the preferred start and end dates.
              </p>
            </div>
          </article>

          <article>
            <strong>03</strong>
            <div>
              <h3>Send your request</h3>
              <p>
                Submit the booking and follow its status.
              </p>
            </div>
          </article>
        </div>

        <Link className="service-action" to="/cars">
          Explore Available Cars
        </Link>
      </section>
    </main>
  );
};

export default Services;
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-image-wrapper">
          <img
            src="/images/cars/bmw-3-series.jpg"
            alt="Premium BMW from DriveNow"
          />

          <div className="about-image-label">
            <strong>DriveNow</strong>
            <span>Premium Car Rental</span>
          </div>
        </div>

        <div className="about-content">
          <span className="section-label">
            About DriveNow
          </span>

          <h1>
            A better way to rent your next car.
          </h1>

          <p>
            DriveNow makes car rental simple, fast and
            reliable. Our platform allows customers to
            explore premium vehicles, view their details
            and request a booking online.
          </p>

          <p>
            We focus on a clear booking process,
            comfortable vehicles and reliable customer
            support throughout every journey.
          </p>

          <Link className="primary-button" to="/cars">
            Discover Our Cars
          </Link>
        </div>
      </section>

      <section className="about-numbers">
        <article>
          <strong>3</strong>
          <span>Premium Vehicles</span>
        </article>

        <article>
          <strong>24/7</strong>
          <span>Online Access</span>
        </article>

        <article>
          <strong>100%</strong>
          <span>Digital Booking</span>
        </article>

        <article>
          <strong>Easy</strong>
          <span>Booking Process</span>
        </article>
      </section>

      <section className="about-values">
        <div className="about-values-heading">
          <span className="section-label">
            Our Values
          </span>

          <h2>
            Designed around your journey.
          </h2>
        </div>

        <div className="values-grid">
          <article>
            <span>01</span>
            <h3>Quality</h3>
            <p>
              A carefully selected collection of
              comfortable premium vehicles.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Simplicity</h3>
            <p>
              Clear vehicle information and an easy
              online booking process.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Reliability</h3>
            <p>
              Transparent booking requests and dependable
              customer communication.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default About;
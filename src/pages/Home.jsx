import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            Premium Car Rental
          </span>

          <h1>
            Find the right car for
            <span> every journey.</span>
          </h1>

          <p>
            Discover comfortable and reliable cars.
            Choose your favorite vehicle and book it
            quickly with DriveNow.
          </p>

          <div className="hero-buttons">
            <Link className="primary-button" to="/cars">
              Explore Cars
            </Link>

            <Link
              className="secondary-button"
              to="/services"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src="/images/cars/mercedes-c-class.jpg"
            alt="Blue Mercedes-Benz C-Class"
          />

          <div className="hero-price">
            <span>Starting from</span>
            <strong>€88 / day</strong>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <article>
          <span className="benefit-number">01</span>
          <div>
            <h2>Simple Booking</h2>
            <p>Book your preferred car in a few steps.</p>
          </div>
        </article>

        <article>
          <span className="benefit-number">02</span>
          <div>
            <h2>Quality Cars</h2>
            <p>Choose from comfortable premium vehicles.</p>
          </div>
        </article>

        <article>
          <span className="benefit-number">03</span>
          <div>
            <h2>Reliable Support</h2>
            <p>Contact us whenever you need assistance.</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link className="footer-logo" to="/">
            Drive<span>Now</span>
          </Link>

          <p>
            Premium vehicles, simple booking and reliable
            support for every journey.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/services">Services</Link>
          </div>

          <div>
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/my-bookings">
              My Bookings
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} DriveNow. All rights reserved.
        </p>

        <span>Premium Car Rental</span>
      </div>
    </footer>
  );
};

export default Footer;
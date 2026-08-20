
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <NavLink className="navbar-logo" to="/">
        Drive<span>Now</span>
      </NavLink>

      <nav className="navbar-links">
        <NavLink className={getLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkClass} to="/about">
          About Us
        </NavLink>

        <NavLink className={getLinkClass} to="/cars">
          Cars
        </NavLink>

        <NavLink className={getLinkClass} to="/services">
          Services
        </NavLink>

        <NavLink className={getLinkClass} to="/contact">
          Contact
        </NavLink>

        {user ? (
          <>
            <NavLink
              className={getLinkClass}
              to="/my-bookings"
            >
              My Bookings
            </NavLink>

            {user.role === "admin" && (
              <NavLink
                className={getLinkClass}
                to="/admin"
              >
                Admin
              </NavLink>
            )}

            <span className="navbar-user">
              Hello, {user.name}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              className={getLinkClass}
              to="/register"
            >
              Register
            </NavLink>

            <NavLink
              className="login-button"
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Cars from "./pages/Cars.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
        path="/my-bookings"
        element={<MyBookings />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
        path="/admin"
        element={<AdminDashboard />}
        />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Routes>
    </Routes>

    <Footer />
    </>
  );
};

export default App;
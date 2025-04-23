import { Link } from "react-router-dom";
import assets from '../../assets/assets'
import './Navbar.css'

export function GuestNavbar() {
  return (
    <div
      className="d-flex flex-column bg-dark text-white vh-100 p-3"
      style={{ width: "250px", position: "fixed" }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="mb-1 mt-2 d-flex align-items-center text-white text-decoration-none"
      >
        <img src={assets.logo} alt="Logo" height="30" className="me-2" />
        <span className="fs-5 fw-bold">Echo ChatRoom</span>
      </Link>

      <hr />

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <i className="fas fa-home me-2"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/trending" className="nav-link text-white">
            <i className="fas fa-fire me-2"></i> Trending
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link text-white">
            <i className="fas fa-info-circle me-2"></i> About
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link text-white">
            <i className="fas fa-sign-in-alt me-2"></i> Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="nav-link text-white">
            <i className="fas fa-user-plus me-2"></i> Register
          </Link>
        </li>
      </ul>

      {/* Footer */}

      <div className="text-white-50 small mt-auto">
        <hr className="text-white" />
        <p className="mb-1 text-center">© 2025 EchoRoom</p>
      </div>
    </div>
  );
}

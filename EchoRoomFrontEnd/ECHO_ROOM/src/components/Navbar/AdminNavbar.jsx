import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import './Navbar.css'

export function AdminNavbar({name}) {
  return (
    <div
      className="d-flex flex-column bg-dark text-white vh-100 p-3"
      style={{ width: "250px", position: "fixed" }}
    >
      {/* Logo + Admin Title */}
      <Link
        to="/admin"
        className="mb-1 d-flex align-items-center text-white text-decoration-none"
      >
        <img src={assets.logo} alt="Logo" height="30" className="me-2" />
        <span className="fs-5 fw-bold">Admin Panel</span>
      </Link>

      <hr />

      {/* Admin Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/admin/dashboard"
            className="nav-link text-white hover-effect"
          >
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="nav-link text-white hover-effect">
            <i className="fas fa-users-cog me-2"></i> Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/chatrooms"
            className="nav-link text-white hover-effect"
          >
            <i className="fas fa-comments me-2"></i> Chatrooms
          </Link>
        </li>
        <li>
          <Link
            to="/admin/analytics"
            className="nav-link text-white hover-effect"
          >
            <i className="fas fa-chart-line me-2"></i> Analytics
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className="nav-link text-white hover-effect"
          >
            <i className="fas fa-cog me-2"></i> Settings
          </Link>
        </li>
        <li className="mt-3">
          <Link to="/logout" className="nav-link text-danger hover-effect">
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </Link>
        </li>
      </ul>

      {/* Footer */}

      <div className="text-white-50 small mt-auto">
        <hr className="text-white" />
        <p className="mb-1 text-center">EchoRoom Admin</p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import "./Navbar.css";

export function UserNavbar({name}) {
  return (
    <div
      className="d-flex flex-column bg-dark text-white vh-100 p-3"
      style={{ width: "250px", position: "fixed" }}
    >
      {/* Logo + Title */}
      <Link
        to="/"
        className="mb-1 d-flex align-items-center text-white text-decoration-none"
      >
        <img src={assets.logo} alt="Logo" height="30" className="me-2" />
        <span className="fs-5 fw-bold">Echo ChatRoom</span>
      </Link>

      <hr />

      {/* User Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/user/home" className="nav-link text-white hover-effect">
            <i className="fas fa-home me-2"></i> Home
          </Link>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-white hover-effect d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse"
            data-bs-target="#chatroomMenu"
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="fas fa-comments me-2"></i> Chatrooms
            </span>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul
            className="collapse ps-4 nav nav-pills flex-row"
            id="chatroomMenu"
          >
            <li className="nav-item">
              <Link
                to="/user/chatrooms/all"
                className="nav-link text-white hover-effect"
              >
                # All Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/chatrooms/my"
                className="nav-link text-white hover-effect"
              >
                # My Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/chatrooms/create"
                className="nav-link text-white hover-effect"
              >
                + Create Room
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/user/friends" className="nav-link text-white hover-effect">
            <i className="fas fa-user-friends me-2"></i> Friends
          </Link>
        </li>
        <li>
          <Link to="/user/profile" className="nav-link text-white hover-effect">
            <i className="fas fa-user-circle me-2"></i> Profile
          </Link>
        </li>
        <li>
          <Link
            to="/user/settings"
            className="nav-link text-white hover-effect"
          >
            <i className="fas fa-cog me-2"></i> Settings
          </Link>
        </li>
        <li className="mt-1">
          <Link to="/logout" className="nav-link text-danger hover-effect">
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="text-white-50 small mt-auto">
        <hr className="text-white" />
        <p className="mb-1 text-center">Logged in as {name}</p>
      </div>
    </div>
  );
}

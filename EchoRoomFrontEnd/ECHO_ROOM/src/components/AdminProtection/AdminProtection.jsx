import { Link } from "react-router-dom";

function AdminProtection({ children }) {
  const role = sessionStorage.getItem("role");

  if (role === 'ROLE_ADMIN') {
    return <div>{children}</div>;
  } else {
    return (
        <Login></Login>
    )
  }
}

export default AdminProtection;

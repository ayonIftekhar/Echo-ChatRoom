import { useContext } from "react";
import { UserRoomContext } from "../../Context/RoomContext";
import Login from "../../pages/LogIn/Login";


function AdminProtection({ children }) {
  const {user} = useContext(UserRoomContext);

  if (user.role === 'ROLE_ADMIN') {
    return <div>{children}</div>;
  } else {
    return (
        <Login></Login>
    )
  }
}

export default AdminProtection;

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoomContext } from "../../Context/RoomContext";
import axios from "axios";

export default function OAuthSuccess() {
    const navigate = useNavigate();

    const { setUser } = useContext(UserRoomContext);
    const backendURL = import.meta.env.VITE_API_BASE_URL;

    async function getUser() {
      try {
        const res = await axios.get(`${backendURL}/api/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        navigate("/login");
        console.log("success handler er moddhe error ase");
        console.log(err);
      }
    }

    useEffect(() => {
      getUser();
    }, []);

    return (
        <div>
            <h1>OAuth Success</h1>
        </div>
    )
}

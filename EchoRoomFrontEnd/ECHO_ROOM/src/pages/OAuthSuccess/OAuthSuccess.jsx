import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoomContext } from "../../Context/RoomContext";
import axios from "axios";
import { toast } from "react-toastify";
    
export default function OAuthSuccess() {
    const navigate = useNavigate();

    const { setUser } = useContext(UserRoomContext);
    const backendURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      axios
        .get(`${backendURL}/api/me`, { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          navigate("/");
        })
        .catch(() => {
          toast.error("OAuth login failed");
          navigate("/login");
        });
    }, []);

    return (
        <div>
            <h1>OAuth Success</h1>
        </div>
    )
}

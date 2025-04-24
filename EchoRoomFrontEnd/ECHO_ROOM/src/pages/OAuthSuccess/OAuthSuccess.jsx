import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function OAuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <div>
            <h1>OAuth Success</h1>
        </div>
    )
}

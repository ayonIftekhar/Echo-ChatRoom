import { useNavigate } from "react-router-dom";
import { logOutFromServer } from "../../BackendAPI/UserBackend";
import { toast } from "react-toastify";
import { useEffect } from "react";
import assets from "../../assets/assets";
import { Spinner } from "react-bootstrap";

export function LogOut(){
    const navigate = useNavigate();

    async function signOut(){
        try{
            const res = await logOutFromServer();
            if(res.status === 200){
                navigate("/login");
                toast.success("Logged out successfully");
            }   
        }catch{
            toast.error("Something went wrong");
        }
    }

    useEffect(()=>{
        signOut();
    },[])

    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="text-center">
          <img
            src={assets.logo}
            alt="EchoRoom Logo"
            style={{ width: "100px", marginBottom: "20px" }}
          />

          <h2 className="fw-bold mb-3 text-primary">Logging you out...</h2>

          <Spinner animation="border" variant="danger" role="status" />

          <p className="text-muted mt-3">
            Thank for joining <strong className="text-primary">EchoRoom</strong> community.
          </p>
        </div>
      </div>
    );
}

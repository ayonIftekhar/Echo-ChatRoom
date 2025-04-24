import { useNavigate } from "react-router-dom";
import { logOutFromServer } from "../../BackendAPI/UserBackend";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

    return(
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

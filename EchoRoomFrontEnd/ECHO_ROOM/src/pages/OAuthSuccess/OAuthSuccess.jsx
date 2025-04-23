import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"


function OAuthSuccess(){

    const navigate = useNavigate();

    const {token} = useParams('');

    useEffect(()=>{
        sessionStorage.setItem("jwt",token);
        console.log(token);
        navigate("/home");
    },[])

    return(
        <div>
            
        </div>
    )
}

export default OAuthSuccess;
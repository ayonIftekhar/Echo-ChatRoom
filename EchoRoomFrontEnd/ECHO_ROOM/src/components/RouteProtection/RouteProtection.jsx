import Login from "../../pages/LogIn/Login";
import { useContext } from "react";
import { UserRoomContext } from "../../Context/RoomContext";

function RouteProtection({children}){

    const {user} = useContext(UserRoomContext);

    if(user != null){
        return (
            <div>
                { children }
            </div>
        );
    }else{
        return(
            <Login></Login>
        );
    }
    
}

export default RouteProtection;
import { AdminNavbar } from "./AdminNavbar";
import { GuestNavbar } from "./GuestNavbar";
import { UserNavbar } from "./UserNavbar";
import { useContext } from "react";
import { UserRoomContext } from "../../Context/RoomContext";

export function Navbar(){
    const {user} = useContext(UserRoomContext);

    return(
        <div>
            {
                !user ? 
                    <GuestNavbar/> 
                    :
                    <>
                        {
                            (user.role === 'ROLE_USER') ? 
                                <UserNavbar name={user.username}/>
                                :
                                <AdminNavbar name={user.username}/>
                        }
                    </>
                
            }
        </div>
    )
}
import { AdminNavbar } from "./AdminNavbar";
import { GuestNavbar } from "./GuestNavbar";
import { UserNavbar } from "./UserNavbar";


export function Navbar(){

    const token = sessionStorage.getItem("jwt");
    const role = sessionStorage.getItem("role")

    return(
        <div>
            {
                !token ? 
                    <GuestNavbar/> 
                    :
                    <>
                        {
                            (role === 'ROLE_USER') ? 
                                <UserNavbar />
                                :
                                <AdminNavbar />
                        }
                    </>
                
            }
        </div>
    )
}
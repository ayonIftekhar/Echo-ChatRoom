import { AdminNavbar } from "../../components/Navbar/AdminNavbar";
import { GuestNavbar } from "../../components/Navbar/GuestNavbar";
import { Navbar } from "../../components/Navbar/Navbar";
import { UserNavbar } from "../../components/Navbar/UserNavbar";
import {  useEffect, useContext } from "react";
import axios from "axios";
import { UserRoomContext } from "../../Context/RoomContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Home(){

    const backendURL = import.meta.env.VITE_API_BASE_URL;
    const {setUser} = useContext(UserRoomContext);
    const navigate = useNavigate();

    async function getUser(){
        try{
            const res = await axios.get(`${backendURL}/api/me`, { withCredentials: true });
            setUser(res.data);
        }catch(err){
            navigate("/login");
            console.log(err);
        }
    }

    useEffect(()=>{
        getUser();
    },[])
    
    return(
        <div>
            <Navbar/>
        </div>
    )
}
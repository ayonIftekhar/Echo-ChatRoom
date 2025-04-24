import axios from "axios";

 const baseURL = 'https://echo-chatroom.onrender.com/user'    
//const baseURL = 'http://localhost:8080/user'

export async function createRoom(room){
    console.log(room);
    const response = await axios.post(baseURL + '/create-room' , room ,{
       withCredentials:true
    })
    console.log("response");
    return response;
}

export async function getAllRooms(page){
    const response = await axios.get(baseURL + '/all-rooms?page='+page, {
        withCredentials:true
    });
    return response;
}

export async function joinRoom(handle){
    const response = await axios.get(`${baseURL}/join-room?handle=${encodeURIComponent(handle)}`,{
        withCredentials:true
    });
    return response;
}

export async function searchRooms(searchType, query, page = 0) {
    const response = await axios.get(
        `${baseURL}/search-rooms?type=${searchType}&query=${encodeURIComponent(query)}&page=${page}`, 
        {
            withCredentials:true
        }
    );
    return response;
}

export async function getMyRooms(page){
    const response = await axios.get(`${baseURL}/my-rooms?page=${page}`,{
        withCredentials:true
    });
    return response;
}

export async function getRoomDetails(handle){
    const response = await axios.get(`${baseURL}/room-details?handle=${encodeURIComponent(handle)}`,{
        withCredentials:true
    });
    return response;
}

export async function getRoomTexts(handle, page , cursor=null){
    const data = {
        handle : handle,
        page : page,
        time : cursor,
    }   
    const response = await axios.post(`${baseURL}/room-texts`,data,{
        withCredentials:true
    });
    return response;
}

export async function logOutFromServer(){
    const response = await axios.post(`${baseURL}/logout`,{},{
        withCredentials:true
    });
    return response;
}


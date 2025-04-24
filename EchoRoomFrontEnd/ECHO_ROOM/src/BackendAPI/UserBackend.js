import axios from "axios";

const baseURL = 'https://echo-chatroom.onrender.com/user'

export async function createRoom(room){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.post(baseURL + '/create-room' , room ,{
        headers : {
            Authorization : `Bearer ${token}`,
        },
    })
    return response;
}

export async function getAllRooms(page){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(baseURL + '/all-rooms?page='+page, {
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response;
}

export async function joinRoom(handle){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(`${baseURL}/join-room?handle=${encodeURIComponent(handle)}`,{
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response;
}

export async function searchRooms(searchType, query, page = 0) {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(
        `${baseURL}/search-rooms?type=${searchType}&query=${encodeURIComponent(query)}&page=${page}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
}

export async function getMyRooms(page){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(`${baseURL}/my-rooms?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response;
}

export async function getRoomDetails(handle){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(`${baseURL}/room-details?handle=${encodeURIComponent(handle)}`,{
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response;
}

export async function getRoomTexts(handle, page , cursor=null){
    const token = sessionStorage.getItem("jwt");
    const data = {
        handle : handle,
        page : page,
        cursor : cursor,
    }   
    const response = await axios.post(`${baseURL}/room-texts`,data,{
        headers : {
            Authorization : `Bearer ${token}`,
        },
    });
    return response;
}
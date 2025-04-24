import axios from "axios"

const baseURL = 'https://echo-chatroom.onrender.com/api'

export async function login(creds){
    const response = await axios.post(baseURL + '/login' , creds , {
        headers : {
            "Content-Type" : "application/json",
        },
    }) 
    return response;
}

export async function register(creds){
    const response = await axios.post(baseURL + '/register' , creds , {
        headers : {
            "Content-Type" : "application/json",
        },
    })
    return response;
}

export async function sendResetEmail(mail){
    const req = {
        email : mail,
    }
    //console.log(req);
    return await axios.post(baseURL + '/forgot-password' , req , {
        headers : {
            "Content-Type" : "application/json",
        },
    })
}

export async function resetPassword(pass , token){
    const req = {
        password : pass,
    }

    return await axios.post(baseURL+'/reset-password/'+ token , req , {
        headers : {
            "Content-Type" : "application/json",
        },
    })
}
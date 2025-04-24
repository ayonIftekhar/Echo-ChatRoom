import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


// const URL = "http://localhost:8080/ws";
const URL = import.meta.env.VITE_WEBSOCKET_URL;

let stompClient = null;

export function connectChatRoom(handle, callback){
    const socket = new SockJS(URL);
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("connected");
            
                stompClient.subscribe(`/topic/chat/${handle}`, (message) => {
                const body = JSON.parse(message.body);
                callback(body);
            });
        },
        onStompError: (frame) => {
             console.error("Broker error", frame.headers['message']);
        }
    })
    stompClient.activate();
}


export function sendMessage(handle, message) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: `/app/chat/${handle}`,
      body: JSON.stringify(message)
    });
  } else {
    console.error("STOMP client is not connected.");
  }
}


import { createContext, useState } from "react";

export const UserRoomContext = createContext();

export function UserRoomProvider({ children }) {
    const [userRooms, setUserRooms] = useState([]);

    return (
        <UserRoomContext.Provider value={{ 
            userRooms, 
            setUserRooms
        }}>
            {children}
        </UserRoomContext.Provider>
    );
} 
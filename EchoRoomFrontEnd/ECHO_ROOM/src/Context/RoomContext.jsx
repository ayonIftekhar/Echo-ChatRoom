import { createContext, useState } from "react";

export const UserRoomContext = createContext();

export function UserRoomProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserRoomContext.Provider value={{ 
            user, 
            setUser
        }}>
            {children}
        </UserRoomContext.Provider>
    );
} 
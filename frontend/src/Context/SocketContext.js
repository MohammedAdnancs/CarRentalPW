import { children } from "react";
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useContext } from "react";

export const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            const socket = io("http://localhost:4000", {
                query: {
                    userId: userInfo.id,
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {

            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [userInfo]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};
import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage } from '../redux/slices/Messagesslice/Messagesslice';
import messageSentSound from '../Components/Assets/messageSentSound.mp3';

const useListenMessages = () => {
    const dispatch = useDispatch();
    const { socket } = useSocketContext()
   
    const { UserContacts, UserMessages, isLoding, isError, isSucces, message } = useSelector((state) => state.message)

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            dispatch(addNewMessage(newMessage));
        })
        
        return () => socket?.off('newMessage')
    }, [UserMessages, socket])
}

export default useListenMessages
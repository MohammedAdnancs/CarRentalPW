import React, { useState, useContext, useRef, useEffect } from 'react'
import Medo from '../Assets/Medo.jpg';
import './MessageBox.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserContacts, getUserMessages, resetmessage, resetUserContacts, SendUserMessages } from '../../redux/slices/Messagesslice/Messagesslice';
import { IoIosSend } from "react-icons/io";
import { motion } from 'framer-motion'
import messageSentSound from '../Assets/messageSentSound.mp3';
import { MdWavingHand } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { useSocketContext } from '../../Context/SocketContext';
import useListenMessages from '../../hooks/useListenMessages';

const MessageBox = () => {

    const dispatch = useDispatch();
    const { UserContacts, UserMessages, isLoding, isError, isSucces, message } = useSelector((state) => state.message)
    const { userInfo } = useSelector((state) => state.auth)
    const audioRef = useRef(null);
    const { onlineUsers } = useSocketContext();
    useListenMessages();
    const isUserOnline = (userId) => {
        return onlineUsers.includes(userId);
    };

    console.log(onlineUsers);
    useEffect(() => {

        if (isError) {
            console.log(message);
        }
        if (isSucces) {
            dispatch(resetmessage())
            console.log()
        }

    }, [userInfo, UserContacts, isLoding, isError, isSucces, message])

    const fetchData = async () => {
        try {
            let senderId = userInfo.id
            dispatch(getUserContacts({ params: { senderId } }))

            //dispatch(getUserContacts(senderId))
        } catch (error) {
            console.error('Error fetching user contacts:', error);
        }
    };

    if (!UserContacts || !UserContacts[0]) {
        fetchData()
    }

    if (UserContacts) { }

    const [receiverId, setreciverId] = useState("");

    const getuserid = async (userId) => {

        setreciverId(userId)

        const senderId = userInfo.id
        const receiverId = userId
        console.log("sender:", senderId);
        console.log("reciver:", receiverId)

        const Data = {
            senderId,
            receiverId
        }
        console.log(Data)
        dispatch(getUserMessages(Data))
        //const message = await axios.post('/Getmessages', Data)
        //console.log(message.data)
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const [messagetosend, setmessgaetosend] = useState("");

    const handleSendMessage = async () => {

        console.log(messagetosend);
        console.log(userInfo.id);
        console.log(receiverId);

        const senderId = userInfo.id;
        if (messagetosend != "") {

            const message = messagetosend
            try {

                const Data = {
                    message,
                    senderId,
                    receiverId
                }
                const newmessage = await dispatch(SendUserMessages(Data))
                audioRef.current.play();
                console.log(newmessage)
            } catch (error) {
                console.log(error)
            }



        }

    };

    const messageContainerRef = useRef(null);

    useEffect(() => {

        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }

    }, [UserMessages]);

    return (
        <div className="BigMessageContainer">
            <div className="MessageContainer">
                <div className='MessageCleft'>
                    <div className='searchbar'>
                        <h2 className='Searchspan' >Search</h2>
                        <input className='SearchUsers' placeholder='Username'>
                        </input>
                    </div>
                    <div className='Containerusercontactsbox'>
                        {UserContacts && UserContacts.map(contact => (
                            <div className='Usercontactsbox' key={contact.id} onClick={() => getuserid(contact._id)}>
                                <img src={contact.image} alt={contact.username} />
                                {isUserOnline(contact._id) ? <div className='UserOnlineIndicator'></div> : ""}
                                <div className='Usercontactsboxnameeamil'>
                                    <p className='Contactsboxusername'>{contact.username}</p>
                                    <p className='Contactsboxuseremail'>{contact.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {userInfo ?
                    <div className='MessageCright'>
                        <div className='SenderInfo'>
                            <img className='senderimagetopbar' src={userInfo.image} />
                            <h2 className='topusername'>{userInfo.username + " Chat"}</h2>
                        </div>
                        {UserMessages && receiverId ?
                            <div ref={messageContainerRef} className='textboxesandsend'>
                                {UserMessages && UserMessages.map(message => (
                                    <div>
                                        <motion.div
                                            initial={{
                                                x: message.senderId === userInfo.id ? 300 : -300,
                                                opacity: 0.2
                                            }}
                                            animate={{ x: 0, y: 0, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className='chat' key={message._id}>
                                            <div className={message.senderId === userInfo.id ? 'bubble me' : 'bubble you'}>
                                                <h2>{message.message}</h2>
                                                <span className='messageTime'>{formatTime(message.createdAt)}</span>
                                            </div>
                                        </motion.div>
                                        <audio ref={audioRef} src={messageSentSound} />
                                    </div>
                                ))}
                            </div>
                            : <div className='ChooseUserToStartMessaging'>
                                <div className='hellohandwave'>
                                    <h1>{"Hello  " + userInfo.username}</h1>
                                    <MdWavingHand size={50} color='#2192FF' />
                                </div>
                                <IoMdChatboxes size={70} color='#2192FF' />
                                <h2>Choose user to start messaging</h2>
                            </div>}
                    </div> :
                    <div className='ChooseUserToStartMessaging'>
                        <h1 className='loginfirst' >Login first to see messages</h1>
                    </div>
                }

            </div>
            <div className='sendmessageinput'>
                <input className='inputsendmessage' value={messagetosend} onChange={(e) => setmessgaetosend(e.target.value)} placeholder='Send Message....'></input>
                <button className='buttonsendmessage' onClick={() => handleSendMessage()} ><IoIosSend color='#F5F5F5' size={32} /></button>
            </div>
        </div >
    )
}

export default MessageBox
import React, { useState, useContext, useRef, useEffect } from 'react'
import Medo from '../Assets/Medo.jpg';
import './MessageBox.css'
import axios from 'axios';
import { UserContext } from "../../Context/userContext";
import { useDispatch, useSelector } from 'react-redux';
import { getUserContacts, getUserMessages, resetmessage, resetUserContacts } from '../../redux/slices/Messagesslice/Messagesslice';
import { IoIosSend } from "react-icons/io";


const MessageBox = () => {

    const dispatch = useDispatch();
    const { UserContacts, UserMessages, isLoding, isError, isSucces, message } = useSelector((state) => state.message)
    const { userInfo } = useSelector((state) => state.auth)

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

    const getuserid = async (userId) => {
        console.log("sender:", userId);
        console.log("reciver:", userInfo.id)
        const senderId = userInfo.id
        const reciverId = userId
        const Data = {
            senderId,
            reciverId
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

    const handleSendMessage = () => {
        // Log a message when the button is clicked
        console.log(messagetosend);
    };

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
                                <div className='Usercontactsboxnameeamil'>
                                    <p className='Contactsboxusername'>{contact.username}</p>
                                    <p className='Contactsboxuseremail'>{contact.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {UserMessages ?
                    <div className='MessageCright'>
                        <div className='SenderInfo'>
                            <img className='senderimagetopbar' src={userInfo.image} />
                            <h2 className='topusername'>{userInfo.username + " Chat"}</h2>
                        </div>
                        {UserMessages && UserMessages.map(message => (
                            <div className='chat' key={message._id}>
                                <div className={message.senderId === userInfo.id ? 'bubble me' : 'bubble you'}>
                                    <h2>{message.message}</h2>
                                    <span className='messageTime'>{formatTime(message.createdAt)}</span>
                                </div>
                            </div>
                        ))}

                        <div className='sendmessageinput'>
                            <input className='inputsendmessage' value={messagetosend} onChange={(e) => setmessgaetosend(e.target.value)} placeholder='Send Message....'></input>
                            <button className='buttonsendmessage' onClick={handleSendMessage}><IoIosSend size={32} /></button>
                        </div>

                    </div> : <div className='SenderInfo'>
                        <h2>{userInfo.username}</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageBox
import React, { useState, useContext, useRef, useEffect } from 'react'
import Medo from '../Assets/Medo.jpg';
import './MessageBox.css'
import axios from 'axios';
import { UserContext } from "../../Context/userContext";

const MessageBox = () => {

    const { user, forceupdate } = useContext(UserContext);
    const [userContacts, setUserContacts] = useState(null);
    let Usersdata;
    console.log(user)

    const fetchData = async () => {
        try {
            if (user) {
                let senderId = user.id;
                Usersdata = await axios.get('/Gettheusersinconversations', { params: { senderId } });
                setUserContacts(Usersdata);
            }
        } catch (error) {
            console.error('Error fetching user contacts:', error);
        }
    };

    if (!userContacts) {
        fetchData()
    }
    if (userContacts) { console.log(userContacts.data[0].username) }

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
                        {userContacts && userContacts.data.map(contact => (
                            <div className='Usercontactsbox' key={contact.id}>
                                <img src={contact.image} alt={contact.username} />
                                <div className='Usercontactsboxnameeamil'>
                                    <p className='Contactsboxusername'>{contact.username}</p>
                                    <p className='Contactsboxuseremail'>{contact.email}</p>
                                </div>
                                <p className='Contactsboxtime'>10:15 PM</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='MessageCright'>

                </div>
            </div>
        </div>
    )
}

export default MessageBox
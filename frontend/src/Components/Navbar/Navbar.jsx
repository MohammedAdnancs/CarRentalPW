import React, { useState, useContext, useEffect, useReducer } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { UserContext } from "../../Context/userContext";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetUser, login, Logoutuser } from '../../redux/slices/authslice/authslice';
import { resetmessage, resetUserContacts } from '../../redux/slices/Messagesslice/Messagesslice';
const Navbar = () => {

    const dispatch = useDispatch();
    const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth)

    const location = useLocation();
    const [menu, setMenu] = useState(location.pathname.split('/')[1] || 'Home');
    console.log(userInfo)

    useEffect(() => {
        if (isErrorlogin) {
            if (messagelogin) {
                console.log(messagelogin);
            }
        }
        if (isSucceslogin) {

        }
    }, [userInfo, isErrorlogin, isSucceslogin, messagelogin, dispatch])

    const logout = async () => {
        try {
            await dispatch(Logoutuser());
            await dispatch(resetUserContacts());
            await dispatch(resetmessage());
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <div className='navbar'>
            <div className='navlogo'>
                <p>NileDrive</p>
            </div>
            <ul className='nav-menu'>
                <li className={menu === "Home" ? 'active' : ''} onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link>{menu === "Home" ? <hr /> : <></>}</li>
                <li className={menu === "Rent" ? 'active' : ''} onClick={() => { setMenu("Rent") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Rent'>Rent</Link>{menu === "Rent" ? <hr /> : <></>}</li>
                {userInfo ? (<li className={menu === "List" ? 'active' : ''} onClick={() => { setMenu("List") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/List'>List</Link>{menu === "List" ? <hr /> : <></>}</li>) : null}
                <li className={menu === "AboutUs" ? 'active' : ''} onClick={() => { setMenu("AboutUs") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/AboutUs'>About Us</Link>{menu === "AboutUs" ? <hr /> : <></>}</li>
                <li className={menu === "Chatting" ? 'active' : ''} onClick={() => { setMenu("Chatting") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Chatting'>Messages</Link>{menu === "Chatting" ? <hr /> : <></>}</li>
                <li className={menu === "Userprofile" ? 'active' : ''} onClick={() => { setMenu("Userprofile") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Userprofile'>User profile</Link>{menu === "Userprofile" ? <hr /> : <></>}</li>
                {userInfo ? <li className={menu === "Logout" ? 'active' : ''} onClick={logout}><Link style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>{menu === "Logout" ? <hr /> : <></>}</li> : ""}
            </ul>
            <Button onClick={() => { setMenu("") }} link="/Login_signup" margintop="3dvh" backgroundColor="#C2C8C8" text="Login&Signup" width="22dvh" height="5dvh"></Button>
        </div>
    )

}

export default Navbar;

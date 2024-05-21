import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Logoutuser, resetUser } from '../../redux/slices/authslice/authslice';
import { resetmessage, resetUserContacts } from '../../redux/slices/Messagesslice/Messagesslice';
import Usericonnav from '../Usericonnav/Usericonnav';

const Navbar = () => {
    const dispatch = useDispatch();
    const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth);

    const location = useLocation();
    const [menu, setMenu] = useState(location.pathname.split('/')[1] || 'Home');
    console.log(userInfo);

    useEffect(() => {
        if (isErrorlogin) {
            if (messagelogin) {
                console.log(messagelogin);
            }
        }
        if (isSucceslogin) {
            // Add any success logic if needed
        }
    }, [userInfo, isErrorlogin, isSucceslogin, messagelogin, dispatch]);

    const logout = async () => {
        try {
            await dispatch(Logoutuser());
            await dispatch(resetUserContacts());
            await dispatch(resetmessage());
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className='navbar'>
            <div className='navlogo'>
                <p>NileDrive</p>
            </div>
            <ul className='nav-menu'>
                <li className={menu === "Home" ? 'active' : ''} onClick={() => { setMenu("Home"); }}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link>
                    {menu === "Home" && <hr />}
                </li>
                <li className={menu === "Rent" ? 'active' : ''} onClick={() => { setMenu("Rent"); }}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Rent'>Rent</Link>
                    {menu === "Rent" && <hr />}
                </li>
                {userInfo && (
                    <li className={menu === "List" ? 'active' : ''} onClick={() => { setMenu("List"); }}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/List'>List</Link>
                        {menu === "List" && <hr />}
                    </li>
                )}
                <li className={menu === "AboutUs" ? 'active' : ''} onClick={() => { setMenu("AboutUs"); }}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/AboutUs'>About Us</Link>
                    {menu === "AboutUs" && <hr />}
                </li>
                {userInfo?.email === "admin@gmail.com" && (
                    <li className={menu === "Admin" ? 'active' : ''} onClick={() => { setMenu("Admin"); }}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Admin'>Admin</Link>
                        {menu === "Admin" && <hr />}
                    </li>
                )}
                <li className={menu === "Chatting" ? 'active' : ''} onClick={() => { setMenu("Chatting"); }}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Chatting'>Messages</Link>
                    {menu === "Chatting" && <hr />}
                </li>
            </ul>
            {userInfo ? (
                <Usericonnav />
            ) : (
                <Button onClick={() => { setMenu(""); }} link="/Login_signup" margintop="3dvh" backgroundColor="#C2C8C8" text="Login&Signup" width="22dvh" height="5dvh" />
            )}
        </div>
    );
};

export default Navbar;

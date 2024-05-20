import React, { useState, useEffect, useRef } from 'react';
import './Usericonnav.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { register, resetUser, login, Logoutuser } from '../../redux/slices/authslice/authslice';
import { resetmessage, resetUserContacts } from '../../redux/slices/Messagesslice/Messagesslice';

const Usericonnav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const location = useLocation();
    const [menu, setMenu] = useState(location.pathname.split('/')[1] || 'Home');
    console.log(userInfo);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logout = async () => {
        try {
            await dispatch(Logoutuser());
            await dispatch(resetUserContacts());
            await dispatch(resetmessage());
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    const gotouserprofile = async () => {
        navigate('/Userprofile')
        setIsOpen(false);
    }
    return (
        <div className='Usericonnav' ref={menuRef}>
            <img src={userInfo.image} onClick={() => setIsOpen(!isOpen)} />

            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="menu"
            >
                <motion.ul
                    className='UL'
                    variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                            }
                        }
                    }}
                    style={{ pointerEvents: isOpen ? "auto" : "none" }}
                >
                    <motion.li className='itemul' variants={itemVariants} onClick={() => { gotouserprofile() }}>Profile</motion.li>
                    <motion.li className='itemul' variants={itemVariants} onClick={() => { logout() }}>Logout</motion.li>
                </motion.ul>
            </motion.nav>

        </div>
    );
}

export default Usericonnav;

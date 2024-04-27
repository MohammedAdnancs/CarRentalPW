import React, { useState } from 'react'
import './Navbar.css'
import LogoNav from '../Assets/LogoNav.png'
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button'
const Navbar = () => {

    const location = useLocation();
    const [menu, setMenu] = useState(location.pathname.split('/')[1] || 'Home');
    return (
        <div className='navbar'>
            <div className='navlogo'>

                <p>NileDrive</p>
            </div>
            <ul className='nav-menu'>
                <li className={menu === "Home" ? 'active' : ''} onClick={() => { setMenu("Home") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link>{menu === "Home" ? <hr /> : <></>}</li>
                <li className={menu === "Rent" ? 'active' : ''} onClick={() => { setMenu("Rent") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Rent'>Rent</Link>{menu === "Rent" ? <hr /> : <></>}</li>
                <li className={menu === "Share" ? 'active' : ''} onClick={() => { setMenu("Share") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Share'>Share</Link>{menu === "Share" ? <hr /> : <></>}</li>
                <li className={menu === "AboutUs" ? 'active' : ''} onClick={() => { setMenu("AboutUs") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/AboutUs'>About Us</Link>{menu === "AboutUs" ? <hr /> : <></>}</li>
            </ul>
            <Button onClick={() => { setMenu("") }} link="/Login_signup" margintop="3dvh" backgroundColor="#C2C8C8" text="Login&Signup" width="22dvh" height="5dvh"></Button>
        </div>
    )
}

export default Navbar
import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menu, setMenu] = useState("shop")

    return (
        <div className='navbar'>
            <div className='navlogo'>
                <img src="" alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}>Shop{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}>Men{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}>Women{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}>Kids{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button>Login</button>
                <img src="" alt="" />
                {/*<div className="nav-cart-count">0</div>*/}
            </div>
        </div>
    )
}

export default Navbar
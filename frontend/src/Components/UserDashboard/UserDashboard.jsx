import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../../Context/userContext"
import './UserDashboard.css'

const UserDashboard = () => {

    const { user, setUser } = useContext(UserContext);

    return (
        <div className='Container'>
            <h1>Dashboard</h1>
            {user ? <h2>hi user {user.username}</h2> : <h2>hi pls log in</h2>}
            {user ? <h2>hi user {user.email}</h2> : <h2>hi pls log in</h2>}
        </div>
    )

}

export default UserDashboard
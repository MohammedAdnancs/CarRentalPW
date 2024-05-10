import React, { useState } from 'react'
import Listings from '../Components/Listings/Listings'
import Users from '../Components/Users/Users'


const Admin = () => {
  return (
      <div className='Admin'>
        <Listings />
        <Users />
      </div>
  )
}

export default Admin
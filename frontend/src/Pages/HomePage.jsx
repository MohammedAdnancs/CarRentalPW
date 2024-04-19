import React, { useState } from 'react'
import Hero from '../Components/Hero/Hero'
import OurPartners from '../Components/OurPartners/ourpartners'

const Home = () => {

    return (
        <div className='Home'>
            <Hero />
            <OurPartners />
        </div>
    )
}

export default Home
import React, { useState } from 'react'
import Hero from '../Components/Hero/Hero'
import OurPartners from '../Components/OurPartners/ourpartners'
import Workingsteps from '../Components/workingsteps/workingsteps'
import Footer from '../Components/Footer/Footer'

const Home = () => {

    return (
        <div className='Home'>
            <Hero />
            <OurPartners />
            <Workingsteps />
        </div>
    )
}

export default Home
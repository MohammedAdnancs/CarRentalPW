import React, { useState } from 'react'
import Hero from '../Components/Hero/Hero'
import OurPartners from '../Components/OurPartners/ourpartners'
import Workingsteps from '../Components/workingsteps/workingsteps'
import OurReviews from '../Components/OurReviews/OurReviews'

const Home = () => {

    return (
        <div className='Home'>
            <Hero />
            <OurPartners />
            <Workingsteps />
            <OurReviews />
        </div>
    )
}

export default Home
import React, { useState } from 'react'
import MG from '../Assets/mg.png'
import Medo from '../Assets/Medo.png'
import arrowRicon from '../Assets/arrowR.png'
import arrowLicon from '../Assets/arrowL.png'
import Andrew from '../Assets/Andrew.png'
import Assem from '../Assets/Assem.png'
import Abouelwafa from '../Assets/Abouelwafa.png'

import './OurReviews.css'

const OurReviews = () => {

    const reviewsData = [
        {
            text: "I had an excellent experience with NileDrive Rentals on my recent trip. Booking online was a breeze, and their website was user-friendly. When I arrived, the staff was friendly and had all my paperwork ready. The car was clean, well-maintained, and drove smoothly throughout my trip. The return process was quick and easy. Overall, ABC Rentals provided great customer service and a reliable vehicle. Highly recommend",
            rating: 5.0,
            user: "Mohammed Adnan",
            image: MG,
            userimage: Medo
        },
        {
            text: "NileDrive Car Rentals was fantastic from start to finish. Their online booking process was simple and their rates were competitive. The staff at the rental location was professional and courteous. The car I rented was in great condition and suited my needs perfectly. Returning the car was hassle-free. DEF Car Rentals exceeded my expectations, and I will definitely use them again for my next trip.",
            rating: 4.0,
            user: "Assem Omar",
            image: MG,
            userimage: Andrew
        },
        {
            text: "My experience with NileDrive Rentals was excellent. Booking online was straightforward and their prices were very competitive. When I arrived to pick up the car, the staff was welcoming and efficient, making the process quick and easy. The car was clean, comfortable, and reliable throughout my trip. Returning the car was a breeze as well. I was impressed with GHI Rentals' professionalism and customer service, and I will definitely be using them again in the future.",
            rating: 3.0,
            user: "Assem Omar",
            image: MG,
            userimage: Assem
        },
        {
            text: "NileDrive Car Rentals provided a seamless rental experience from start to finish. Their website was easy to navigate, and I was able to find a great deal on a car that suited my needs. The staff at the rental location was friendly and helpful, ensuring that I was satisfied with the vehicle before I left. The car was well-maintained and drove smoothly. Returning the car was hassle-free, and the staff was efficient in processing my return. Overall, NileDrive Car Rentals exceeded my expectations.",
            rating: 3.0,
            user: "Abouelwafa",
            image: MG,
            userimage: Abouelwafa
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentReview = reviewsData[currentIndex];

    const renderStars = (rating) => {
        const stars = [];

        for (let i = 0; i < currentReview.rating; i++) {
            stars.push(<span id="Star" key={i} className="fa fa-star checked"></span>);
        }
        for (let i = currentReview.rating; i < 5; i++) {
            stars.push(<span id="Starno" key={i} className="fa fa-star checked"></span>);
        }
        return stars;
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
    };


    return (
        <div className='OurReviewsContainer'>
            <div className='OurReviews'>
                <div className="ReviewText">
                    <h1>Our Client's Reviews & Testimonials</h1>
                    <h2></h2>
                    <p className='blockquote' style={{ textAlign: "justify" }}>
                        {currentReview.text}
                    </p>
                    <div className='Rating'>
                        {renderStars(currentReview.rating)}
                        <span className='Rnumber'>{currentReview.rating}</span>
                    </div>
                    <div className="User">
                        <img src={currentReview.userimage} />
                        <p className='Username'>{currentReview.user}</p>
                    </div>
                </div>
                <div className='ReviewImge'>
                    <img src={currentReview.image} />
                </div>
            </div>
            <div className='arrow'>
                <button onClick={handlePrev}>
                    <img src={arrowLicon} alt='' />
                </button>
                <button onClick={handleNext}>
                    <img src={arrowRicon} alt='' />
                </button>
            </div>
        </div>
    )
}

export default OurReviews
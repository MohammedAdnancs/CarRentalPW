import React, { useRef } from 'react';
import './workingsteps.css';
import location from '../Assets/location.png';
import calendar from '../Assets/calendar.png';
import car from '../Assets/car.png';
import { motion, useScroll, useTransform } from 'framer-motion';

const Workingsteps = () => {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1],[0.6,1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1],[0.4,1]);

    return (
        <div className='ContainerWorikingSteps'>
            <p className='title'>how it works</p>
            <h2>Our Working Steps</h2>
            <div className='Steps'>
                <motion.div
                    className='Step'
                    ref={ref}
                    style={{
                        scale: scaleProgress,
                        opacity: opacityProgress,
                    }}
                >
                    <img src={location} alt="" style={{ width: "27%" }} />
                    <p className='stepname'>Choose Location</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </motion.div>

                <motion.div
                    className='Step'
                    ref={ref}
                    style={{
                        scale: scaleProgress,
                        opacity: opacityProgress,
                    }}
                >
                    <img src={calendar} alt="" style={{ width: "29%" }} />
                    <p className='stepname'>Pick Up Date</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </motion.div>
                <motion.div
                    className='Step'
                    ref={ref}
                    style={{
                        scale: scaleProgress,
                        opacity: opacityProgress,
                    }}
                >
                    <img src={car} alt="" style={{ width: "35%" }} />
                    <p className='stepname'>Book Your Car</p>
                    <p className='stepdiscription'>Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.</p>
                </motion.div>
            </div>
        </div>
    );
}

export default Workingsteps;

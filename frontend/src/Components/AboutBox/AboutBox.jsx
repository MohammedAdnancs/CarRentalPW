import React from 'react';
import picture from '../Assets/a23.png'
import './AboutBox.css';

const AboutBox = () => {
  return(
    <div className='allcon'>
      <div class="Aparent">
        <div class="Adiv1">
          <img src={picture}></img> 
        </div>
        <div class="Adiv2">
          <h1>About Us</h1>
        </div>
        <div class="Adiv3">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium labore,
            autem delectus rem, placeat soluta voluptatum eos modi architecto nesciunt doloremque quidem minima
            tempora harum error voluptate veniam ea excepturi?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Fuga tempore sint eius corrupti est odio autem itaque! Adipisci,
            omnis? Placeat quaerat fuga quo qui sint ab, aut incidunt laborum itaque!
          </p>
        </div>
      </div>
    </div>
  )
}
export default AboutBox
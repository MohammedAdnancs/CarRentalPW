import React, { useState } from 'react'
import './cards.css'
import Mustang1 from '../Assets/mustang1.png'
import Mustang2 from '../Assets/mustang2.png'
import car from '../Assets/car-solid.png'
import fan from '../Assets/fan.png'
import user from '../Assets/user.png'
import door from '../Assets/door.png'
import t1 from '../Assets/t1.jpg'
import t2 from '../Assets/t2.jpg'

const Cards = () => {
  return (
    <div class="Cwrapper">
    <div class="vehicle-card">
      <div class="details">      
        <div class="thumb-gallery">
          <img class="first" src={t1}/>
          <img class="second" src={t2} />        
        </div>
        <h3 class="carName">-Mustang-</h3>
        <div class="info">   
          <div class="price">
            <span>Starting at</span>
          </div>
          <h4>$120 / Day</h4>
        </div>
        <div class="grid-container">
           <div class="grid-item"><img class="Cicon" src={car}/><p>Sports</p></div>
           <div class="grid-item"><img class="Cicon" src={door}/><p>2 Doors</p></div>
           <div class="grid-item"><img class="Cicon" src={fan}/><p>AC / Heater</p></div>  
           <div class="grid-item"><img class="Cicon" src={user}/><p>2 Seats</p></div> 
        </div>
        <div class="ctas">
            <a href="#" class="btn primary">Details</a>
            <a href="#" class="btn secondary">Book</a>
              </div>
      </div>
    </div>
    <div class="vehicle-card">
      <div class="details">      
        <div class="thumb-gallery">
          <img class="first" src={Mustang1}/>
          <img class="second" src={Mustang2} />        
        </div>
        <h3 class="carName">-Mustang-</h3>
        <div class="info">   
          <div class="price">
            <span>Starting at</span>
          </div>
          <h4>$120 / Day</h4>
        </div>
        <div class="grid-container">
           <div class="grid-item"><img class="Cicon" src={car}/><p>Sports</p></div>
           <div class="grid-item"><img class="Cicon" src={door}/><p>2 Doors</p></div>
           <div class="grid-item"><img class="Cicon" src={fan}/><p>AC / Heater</p></div>  
           <div class="grid-item"><img class="Cicon" src={user}/><p>2 Seats</p></div> 
        </div>
        <div class="ctas">
            <a href="#" class="btn primary">Details</a>
            <a href="#" class="btn secondary">Book</a>
              </div>
      </div>
    </div>
    <div class="vehicle-card">
      <div class="details">      
        <div class="thumb-gallery">
          <img class="first" src={Mustang1}/>
          <img class="second" src={Mustang2} />        
        </div>
        <h3 class="carName">-Mustang-</h3>
        <div class="info">   
          <div class="price">
            <span>Starting at</span>
          </div>
          <h4>$120 / Day</h4>
        </div>
        <div class="grid-container">
           <div class="grid-item"><img class="Cicon" src={car}/><p>Sports</p></div>
           <div class="grid-item"><img class="Cicon" src={door}/><p>2 Doors</p></div>
           <div class="grid-item"><img class="Cicon" src={fan}/><p>AC / Heater</p></div>  
           <div class="grid-item"><img class="Cicon" src={user}/><p>2 Seats</p></div> 
        </div>
        <div class="ctas">
            <a href="#" class="btn primary">Details</a>
            <a href="#" class="btn secondary">Book</a>
              </div>
      </div>
    </div>
    <div class="vehicle-card">
      <div class="details">      
        <div class="thumb-gallery">
          <img class="first" src={Mustang1}/>
          <img class="second" src={Mustang2} />        
        </div>
        <h3 class="carName">-Mustang-</h3>
        <div class="info">   
          <div class="price">
            <span>Starting at</span>
          </div>
          <h4>$120 / Day</h4>
        </div>
        <div class="grid-container">
           <div class="grid-item"><img class="Cicon" src={car}/><p>Sports</p></div>
           <div class="grid-item"><img class="Cicon" src={door}/><p>2 Doors</p></div>
           <div class="grid-item"><img class="Cicon" src={fan}/><p>AC / Heater</p></div>  
           <div class="grid-item"><img class="Cicon" src={user}/><p>2 Seats</p></div> 
        </div>
        <div class="ctas">
            <a href="#" class="btn primary">Details</a>
            <a href="#" class="btn secondary">Book</a>
              </div>
      </div>
    </div>
    <div class="vehicle-card">
      <div class="details">      
        <div class="thumb-gallery">
          <img class="first" src={Mustang1}/>
          <img class="second" src={Mustang2} />        
        </div>
        <h3 class="carName">-Mustang-</h3>
        <div class="info">   
          <div class="price">
            <span>Starting at</span>
          </div>
          <h4>$120 / Day</h4>
        </div>
        <div class="grid-container">
           <div class="grid-item"><img class="Cicon" src={car}/><p>Sports</p></div>
           <div class="grid-item"><img class="Cicon" src={door}/><p>2 Doors</p></div>
           <div class="grid-item"><img class="Cicon" src={fan}/><p>AC / Heater</p></div>  
           <div class="grid-item"><img class="Cicon" src={user}/><p>2 Seats</p></div> 
        </div>
        <div class="ctas">
            <a href="#" class="btn primary">Details</a>
            <a href="#" class="btn secondary">Book</a>
              </div>
      </div>
    </div>
   </div>
  )
}
export default Cards
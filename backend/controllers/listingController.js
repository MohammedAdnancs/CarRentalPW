const Listing = require('../models/Listing');
const { useNavigate } = require('react-router-dom')

const test = (req, res) => {
  res.json('test is working')
}

const AddListing = async (req, res) => {
  try {
      const { carName, carType, numDoors ,numSeats, price, location, description, carImage1,  carImage2} = req.body;
      
      const listing = await Listing.create({
        carName,
        carType,
        numDoors,
        numSeats,
        price,
        location,
        description,
        carImage1,
        carImage2
      })
      return res.json(listing)

  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  AddListing,
}
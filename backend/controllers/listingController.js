const Listing = require('../models/Listing');
const { useNavigate } = require('react-router-dom')
const { cloudinary } = require('../helpers/cloudinary')


const test = (req, res) => {
  res.json('test is working')
}

const AddListing = async (req, res) => {
  try {
      const { carName, carType, numDoors ,numSeats, price, location, description, ImageUrl1, ImageUrl2} = req.body;

      let image1;
      let image2;


      if(ImageUrl1)
        {
          const List_upload_image_response = await cloudinary.uploader.upload(ImageUrl1, {
            upload_preset: "ListingImages_preset"
        })
        const response = List_upload_image_response.secure_url
        image1 = response;
        }

        if(ImageUrl2)
          {
            const List_upload_image_response = await cloudinary.uploader.upload(ImageUrl2, {
              upload_preset: "ListingImages_preset"
          })
          const response = List_upload_image_response.secure_url
          image2 = response;
          }

          console.log(image1)
          console.log(image2)

      const listing = await Listing.create({
        carName,
        carType,
        numDoors,
        numSeats,
        price,
        location,
        description,
        image1,
        image2
      })
      return res.json(listing)
  } catch (error) {
      console.log(error)
  }
}

const ViewAllListing = async (req, res) => {
    Listing.find()
    .then(listings => res.json(listings))
    .catch(err => res.json(err))
}

module.exports = {
  ViewAllListing,
  AddListing,
}
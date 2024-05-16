const Listing = require('../models/Listing');
const { cloudinary } = require('../helpers/cloudinary');

const test = (req, res) => {
  res.json('test is working');
}

const AddListing = async (req, res) => {
  try {
    const { carName, carType, numDoors, numSeats, price, location, description, ImageUrl1, ImageUrl2, userId } = req.body;

    let image1;
    let image2;

    if (ImageUrl1) {
      const List_upload_image_response = await cloudinary.uploader.upload(ImageUrl1, {
        upload_preset: "ListingImages_preset"
      });
      image1 = List_upload_image_response.secure_url;
    }

    if (ImageUrl2) {
      const List_upload_image_response = await cloudinary.uploader.upload(ImageUrl2, {
        upload_preset: "ListingImages_preset"
      });
      image2 = List_upload_image_response.secure_url;
    }

    const listing = await Listing.create({
      carName,
      carType,
      numDoors,
      numSeats,
      price,
      location,
      description,
      image1,
      image2,
      userId
    });
    return res.json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while adding the listing' });
  }
}

const ViewAllListing = async (req, res) => {
  Listing.find()
    .then(listings => res.json(listings))
    .catch(err => res.status(500).json({ error: 'An error occurred while fetching listings' }));
}

// New function to view a specific listing by ID
const ViewListing = async (req, res) => {
  const { _id } = req.params;
  try {
    const listing = await Listing.findById(_id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    return res.json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the listing' });
  }
}

module.exports = {
  ViewAllListing,
  AddListing,
  ViewListing, // Export the new function
}

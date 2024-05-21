const Listing = require('../models/Listing');
const { cloudinary } = require('../helpers/cloudinary');
const User = require('../models/User');

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

const ViewListing = async (req, res) => {
  const { _id } = req.params;
  try {
    const listing = await Listing.findById(_id);
    const Lister = await User.findById(listing.userId)
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    const Data = { listing, Lister }
    return res.json(Data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the listing' });
  }
}

const DeleteListing = async (req, res) => {
  const { _id } = req.body;
  console.log(_id)
  try {
    const listing = await Listing.findById(_id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.image1) {
      const imageName1 = listing.image1.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(imageName1);
    }
    if (listing.image2) {
      const imageName2 = listing.image2.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(imageName2);
    }

    await Listing.deleteOne({ _id: _id });
    return res.json({ message: 'Listing deleted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the listing' });
  }

}

module.exports = {
  ViewAllListing,
  AddListing,
  ViewListing,
  DeleteListing,  // Add the DeleteListing function to module exports
  test
}

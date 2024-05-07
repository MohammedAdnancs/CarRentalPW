const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
    carName: String,
    carType: String,
    numDoors: Number,
    numSeats: Number,
    price: Number,
    location: String,
    description: String,
    image1: String,
    image2: String,
    ownerId: String
});

const ListingModel = mongoose.model('Listing', listingSchema);

module.exports = ListingModel;

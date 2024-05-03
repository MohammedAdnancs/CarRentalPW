const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
    carName: String,
    carType: String,
    numDoors: Number, // Corrected data type
    numSeats: Number, // Corrected data type
    price: Number, // Corrected data type
    location: String,
    description: String,
    carImage1: Buffer,
    carImage2: Buffer
});

const ListingModel = mongoose.model('Listing', listingSchema);

module.exports = ListingModel;

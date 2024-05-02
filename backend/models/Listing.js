const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
    Name: String,
    Type: String,
    Price: Number,
    Doors: String,
    Seats: String,
    UserEmail:String,
    UserName: String,
    PriceRange: String,
    Image1: Buffer,
    Image2: Buffer
});

const ListingModel = mongoose.model('Listing', listingSchema);

module.exports = ListingModel;

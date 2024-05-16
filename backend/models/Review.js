const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    reviewe: String,
    starnum: String
}, { timestamps: true })

const Review = mongoose.model("Reviews", reviewSchema)

module.exports = Conversation;
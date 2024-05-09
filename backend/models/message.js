const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model("Messages", messageSchema)

module.exports = Message;
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        default: []
    }]
}, { timestamps: true })

const Conversation = mongoose.model("Conversations", conversationSchema)

module.exports = Conversation;
const Conversation = require('../models/conversation');
const Message = require('../models/message');

const SendMessage = async (req, res) => {
    try {
        const { message, senderId, receiverId } = req.body;
        console.log(message)
        console.log(receiverId)
        console.log(senderId)

        console.log(message);
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(), newMessage.save()])

        //socket.io here 

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("send message controller error: ", error.message)
        res.status(500).json({ error: "server error" })
    }
}

const getMessages = async (req, res) => {
    try {

        const { senderId, receiverId } = req.body;
        console.log("senderId", senderId)
        console.log("reciverId", receiverId)

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        console.log(conversation)
        if (!conversation) {
            res.status(200).json([])
        }

        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("send message controller error: ", error.message)
        res.status(500).json({ error: "server error" })
    }
}

module.exports = {
    SendMessage,
    getMessages
}

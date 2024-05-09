const Conversation = require('../models/conversation');
const Message = require('../models/message');

const SendMessage = async (req, res) => {
    try {
        const { message, senderId } = req.body;
        const { id: receiverId } = req.params;
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
        const { senderId } = req.body;
        const { id: receiverId } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        res.status(200).json(conversation.messages)

        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.messages;
        return res.status(200).json(messages);
    } catch (error) {
        console.log("send message controller error: ", error.message)
        res.status(500).json({ error: "server error" })
    }
}
module.exports = {
    SendMessage,
    getMessages
}
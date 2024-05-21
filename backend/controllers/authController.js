const User = require('../models/User');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const { hashPassowrd, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const { useNavigate } = require('react-router-dom')
const axios = require('axios')
const multer = require('multer')

const test = (req, res) => {
    res.json('test is working')
}

const { cloudinary } = require('../helpers/cloudinary')

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const image = "";
        const exist = await User.findOne({ email }) //if true same eamil was fond in db
        if (exist) {
            return res.status(400).json({
                error: "Email is taken already"
            });

        }

        const hashedPassword = await hashPassowrd(password)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            image,
        })

        return res.json(user)

    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }) //if true same eamil was fond in db

        if (!user) {
            return res.status(400).json({
                error: "No user found"
            });
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(400).json({
                error: "wrong password"
            });
        }

        if (match) {
            const token = jwt.sign({ id: user._id, email: user.email, username: user.username, image: user.image }, process.env.JWT_Secret, { expiresIn: "6h" })
            const profile = { id: user._id, email: user.email, username: user.username, image: user.image, token: token }
            res.cookie("token", token).json(profile);
        }

    } catch (error) {
        console.log(error)
    }
}

const getProfileUser = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_Secret, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: "Logout successful" });
    return res.json("Logout successful")
}

const EditUser = async (req, res) => {
    try {
        const { imageurl, newusername, newemail, userid, oldimage, oldname, oldemail } = req.body;

        let image;
        let username;
        let email;

        if (imageurl) {
            const User_upload_image_response = await cloudinary.uploader.upload(imageurl, {
                upload_preset: "Userimages_preset"
            })
            const response = User_upload_image_response.secure_url
            image = response;
        } else {
            image = oldimage;
        }
        if (newusername) {
            username = newusername;
        } else {
            username = oldname;
        }
        if (newemail) {
            email = newemail;
        } else {
            email = oldemail;
        }

        await User.updateOne({ _id: userid }, {
            $set: {
                username: username,
                email: email,
                image: image
            }
        })

        const updatedUser = await User.findById(userid);

        //Generate a new token with updated user information
        const token = jwt.sign({
            id: updatedUser._id,
            email: updatedUser.email,
            username: updatedUser.username,
            image: updatedUser.image
        }, process.env.JWT_Secret, { expiresIn: "6h" });

        const profile = { id: updatedUser._id, email: updatedUser.email, username: updatedUser.username, image: updatedUser.image, token: token }
        // Send the new token back to the client
        res.cookie("token", token).json(profile);
    } catch (error) {
        console.log(error);
        res.json({ msg: "something went wrong" })
    }
}

const Gettheusersinconversations = async (req, res) => {
    try {
        const senderId = req.query.senderId;
        console.log("Sender ID:", senderId);

        const conversations = await Conversation.find({
            participants: { $in: [senderId] }
        }).populate("participants")

        let Users = [];

        conversations.forEach(conversation => {
            if (conversation.participants) {
                const participants = conversation.participants.filter(participant => participant._id != senderId);
                participants[0].password = "";
                Users.push(participants[0]);
            }
        });

        return res.status(200).json(Users)

    } catch (error) {
        console.log("send message controller error: ", error.message)
        res.status(500).json({ error: "server error" })
    }

}

const ViewAllUsers = async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

const DeleteUser = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.deleteOne({ _id: _id });
        return res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the User' });
    }

}

module.exports = {
    registerUser,
    loginUser,
    getProfileUser,
    logoutUser,
    EditUser,
    ViewAllUsers,
    Gettheusersinconversations,
    DeleteUser,
    test
}
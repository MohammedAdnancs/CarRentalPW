const User = require('../models/User');
const { hashPassowrd, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const { useNavigate } = require('react-router-dom')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

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
            password: hashedPassword
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
            const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_Secret, { expiresIn: "1h" })
            res.cookie("token", token).json(user);
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
}

module.exports = {
    registerUser,
    loginUser,
    getProfileUser,
    logoutUser,
    test
}
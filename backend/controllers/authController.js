const User = require('../models/User')
const { hashPassowrd, comparePassword } = require('../helpers/auth')
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
        if (match) {
            res.json('password match')
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    test
}
const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    image: String
}, { timestamps: true })

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel;
require('dotenv').config()
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "dbjv7n54i",
    api_key: "528327411484237",
    api_secret: "W54ziEZQaQuKd8FCRaPYJ6NhRfc"
})

module.exports = { cloudinary };

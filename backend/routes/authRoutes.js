const express = require('express')
const router = express.Router();
const cors = require('cors');
const { test, loginUser, registerUser, getProfileUser, logoutUser } = require('../controllers/authController')
const {AddListing} = require('../controllers/listingController')


router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/AddListing', AddListing)
router.get('/profile', getProfileUser)

module.exports = router;
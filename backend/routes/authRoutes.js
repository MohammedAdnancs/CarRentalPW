const express = require('express')
const router = express.Router();
const cors = require('cors');
const { test, loginUser, registerUser, getProfileUser, logoutUser, Useruploadimage } = require('../controllers/authController')
const { AddListing, ViewAllListing } = require('../controllers/listingController')
const multer = require('multer')

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));
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
router.get('/ViewAllListing', ViewAllListing)
router.post('/Useruploadimage', Useruploadimage)

module.exports = router;
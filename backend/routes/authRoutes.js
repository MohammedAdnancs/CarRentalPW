const express = require('express')
const router = express.Router();
const cors = require('cors');
const { test, loginUser, registerUser, getProfileUser, logoutUser, EditUser, Gettheusersinconversations, ViewAllUsers, DeleteUser } = require('../controllers/authController')
const { AddListing, ViewAllListing, ViewListing, DeleteListing, EditListing } = require('../controllers/listingController')
const { SendMessage, getMessages } = require('../controllers/MessagingController')
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
router.post('/EditUser', EditUser)
router.get('/ViewAllUsers', ViewAllUsers)
router.post('/Send', SendMessage)
router.get('/ViewListing/:_id', ViewListing);
router.post('/DeleteListing', DeleteListing);
router.post('/DeleteUser', DeleteUser);
router.post('/Getmessages', getMessages)
router.post('/EditListingUser', EditListing)
router.get('/Gettheusersinconversations', Gettheusersinconversations)
module.exports = router; 
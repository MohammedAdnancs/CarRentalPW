const express = require('express')
const router = express.Router();
const cors = require('cors');
const { test, loginUser, registerUser } = require('../controllers/authController')


router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
module.exports = router;
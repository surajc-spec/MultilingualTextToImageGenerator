const express = require('express')
const router = express.Router()
const authRoutes = require('../controllers/auth.controller')

router.post('/register',authRoutes.registerUser)
router.post('/login',authRoutes.loginUser)

module.exports = router
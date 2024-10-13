const express = require('express')
const router = express.Router()
const swiftController = require('../Controllers/swiftController')

router.post('/send-otp',swiftController.sendOTP)

router.post('/swift',swiftController.submitswift)

module.exports = router;
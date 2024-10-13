const express = require('express')
const router = express.Router()

const atsController = require("../Controllers/atsController")


router.post('/ATS',atsController.submitATS)

router.post('/send-otp',atsController.sendOTP)

module.exports =router
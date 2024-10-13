const express = require('express')
const withdrawalController = require('../Controllers/withdrawalController')

const router = express.Router()

router.post('/withdrawal',withdrawalController.submitWithdrawal)

router.post('/send-otp',withdrawalController.sendOTP)


module.exports =router
const express = require('express')
const depositController = require('../Controllers/depositController')

const router = express.Router()

router.post('/deposit',depositController.submitDeposit)

router.post('/send-otp',depositController.sendOTP)


module.exports =router
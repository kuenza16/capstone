const express = require('express');
const rtgsController = require('../Controllers/rtgsController'); // Assuming rtgsController is in the Controllers folder

const router = express.Router();

// POST route to handle RTGS submission
router.post('/rtgs', rtgsController.submitRTGS);

router.post('/send-otp',rtgsController.sendOTP)

module.exports = router;

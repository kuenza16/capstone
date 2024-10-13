const express = require('express')
const router = express.Router()
const viewController = require('../Controllers/viewController')


router.get('/', viewController.getToken)

router.get('/onlinetoken', viewController.getBookOnlineToken)

router.get('/tokenOption', viewController.getTokenOptions)

router.get('/cashToken', viewController.getCashToken)

router.get('/DepositToken', viewController.getDepositToken)

router.get('/WithdrawalToken', viewController.getWithdrawalToken)

router.get('/rtgs', viewController.getRTGS)

router.get('/swift_edu',viewController.getswift_edu)

router.get('/swift',viewController.getswift)

router.get('/check_token',viewController.getcheck_token)

router.get('/ats',viewController.getats)

router.get('/dollerselling',viewController.getdollarSelling)
module.exports = router
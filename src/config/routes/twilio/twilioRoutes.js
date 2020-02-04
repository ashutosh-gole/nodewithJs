const router = require("express").Router();

const smsUtility = require("../../twilio/smsUtility");

router.post('/send-sms', smsUtility.sendSMS);

module.exports = router;
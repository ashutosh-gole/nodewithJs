const router = require("express").Router();

const smsUtility = require("../../twilio/smsUtility");
const whatsappUtility = require("../../twilio/whatsappUtility");

router.post('/send-sms', smsUtility.sendSMS);
router.post('/send-whatsapp-sms', whatsappUtility.sendWhatsappSMS);

module.exports = router;
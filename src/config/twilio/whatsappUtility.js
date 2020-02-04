const async = require('async');

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const whatsappNumbersToMessage = [
    process.env.CELL_PHONE_WHATSAPP_NUMBER1,
    process.env.CELL_PHONE_WHATSAPP_NUMBER2,
    process.env.CELL_PHONE_WHATSAPP_NUMBER3
];

module.exports = {

    sendWhatsappSMS: function (request, response) {
        const { message, mediaUrl, persistentAction } = request.body;

        // async.each(whatsappNumbersToMessage, (number, resp) => {
        client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${process.env.CELL_PHONE_WHATSAPP_NUMBER1}`,
            body: message,
            // mediaUrl: mediaUrl,
            persistentAction: ["geo:37.787890,-122.391664|375 Beale St"],
        }, (err, res) => {
            err ? response.status(500).send({ message: err }) : response.status(200).send({ message: 'Succesfully Sent all messages' });
            // resp();
        });
        // }, (err) => {
        //     err ? response.status(500).send({ message: err }) : response.status(200).send({ message: 'Succesfully Sent all messages' })
        // })

    }

}
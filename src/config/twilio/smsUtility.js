const async = require('async');

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const numbersToMessage = [
    process.env.CELL_PHONE_NUMBER1,
    process.env.CELL_PHONE_NUMBER2,
    process.env.CELL_PHONE_NUMBER3,
    process.env.CELL_PHONE_NUMBER4
];

module.exports = {

    sendSMS: function (request, response) {
        const { message, mediaUrl } = request.body;

        async.each(numbersToMessage, (number, resp) => {
            client.messages.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: number,
                body: message,
                mediaUrl: mediaUrl,
            }, (err, res) => {
                err ? response.status(500).send({ message: err }) : null;
                resp();
            });
        }, (err) => {
            err ? response.status(500).send({ message: err }) : response.status(200).send({ message: 'Succesfully Sent all messages' })
        })

    }

}
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

        numbersToMessage.forEach((toNumber) => {
            client.messages.create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: toNumber,
                body: message,
                mediaUrl: mediaUrl,
            }, (err, res) => {
                console.log(res);
                err ? response.send(err) : response.send(res)
            });
        });

    }

}
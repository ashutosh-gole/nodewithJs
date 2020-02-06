const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports = {

    'sendMail': async function (mailOptions) {
        return await smtpTransport.sendMail(mailOptions)
    }

}
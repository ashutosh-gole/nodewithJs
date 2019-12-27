const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports = {

    'sendMail': function (mailOptions, callback) {
        smtpTransport.sendMail(mailOptions, (err, res) => {
            err ? callback(err, null) : callback(null, 'Mail Sent Successfully')
        });
    }

}
const async = require('async');
const baseUrl = "https://www.shenovi.com/shenovi/home";
const UserSchema = require('../../dataAccess/schemas/UserSchema');
const utility = require('../../../config/middlewares/utility');

module.exports = {
    signup: function (user, callback) {
        console.log(user);
        async.waterfall([
            (done) => {
                UserSchema.create(user, (err, res) => {
                    err ? done(err, null) : done(null, res)
                });
            },
            (prevRes, done) => {
                const mailOptions = {
                    from: process.env.EMAIL, // sender address
                    to: prevRes.email, // list of receivers
                    subject: 'Account Verification Request', // Subject line
                    html: this.userVerifyHtml(prevRes)// plain text body
                };

                utility.sendMail(mailOptions, (err, res) => {
                    err ? done(err, null) : done(null, prevRes)
                });
            }
        ], (err, resp) => {
            err ? callback(err, null) : callback(null, resp)
        })


    },

    userVerifyHtml(user) {
        const html = `<!DOCTYPE html>
        <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
        </head>
        <body>
            <div style="text-align: center">
                <img style="width: 239px;
                height: 163px;
                object-fit: contain;"
                src=${process.env.SHENOVI_LOGO_1} />
            </div>
            <div style="
            height: 35px;
            font-family: Nunito;
            font-size: 26px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 0.69;
            letter-spacing: normal;
            text-align: left;
            color: rgba(0, 0, 0, 0.87);
            padding-left: 5%">
                Hi, <strong> ${user.firstName} </strong>
            </div>
            <div style= "
            font-family: Nunito;
            font-size: 22px;
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            text-align: left;
            color: rgba(0, 0, 0, 0.6);
            padding-left: 5%;">
                <p>Please click the button below to verify your email address and join the Shenovi community:</p>
                <div style="text-align: center">
                <a href=${baseUrl}>
                <button
                style=" width: 648px;
                height: 56px;
                border-radius: 28px;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
                background-color: #1a237e;
                outline: none;">
                   <span style="  width: 186px;
                   height: 30px;
                   font-family: OpenSans;
                   font-size: 22px;
                   font-weight: 600;
                   font-style: normal;
                   font-stretch: normal;
                   letter-spacing: normal;
                   text-align: left;
                   color:#fff">Verify My Account</span>
               </button>
                </a>
                </div>
            </div>
            <br/>
            <br/>
            <div style="
            font-family: Nunito;
            font-size: 22px;
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 0.28px;
            text-align: left;
            color: rgba(0, 0, 0, 0.87);
            padding-left: 5%;
            margin-top: 24px;">
                <p>See you soon!</p>
                <p>Shenovi Community Support</p>
            </div>
        </body>
        </html>`

        return html;
    },

    findByEmail: function (email, callback) {
        console.log(email)
        UserSchema.findOne({ email: email }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    updateUser: function (userId, token, callback) {
        UserSchema.findOneAndUpdate({ _id: userId }, { token: token }, { new: true }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    },

    logout: function (token, callback) {
        UserSchema.findOneAndUpdate({ token: token }, { $unset: { token: 1 } }, { new: true }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }
}
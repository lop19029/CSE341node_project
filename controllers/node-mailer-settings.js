const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    host: "mail.sacredplanner.xyz",
    port: 465,
    secure: true,
    auth: {
        user: "nodemailer@sacredplanner.xyz", // generated ethereal user
        pass: "mTtBAXRdEf" // generated ethereal password
    }
});
const nodemailer = require("nodemailer");

function sendMessage(subject, message, to) {
    let mailer = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.MAIL_FROM,
        to: to,
        subject: subject,
        html: message,
    };

    mailer.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    sendMessage
}
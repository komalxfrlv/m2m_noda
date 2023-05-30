const nodemailer = require("nodemailer");
var http = require('http');
var querystring = require('querystring');

/*function sendMessage(subject, message, to) {
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
}*/

function postEmailReq(email, content, next) {
    try{
    // Build the post string from an object
    var post_data = querystring.stringify({
        'email' : email,
        'content': content
    });
  
    // An object of options to indicate where to post to
    var post_options = {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        path: '/api/mail',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
  
    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
  console.log(post_data)
    // post the data
    post_req.write(post_data);
    post_req.end();
}
catch(err){
    next(err)
}
  
  }

module.exports = {
    postEmailReq
}
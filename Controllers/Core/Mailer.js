var nodemailer = require('nodemailer');
var config = require('../../app/ConfigFiles/config.json');
var fs = require('fs');

var mail = {

    registerOTP: function (subject, toEmail, otp) {
        fs.readFile("./app/ConfigFiles/Register.html", function (err, data) {
            if (!err) {
                var str = data.toString();
                var html = str.replace("%s", otp);
                var html1 = html.replace("%m", toEmail);
                sendMail(toEmail, subject, html1);
            } else {
                console.log(err);
            }
        });
    },
    forgotpassword: function (subject, toEmail, resetLink) {
        fs.readFile("./app/ConfigFiles/ForgotPassword.html", function (err, data) {
            if (!err) {
                var str = data.toString();
                var html = str.replace("%s", resetLink);
                var html1 = html.replace("%m", toEmail);
                sendMail(toEmail, subject, html1);
            } else {
                console.log(err);
            }
        });
    },
    passwordChangeSuccess: function (subject, toEmail,email) {
        fs.readFile("./app/ConfigFiles/ChangePassword.html", function (err, data) {
            if (!err) {
                var html1 = data.toString();
                html1 = html1.replace("#USERNAME#", toEmail);
                html1 = html1.replace("#CONTACTUS_LINK", toEmail);
                sendMail(toEmail, subject, html1);
            } else {
                console.log(err);
            }
        });
    },
}
function sendMail(toEmail, subject, html1, attachments) {
    var transporter = nodemailer.createTransport({
        service: config.mailService,
        port: 465,
        secure: true,
        auth: {
            user: config.authMail,
            pass: config.authMailPassword,
        },
    });

    var mailOptions = {
        from: config.fromMail,
        to: toEmail,
        subject: subject,
        html: html1,
    };
    if (typeof attachments !== "undefined") {
        mailOptions = {
            from: config.fromMail,
            to: toEmail,
            subject: subject,
            html: html1,
            attachments: attachments,
        };
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
module.exports = mail;
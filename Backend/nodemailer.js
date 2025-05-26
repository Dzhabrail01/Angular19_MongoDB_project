const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
    user: 'rachael.gusikowski58@ethereal.email',
    pass: 'qB4UXj3QDSZvwYdTYm'
    }
   });

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Email sent: ", info);
      return console.log(err);
    }
  });
};

module.exports = mailer;
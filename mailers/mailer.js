const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.mailOptions = {
      from: process.env.EMAIL_USER,
    };
  }

  send() {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(true);
      });
    });
  }
}

module.exports = {
  Mailer,
};

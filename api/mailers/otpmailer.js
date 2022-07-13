const { Mailer } = require("./mailer");

class OTPMailer extends Mailer {
  constructor(to, code) {
    super();

    this.mailOptions = {
      to,
      subject: "Súper Pay: Código de verificación",
      html: this.buildHTML(to, code),
      ...this.mailOptions,
    };
  }

  buildHTML(to, code) {
    return `
            <h1>Tú código de verificación es:</h1>
            <h2>${code}</h2>
            <hr/>
            <p>
            Hola ${to},<br/>
            Solo necesitamos verificar su dirección de correo electrónico antes de que pueda acceder a la Super App${"\u00ae"}.<br/>
            Copie el código de verificación y vaya al link:<br/><br/>
            
            <a href="https://dev.moneyapp.pro/auth/verify-email?email=${to}">https://dev.moneyapp.pro/auth/verify-email</a><br/><br/><br/>
            ¡Muchas Gracias! - El equipo de Super App.</p>
        `;
  }
}

module.exports = { OTPMailer };

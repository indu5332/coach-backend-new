const sgMail = require("@sendgrid/mail");
const config=require('config')

sgMail.setApiKey(
  config.sgMail
);

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: "killingspirit5332@gmail.com",
    subject: "reset password",
    templateId: "d-53a4060c0bc04fcba8e2885cf3930516",
    dynamic_template_data: data.templateData,
  };
  sgMail.send(msg, (error, res) => {
    if (error) {
      console.log(error.response.body.errors);
      return error.response.body.errors;
    } else {
      console.log("sent", res);
    }
  });
}
exports.sendEmail = sendEmail;
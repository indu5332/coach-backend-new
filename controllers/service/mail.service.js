require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: "nairagarg999@gmail.com",
    subject: "reset password",
    templateId: "d-28bf459e021246238048f37aa0db813f",
    dynamic_template_data: data.templateData,
  };
  sgMail.send(msg, (error, res) => {
    if (error) {
      console.log(error.response.body.errors);
      return error;
    } else {
      console.log("sent", res);
    }
  });
}
module.exports = { sendEmail };
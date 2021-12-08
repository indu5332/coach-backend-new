const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"  
);

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: "killingspirit5332@gmail.com",
    subject: "reset password",
    templateId:"d-3a1855f16b96476fbce9d9f3aa76e4c0",
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
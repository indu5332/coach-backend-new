const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: "support@illfact.com",
    subject: "reset password",
    templateId: "d-cebc56d4ab524d6cbb569e6280f91aa1",
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
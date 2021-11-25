const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(data) {
  const msg = {
    to: data.email,
    from: "nairagarg999@gmail.com",
    subject:"reset password",
    templateId:"d-21b1aea97d07403699ed550e4299e3bd",
    cc:"hey",
    dynamic_template_data: data.templateData,
  }
  sgMail.send(msg, (error, res) => {
    if (error) {
      return error.response.body.errors;
    } else {
      console.log("sent", res);
    }
  });
}
exports.sendEmail=sendEmail;

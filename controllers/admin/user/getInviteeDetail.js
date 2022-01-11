var axios = require("axios").default;

//gallery detail
let getInvitee = async (req, res, next) => {
  try {
    var opt = {
      method: "GET",
      url: `https://api.calendly.com/scheduled_events/${req.params.uuid}/invitees`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQxODA0NjE0LCJqdGkiOiI1ZTlmMTEwNy1iMjU2LTRkOTItYmRhZC00MTM2MmFhNmY5ZGEiLCJ1c2VyX3V1aWQiOiI1NzIzMGJjNi02OWVjLTQ3MDYtOWNiMC1mY2QwYTZjMmZhNzgifQ.sB28jZMEHdJKKQLXA7b7Kw8KNvQicsAQWfYH1DheBUw",
      },
    };
    axios.request(opt).then(function (invitee) {
      return res.status(200).json({
        success: true,
        message: "invitee detail",
        invitee: invitee.data.collection[0],
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "no invitee found",
    });
  }
};

module.exports = [getInvitee];
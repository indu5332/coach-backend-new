var axios = require("axios").default;

//gallery detail
let getInviteeDetail = async (req, res, next) => {
  try {
    var opt = {
      method: "GET",
      url: `https://api.calendly.com/scheduled_events/${req.params.event_uuid}/invitees/${req.params.invitee_uuid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQxODA0NjE0LCJqdGkiOiI1ZTlmMTEwNy1iMjU2LTRkOTItYmRhZC00MTM2MmFhNmY5ZGEiLCJ1c2VyX3V1aWQiOiI1NzIzMGJjNi02OWVjLTQ3MDYtOWNiMC1mY2QwYTZjMmZhNzgifQ.sB28jZMEHdJKKQLXA7b7Kw8KNvQicsAQWfYH1DheBUw",
      },
    };
    axios.request(opt).then(function (invitee) {
      if(invitee.data){
        if(req.decoded.email===invitee.data.resource.email){
            return res.status(200).json({
                success: true,
                message: "invitee detail",
                invitee: invitee.data.resource,
              });
          }
          else{
            return res.status(404).json({
                success: false,
                message: "no event for you"
            });
          }
      }
      else{
        return res.status(400).json({
            success: false,
            message: "no event found"
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "no invitee found",
    });
  }
};

module.exports = [getInviteeDetail];
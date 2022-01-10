const request = require("request");

//gallery detail
let getdetail = async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.calendly.com/scheduled_events",
      qs: {user: 'https://api.calendly.com/users/57230bc6-69ec-4706-9cb0-fcd0a6c2fa78'},
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQxODA0NjE0LCJqdGkiOiI1ZTlmMTEwNy1iMjU2LTRkOTItYmRhZC00MTM2MmFhNmY5ZGEiLCJ1c2VyX3V1aWQiOiI1NzIzMGJjNi02OWVjLTQ3MDYtOWNiMC1mY2QwYTZjMmZhNzgifQ.sB28jZMEHdJKKQLXA7b7Kw8KNvQicsAQWfYH1DheBUw'
  }
    };

    request(options, async function (error, response, body) {
      console.log(JSON.parse(body));
    });
    await Promise.all(
      JSON.parse(body).collection.map(async (invitees) => {
        const opt = {
          method: 'GET',
          url: `${invitees.uri}/invitees`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQxODA0NjE0LCJqdGkiOiI1ZTlmMTEwNy1iMjU2LTRkOTItYmRhZC00MTM2MmFhNmY5ZGEiLCJ1c2VyX3V1aWQiOiI1NzIzMGJjNi02OWVjLTQ3MDYtOWNiMC1mY2QwYTZjMmZhNzgifQ.sB28jZMEHdJKKQLXA7b7Kw8KNvQicsAQWfYH1DheBUw'
          }
        };
        request(opt, async function (error, response, data) {
          console.log(JSON.parse(data));
          return res.status(200).json({
            success: true,
            message: "event list",
            total: JSON.parse(data).collection.length,
            events: JSON.parse(data),
          });
        });
      })
    );
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "event list",
    });
  }
};

module.exports = [getdetail];
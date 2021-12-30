const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  authentication: (token) => {
    try {
      if (token) {
        return jwt.verify(token, config.secret, (err, decode) => {
          if (err) {
            return [err, "fail to verify token"];
          }
          return [decode];
        });
      }

      return ["no token found"];
    } catch (error) {
      return [error];
    }
  },
};
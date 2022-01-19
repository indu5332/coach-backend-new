const AWS = require("aws-sdk");
const cred = require('config');

AWS.config.update({
  accessKeyId: `${cred.aws.ID}`,
  secretAccessKey: `${cred.aws.KEY}`,
});

module.exports = new AWS.S3();
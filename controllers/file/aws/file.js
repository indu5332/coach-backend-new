const config = require("config");
const AWS = require("aws-sdk");
const cred = require("../../../middleware/awsKey");

AWS.config.update({
  accessKeyId: `${cred.aws.ID}`,
  secretAccessKey: `${cred.aws.KEY}`,
});

const s3 = new AWS.S3();

module.exports = {
  getFiles: async (folderPath) => {
    try {
      const params = { Bucket: config.bucket, Key: folderPath };
      console.log("imageparams", params);
      const files = await s3.getSignedUrl("getObject", params);
      console.log(files);
      return files;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  listFile: async (prefix) => {
    try {
      const params = {
        Bucket: config.bucket,
        Delimiter: " ",
        Prefix: prefix,
      };
      return s3.listObjects(params).promise();
    } catch (error) {
      return error;
    }
  },
  sizeOf: async (key) => s3.headObject({ Key: key, Bucket: config.bucket })
    .promise()
    .then((res) => res.ContentLength),
};
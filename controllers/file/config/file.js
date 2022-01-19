const config = require("config");
const AWS = require("aws-sdk");
const cred = require('config');

AWS.config.update({
  accessKeyId: `${cred.aws.ID}`,
  secretAccessKey: `${cred.aws.KEY}`,
});

const s3 = new AWS.S3();

module.exports = {
  getFiles: async (folderPath) => {
    try {
      const params = { Bucket: config.bucket, Key: folderPath };
      const files = await s3.getSignedUrl("getObject", params);
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
        Delimiter: "",
        Prefix: prefix,
      };
      return s3.listObjectsV2(params).promise();
    } catch (error) {
      return error;
    }
  },
  sizeOf: async (key) => s3.headObject({ Key: key, Bucket: config.bucket })
    .promise()
    .then((res) => res.ContentLength),

};

// list all objects from a bucket folder
const params = {
  Bucket: "bucket-name",
  Prefix: "folder-name/",
};

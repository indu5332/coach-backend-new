/* eslint-disable consistent-return */
const config = require("config");
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");
const cred = require('config');
const Path=require('path')
const p = Path.join(`${__dirname}../../uploads`);

module.exports = {
  getS3() {
    AWS.config.update({
      accessKeyId: `${cred.aws.ID}`,
      secretAccessKey: `${cred.aws.KEY}`,
      region: "ap-southeast-2",
    });
    return new AWS.S3();
  },
  
  async uploadS3(file, folderWhereToUpload) {
    const s3 = this.getS3();
    console.log(path.join(p, `/${folderWhereToUpload}/${file}`))
    console.log(config.bucket)
    const params = {
      Bucket: config.bucket,
      Key: String(`${folderWhereToUpload}/${file}`),
      Body: fs.createReadStream(
        path.join(p, `/${folderWhereToUpload}/${file}`),
      ),
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error("Aws error upload error", err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  },
  async getFiles(folderPath) {
    try {
      const s3 =  this.getS3();
      const params =  { Bucket: config.bucket, Key: folderPath };
      const files = await s3.getSignedUrl("getObject", params);
      return files;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async listFile(prefix) {
    try {
      const s3 = this.getS3();
      const params = {
        Bucket: config.bucket,
        Delimiter: "",
        Prefix: prefix,
      };
      return s3.listObjects(params).promise();
    } catch (error) {
      return error;
    }
  },

  async sharpImage(inputPath, outputPath) {
    const image = await Jimp.read(inputPath);
    await image.quality(30);
    await image.writeAsync(outputPath);
  },
  async sizeOf(key) {
    const s3 = this.getS3();
    return s3.headObject({ Key: key, Bucket: config.bucket })
      .promise()
      .then((res) => res.ContentLength).catch((err) => console.log(err));
  },
  formatBytes(a, b = 2, k = 1024) {
    const d = Math.floor(Math.log(a) / Math.log(k));
    return a === 0 ? "0 Bytes" : `${parseFloat((a / (k ** d)).toFixed(Math.max(0, b)))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]}`;
  },
};

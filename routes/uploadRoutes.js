const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey, bucketName } = process.env; // .env

s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: bucketName,
        Key: key,
        ContentType: 'jpeg'
      },
      (err, url) => res.send({ key, url })
    );
  });
};

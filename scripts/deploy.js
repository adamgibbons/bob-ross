require('dotenv').config();

var s3 = require('s3-upload-dir');

var params = {
  localDir: 'dist',
  s3Params: {
    Bucket: process.env.AWS_S3_BUCKET
  }
};

var uploader = s3.uploadDir(params);

uploader.on('error', function (err) {
  console.error("Unable to upload:", err.stack);
});

uploader.on('progress', function () {
  console.log("progress...", uploader.progressMd5Amount,
    uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', function () {
  console.log('Upload complete');
});
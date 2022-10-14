'use strict';

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/753113110670/vendor-queue',
  handleMessage: message => {
    console.log(message.Body);
  },
});

app.on('error', (err) => {
  console.log(err.message);
});

app.on('processing_error', (err) => {
  console.log(err.message);
});

app.start();

module.exports = app;
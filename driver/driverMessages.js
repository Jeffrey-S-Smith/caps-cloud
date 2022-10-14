'use strict';
const { Consumer } = require('sqs-consumer');
const publishDeliver = require('./publishDeliver');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/753113110670/package-queue',
  handleMessage: message => {
    let body = JSON.parse(message.Body);
    let order = JSON.parse(body.Message);
    console.log('Order ready for pickup:');
    console.log(order);

    app.stop();
    setTimeout(() => {
      publishDeliver(order);
      app.start();
    }, 10000);
  },
});

app.on('error', (err) => {
  console.log(err);
});

app.on('processing_error', (err) => {
  console.log(err);
});

app.start();

module.export = app;
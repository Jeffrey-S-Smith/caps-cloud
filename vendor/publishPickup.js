'use strict';

const AWS = require('aws-sdk');
const Chance = require('chance');

const sns = new AWS.SNS({
  region: 'us-west-2',
});
const topic = 'arn:aws:sns:us-west-2:753113110670:pickup';

const chance = new Chance();

const order = {
  id: chance.guid(),
  customerName: chance.name(),
  address: chance.address(),
  vendorId: 'https://sqs.us-west-2.amazonaws.com/753113110670/vendor-queue',
};

const payload = {
  TopicArn: topic,
  Message: JSON.stringify(order),
};

module.exports = () => {
  sns.publish(payload).promise()
    .then(data => {
      console.log(`Message ID: ${data.MessageId}, drivers notified of package ready for pickup`);
    })
    .catch(err => {
      console.log(err);
    });
};
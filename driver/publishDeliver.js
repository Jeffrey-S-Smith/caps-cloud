'use strict';

const { Producer } = require('sqs-producer');

module.exports = (order) => {
  const producer = Producer.create({
    queueUrl: order.vendorId,
    region: 'us-west-2',
  });

  const message = {
    body: `Package delivered for ${order.customerName}`,
    id: order.id,
  };
  
  producer.send(message)
    .then(() => {
      console.log(`Customer notified of delivery`);
    })
    .catch(err => {
      console.log(err);
    });
};

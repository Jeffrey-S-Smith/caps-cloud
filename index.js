'use strict';

const publishPickup = require('./vendor/publishPickup');

let count = 5;
const intervalId = setInterval(() => {
  publishPickup();
  count--;
  if(count === 0) clearInterval(intervalId);
}, 3000);

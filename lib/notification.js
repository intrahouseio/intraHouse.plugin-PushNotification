const EventEmitter = require('events');


class Notification extends EventEmitter {

  constructor(options) {
    super();
  }

  send() {
    console.log('!!!')
  }

}

module.exports = Notification;

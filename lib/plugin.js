const EventEmitter = require('events');


class Plugin extends EventEmitter {

  constructor() {
    super();

    process.on('message', this.message.bind(this));
    this.unitid = process.argv[2];
    this.mode = 0;
    this.channels = [];
    this.system = {};
    this.params = {};
    this.start();
  }

  debug(data) {
    process.send({ type: 'debug', txt: data });
  }

  message(msg) {
    if (msg.type === 'get' && msg.hasOwnProperty('system')) {
      this.system = msg.system;
      this.updateMode();
    }
    if (msg.type === 'get' && msg.hasOwnProperty('params')) {
      this.params = msg.params;
      this.updateMode();
    }
    if (msg.type === 'get' && msg.hasOwnProperty('config')) {
      this.channels = msg.config;
      this.updateMode();
    }

    if (msg.type === 'act') {
      this.emit('actions', msg.data);
    }
    if (msg.type === 'command') {
      this.emit('command', msg);
    }
    if (msg.type === 'debug') {
      this.emit('debug', msg.mode);
    }
    if (msg.type === 'sub' && msg.hasOwnProperty('data')) {
      this.emit('info', msg.data);
    }
  }

  updateMode() {
    this.mode++;
    if (this.mode === 3) {
      this.mode = 4;
      this.emit('start');
    }
  }

  info() {
    this.debug('start');
    this.debug('version: 0.0.8');
  }

  send(type, data) {
    process.send(Object.assign({}, {type}, data));
  }

  start() {
    this.info();
    this.send('sub', { id: `${this.unitid}_0`, event: 'sendinfo', filter: { type: this.unitid } });
    this.send('get', { tablename: `infousers/${this.unitid}` });
    this.send('get', { tablename: `system/${this.unitid}` });
    this.send('get', { tablename: `params/${this.unitid}` });
    this.send('get', { tablename: `config/${this.unitid}` });
  }

}

module.exports = Plugin;

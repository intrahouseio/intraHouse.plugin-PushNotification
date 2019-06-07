const Plugin = require('./lib/plugin');
const Notification = require('./lib/notification');

const plugin = new Plugin();
const notification = new Notification();



plugin.on('info', data => {
  data.sendTo.forEach(user => {

  });
});

plugin.on('start', () => {
  notification.send();
});

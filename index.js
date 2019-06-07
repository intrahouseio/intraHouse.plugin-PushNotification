const Plugin = require('./lib/plugin');
const notification = require('./lib/notification');

const plugin = new Plugin();

plugin.on('info', data => {
  data.sendTo.forEach(user => {

  });
});

plugin.on('start', () => {
  notification('test1234567890')
  .then(res => {
    const msg = JSON.parse(res);
    console.log(msg);
  })
  .catch(e => console.log(e.message));
});

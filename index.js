const Plugin = require('./lib/plugin');
const notification = require('./lib/notification');

const plugin = new Plugin();

plugin.on('info', data => {
  data.sendTo.forEach(user => {
    notification({
      suuid: plugin.system.serverkey,
      token: user.addr,
      title: data.sign || '',
      body: data.txt || '',
    });
    .then(res => {
      plugin.debug(res);
    })
    .catch(e => plugin.debug(e.message));
  });
});

plugin.on('start', () => {

});

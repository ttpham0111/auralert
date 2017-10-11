var LRU = require("lru-cache");


var cache = new LRU(1000);


function list() {
  return cache.values();
}


function create(id, threshold, notify, message, cooldown) {
  var alert = {
    id: id,
    threshold: threshold,
    notify: notify,
    message: message,
    cooldown: cooldown,
    last_notify_time: 0
  };

  cache.set(id + '_' + threshold, alert);
  return alert;
}

module.exports = {
  list: list,
  create: create,
};

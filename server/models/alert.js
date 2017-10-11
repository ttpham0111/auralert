var LRU = require("lru-cache");


var cache = new LRU(1000);


function list() {
  return cache.values().map(function(alert) {
    return {
      id: alert.id,
      threshold: alert.threshold,
      message: alert.message,
      cooldown: alert.cooldown,
      last_notify_time: alert.last_notify_time
    };
  });
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
  return {
    id: alert.id,
    threshold: alert.threshold,
    message: alert.message,
    cooldown: alert.cooldown,
    last_notify_time: alert.last_notify_time
  };
}

module.exports = {
  list: list,
  create: create,
};

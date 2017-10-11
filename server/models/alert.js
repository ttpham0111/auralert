var LRU = require("lru-cache");


var cache = new LRU(1000);
// { deviceId => { threshold: Alert } }


function _getAlerts(alertsInfo) {
  if (!alertsInfo) return [];
  
  var alerts = [];
  Object.keys(alertsInfo).forEach(function(threshold) {
    var alert = alertsInfo[threshold];
    alerts.push(alert);
  });
  return alerts;
}

function list() {
  var alerts = [];
  cache.values().forEach(function(alertsInfo) {
    _getAlerts(alertsInfo).forEach(function(alert) {
      alerts.push(alert);
    });
  });
  return alerts;
}


function get(id) {
  var alertsInfo = cache.get(id);
  var alerts = [];
  _getAlerts(alertsInfo).forEach(function(alert) {
    alerts.push(alert);
  });
  return alerts;
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

  var alertsInfo = cache.get(id) || {};
  alertsInfo[threshold] = alert;
  cache.set(id, alertsInfo);

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
  get: get,
  create: create
};

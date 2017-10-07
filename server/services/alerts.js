var Alert = require('../models/alert');


function list(callback) {
  // Implement
}


function create(data, callback) {
  // Implement
}


function respond(volume, callback) {
  list(function(error, alerts) {
    if (error) return callback(error);

    alerts.forEach(function(alert) {
      if (volume > alert.threshold) {
        sendNotifications(alert.notify);  // TODO: This should either use promises or wait for all to complete.
      }
    });
  });
}


function sendNotifications(notify) {
  // Implement
}


module.exports = {
  list: list,
  create: create,
  respond: respond
};
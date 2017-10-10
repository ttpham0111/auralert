var AlertCollection = require('../models/alert');
var config = require('../config');

var client = require('twilio')(
  config.twilioAccountSID,
  config.twilioAuthToken
);

function list(callback) {
  callback(null, AlertCollection.list());
}


function create(data, callback) {
  var alert = AlertCollection.create(data.id, data.threshold, data.notify, data.message, data.cooldown);
  callback(null, alert);
}


function respond(volume, callback) {
  list(function(error, alerts) {
    if (error) return callback(error);

    var now = new Date();
    var promises = alerts.map(function(alert) {
      return new Promise(function(resolve, reject) {
        if (volume < alert.threshold) return resolve();

        var timedelta = now - alert.last_notify_time;
        var cooldown = alert.cooldown || config.notify_cooldown;
        if (timedelta > cooldown) {
          var message = alert.message || 'Alarm triggered for device ' + alert.id;
          sendNotifications(notify, message, function(error) {
            alert.last_notify_time = new Date();
            if (error) return reject(error);
            else resolve();
          });
        } else resolve();
      });
    });

    Promise.all(promises)
      .then(callback)
      .catch(callback);
  });
}


function sendNotifications(notify, message, callback) {
  client.messages.create({
    to: notify,
    from: config.twilioPhoneNumber,
    body: message,
  }, function(error, message) {
    if (error) return callback(error);
    callback(null, message);
  });
}


module.exports = {
  list: list,
  create: create,
  respond: respond
};
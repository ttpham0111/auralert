var Alert = require('../models/alert');
var configs = require('./configs');

const client = require('twilio')(
  configs.twilioAccountSID,
  configs.twilioAuthToken
);

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
  client.messages.create({
      to: "insert_your_mobile_number",
      from: configs.twilioPhoneNumber,
      body: notify
    }, function(err, message) {
      if(err){
        console.log(err);
      } else {
        console.log(message.sid);
      }
    });
}


module.exports = {
  list: list,
  create: create,
  respond: respond
};
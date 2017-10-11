var AlertsService = require('../services/alerts');


exports.list = function(request, response) {
  AlertsService.list(function(error, alerts) {
    if (error) {
      return response.status(500).json({ error: error });
    }

    var data = alerts.map(function(alert) {
      return {
        id: alert.id,
        threshold: alert.threshold,
        message: alert.message,
        cooldown: alert.cooldown,
        last_notify_time: alert.last_notify_time
      };
    });
    return response.status(200).json(data);
  });
};


exports.create = function(request, response) {
  var data = {
    id: request.body.id,
    threshold: request.body.threshold,
    notify: request.body.notify,
    message: request.body.message,
    cooldown: request.body.cooldown
  };

  if (!data.id) {
    return response.status(400).json({ error: 'The id field is required.'});
  }

  if (!data.threshold) {
    return response.status(400).json({ error: 'The threshold field is required.'});
  }

  if (!data.notify) {
    return response.status(400).json({ error: 'The notify field is required.'});
  }

  AlertsService.create(data, function(error, alert) {
    if (error) {
      return response.status(500).json({ error: error });
    }
    return response.status(202).json({
      id: alert.id,
      threshold: alert.threshold,
      message: alert.message,
      cooldown: alert.cooldown,
      last_notify_time: alert.last_notify_time
    });
  });
};
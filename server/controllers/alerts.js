var AlertsService = require('../services/alerts');


exports.list = function(request, response) {
  AlertsService.list(function(error, alerts) {
    if (error) {
      return response.status(500).json({ error: error });
    }
    return response.status(200).json(alerts);
  });
};


exports.create = function(request, response) {
  var data = {
    threshold: request.data.threshold,
    notify: request.data.notify
  };

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
    return response.status(202).json(alert);
  });
};
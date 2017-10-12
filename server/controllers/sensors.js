var AlertsService = require('../services/alerts');


exports.listen = function(request, response) {
  var deviceId = request.body.deviceId;
  var volume = request.body.volume;

  if (!deviceId) {
    return response.status(400).json({ error: 'The deviceId field is required.'});
  }

  if (!volume && volume !== 0) {
    return response.status(400).json({ error: 'The volume field is required.'});
  }

  AlertsService.respond(deviceId, volume, function(error) {
    if (error) {
      console.error(error);
      return response.status(500).json({ error: error });
    }
    return response.status(204).end();
  });
};
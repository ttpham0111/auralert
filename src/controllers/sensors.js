var AlertsService = require('../services/alerts');


exports.listen = function(request, response) {
  var volume = request.body.volume;
  AlertsService.respond(volume, function(error) {
    if (error) {
      return res.status(500).json({ error: error });
    }
    return res.status(204).end();
  });
};
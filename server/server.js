var app = require('./app');
var config = require('./config');


var server = app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});
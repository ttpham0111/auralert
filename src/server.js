var app = require('./app');
var configs = require('./configs');


var server = app.listen(configs.port, function() {
  console.log('Listening on port ' + configs.port);
});
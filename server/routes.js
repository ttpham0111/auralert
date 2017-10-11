var express = require('express');


var router = express.Router();

var SensorsController = require('./controllers/sensors');
var AlertsController = require('./controllers/alerts');


router.post('/sensors/volume', SensorsController.listen);

router.get('/alerts', AlertsController.list);
router.post('/alerts', AlertsController.create);

module.exports = router;

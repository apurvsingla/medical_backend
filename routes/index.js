var express = require('express');
var router = express.Router();
const api = require('../Controller/api')

/* GET home page. */
router.get('/', api.availableSlots);

router.post('/doctorTime', api.doctorTime);

router.get('/slot', api.selectTimeSlot);

module.exports = router;

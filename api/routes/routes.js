var express = require('express');
var path = require('path');
const { route } = require('./admin');
var router = express.Router();

router.use('/admin', require('./admin'));
router.use('/admin', require('./timeManagement'));
module.exports = router;
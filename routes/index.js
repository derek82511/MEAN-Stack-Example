var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.render('logout');
});

module.exports = router;

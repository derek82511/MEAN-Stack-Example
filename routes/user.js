var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../models/user');

router.get('/', function(req, res, next) {
	let user = req.user;

	res.json(user);
});

router.post('/register', function(req, res, next) {
	if(req.body['password_repeat'] !== req.body['password']){
		return res.json({
			error: '密碼輸入不一致。'
		});
	}

	let user = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		messages: [],
		roles: ['user']
	});

	User.register(user, req.body.password, function(err, doc) {
        if (err) {
            return res.json({
				error: err.message
			});
        }

        passport.authenticate('local')(req, res, function () {
            res.json({});
        });
    });
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	    if (err) { 
	    	return res.json({
				error: err.message
			});
	    }

	    if (!user) { 
	    	return res.json({
				error: info.message
			});
	    }
	    
	    req.logIn(user, function(err) {
		    if (err) { 
		    	return res.json({
					error: err.message
				});
		    }

		    res.json({});
	    });
	})(req, res, next);
});

module.exports = router;

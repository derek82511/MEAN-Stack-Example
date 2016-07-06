var express = require('express');
var router = express.Router();

var Message = require('../models/message');
var User = require('../models/user');

router.post('/', function(req, res, next) {
	let message = { 
		content: req.body['content'],
		user: req.body['userId']
	};

	Message.create(message, function (err, doc) {
	    if (err) return console.error(err);

	    User.update({ _id: doc.user }, { $addToSet: { messages: doc._id } }, function(err, obj){
	    	if (err) return console.error(err);

	    	res.json(doc);
	    });
	});
});

router.put('/:id', function(req, res, next) {
	Message.findOneAndUpdate({ _id: req.params['id'] }, req.body, { new: true }, function(err, doc){
	    if (err) return console.error(err);

	    res.json(doc);
	});
});

router.delete('/:id', function(req, res, next) {
	Message.findOneAndRemove({ _id: req.params['id'] }, function (err, doc) {
	  	if (err) return console.error(err);

	  	User.update({ _id: doc.user}, { $pull: { messages: doc._id } }, function(err, obj){
	  		if (err) return console.error(err);

	  		res.send();
	  	});
	});
});

router.get('/user/:id', function(req, res, next) {
	User.findOne({ _id: req.params['id'] }).populate('messages').exec()
	.then(function(userDoc){
		if(!userDoc){
			throw new Error("User not exist");
		}

		return userDoc.messages;
	})
	.then(function(result){
		res.json(result);
	})
	.then(undefined, function(err){
    	res.json({
    		error: err.message
    	});
    });
});

module.exports = router;

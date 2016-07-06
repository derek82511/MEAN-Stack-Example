let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var schema = new Schema({
	content: { type: String, required: true },
	timeStamp: { type: Date, default: Date.now },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', schema);
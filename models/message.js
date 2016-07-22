const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    content: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', schema);

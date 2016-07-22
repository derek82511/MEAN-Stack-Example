const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const passportLocalMongoose = require('passport-local-mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    roles: []
});

schema.plugin(mongooseUniqueValidator);
schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', schema);

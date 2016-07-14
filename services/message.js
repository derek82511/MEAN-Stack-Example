let co = require('co');

let Message = require('../models/message');
let User = require('../models/user');

function create(message) {
    return function(done) {
        co(function*() {
            try {
                let messageDoc = yield Message.create(message);

                yield User.update({ _id: messageDoc.user }, { $addToSet: { messages: messageDoc._id } }).exec();

                done(null, messageDoc);
            } catch (err) {
                done(err, null);
            }
        });
    }
}

function update(id, message) {
    return function(done) {
        co(function*() {
            try {
                let messageDoc = yield Message.findOneAndUpdate({ _id: id }, message, { new: true }).exec();

                done(null, messageDoc);
            } catch (err) {
                done(err, null);
            }
        });
    }
}

function remove(id) {
    return function(done) {
        co(function*() {
            try {
                let messageDoc = yield Message.findOneAndRemove({ _id: id }).exec();

                yield User.update({ _id: messageDoc.user }, { $pull: { messages: messageDoc._id } }).exec();

                done(null, null);
            } catch (err) {
                done(err, null);
            }
        });
    }
}

function findByUserId(userId){
    return function(done) {
        co(function*() {
            try {
                let userDoc = yield User.findOne({ _id: userId }).populate('messages').exec();

                if (!userDoc) {
                    throw new Error('User not exist');
                }

                done(null, userDoc.messages);
            } catch (err) {
                done(err, null);
            }
        });
    }
}

module.exports = {
    create: create,
    update: update,
    remove: remove,
    findByUserId: findByUserId
};

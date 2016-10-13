const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const co = require('co');
const moment = require('moment');

const db = require('../helpers/db');

router.post('/', (req, res, next) => {
    let message = {
        userId: req.body.userId,
        content: req.body.content,
        timeStamp: moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
    };

    co(function*() {
        try {
            yield db.messages.insertOne(message);
            console.log(message);

            res.status(201).json(message);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    let messageId = req.params.id;
    let message = req.body;

    co(function*() {
        try {
            let updateMessage = {
                _id: new ObjectID(message._id),
                userId: message.userId,
                content: message.content,
                timeStamp: message.timeStamp
            };

            yield db.messages.findOneAndReplace({ _id: new ObjectID(messageId) }, updateMessage);

            res.json(updateMessage);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    let messageId = req.params.id;

    co(function*() {
        try {
            yield db.messages.findOneAndDelete({ _id: new ObjectID(messageId) });

            res.status(204).send();
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.get('/user/:id', (req, res, next) => {
    let userId = req.params.id;

    co(function*() {
        try {
            let messages = yield db.messages.find({ userId: userId }).toArray();

            res.json(messages);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

module.exports = router;

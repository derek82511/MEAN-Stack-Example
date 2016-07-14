let express = require('express');
let router = express.Router();

let co = require('co');

let MessageService = require('../services/message');

router.post('/', (req, res, next) => {
    co(function*() {
        let message = {
            content: req.body['content'],
            user: req.body['userId']
        };

        try {
            let messageDoc = yield MessageService.create(message);

            res.status(201).json(messageDoc);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    co(function*() {
        try {
            let messageDoc = yield MessageService.update(req.params['id'], req.body);

            res.json(messageDoc);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    co(function*() {
        try {
            yield MessageService.remove(req.params['id']);

            res.status(204).send();
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

router.get('/user/:id', (req, res, next) => {
    co(function*() {
        try {
            let messages = yield MessageService.findByUserId(req.params['id']);

            res.json(messages);
        } catch (err) {
            res.json({
                error: err.message
            });
        }
    });
});

module.exports = router;

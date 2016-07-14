let express = require('express');
let router = express.Router();

let passport = require('passport');

let User = require('../models/user');

router.get('/', (req, res, next) => {
    let user = req.user;

    res.json(user);
});

router.post('/register', (req, res, next) => {
    if (req.body['password_repeat'] !== req.body['password']) {
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

    User.register(user, req.body.password, (err, doc) => {
        if (err) {
            return res.json({
                error: err.message
            });
        }

        passport.authenticate('local')(req, res, () => {
            res.json({});
        });
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
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

        req.logIn(user, (err) => {
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

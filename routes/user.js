const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const co = require('co');
const moment = require('moment');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const CONSTANT = require('../config/constant');
const db = require('../helpers/db');

router.get('/', (req, res, next) => {
    let user = req.user;

    res.json(user);
});

router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let password_repeat = req.body.password_repeat;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    co(function*() {
        try {
            if (password !== password_repeat) {
                throw new Error('密碼輸入不一致');
            }

            let createTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
            let salt = uuid.v4();

            let hash = crypto.createHash('sha256');

            hash.update(password + createTime + salt);
            let passwordHash = hash.digest('hex');

            let user = {
                username: username,
                hash: passwordHash,
                salt: salt,
                createTime: createTime,
                firstName: firstName,
                lastName: lastName,
                email: email,
                roles: ['user']
            };

            let userByUsername = yield db.users.findOne({ username: user.username });
            let userByEmail = yield db.users.findOne({ email: user.email });

            if (userByUsername || userByEmail) {
                throw new Error('重複的使用者名稱或信箱');
            }

            yield db.users.insertOne(user);

            let token = jwt.sign(user, CONSTANT.TokenSecret, { expiresIn: 60 * 60 });

            res.json({
                token: token
            });
        } catch (err) {
            return res.json({
                error: err.message
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    co(function*() {
        try {
            let user = yield db.users.findOne({ username: username });

            if(!user){
                throw new Error('查無此使用者');
            }

            let hash = crypto.createHash('sha256');

            hash.update(password + user.createTime + user.salt);
            let passwordHash = hash.digest('hex');

            if(passwordHash !== user.hash){
                throw new Error('使用者密碼錯誤');
            }

            let token = jwt.sign(user, CONSTANT.TokenSecret, { expiresIn: 60 * 60 });

            res.json({
                token: token
            });
        } catch (err) {
            return res.json({
                error: err.message
            });
        }
    });
});

module.exports = router;

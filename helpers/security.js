const expressJwt = require('express-jwt');
const ConnectRoles = require('connect-roles');

const CONSTANT = require('../config/constant');
const db = require('./db');

function getJwtAuth() {
    return expressJwt({
        secret: CONSTANT.TokenSecret,
        credentialsRequired: false
    });
}

function getConnectRoles() {
    const roles = new ConnectRoles({
        failureHandler: (req, res, action) => {
            res.status(403).send('Access Denied - You don\'t have permission');
        }
    });

    roles.use('user', (req) => {
        if (req.user && req.user.roles.indexOf('user') > -1) {
            return true;
        }
    });

    return roles;
}

module.exports = {
    getJwtAuth: getJwtAuth,
    getConnectRoles: getConnectRoles
};

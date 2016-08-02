const passport = require('passport');
const ConnectRoles = require('connect-roles');

const User = require('../models/user');

function loadPassportStrategy() {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
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
    loadPassportStrategy: loadPassportStrategy,
    getConnectRoles: getConnectRoles
};

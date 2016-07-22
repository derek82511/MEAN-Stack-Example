const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.render('logout');
});

module.exports = router;

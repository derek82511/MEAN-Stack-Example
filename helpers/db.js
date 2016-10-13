const Wrapper = require('mongodb-native-wrapper').Wrapper;

const CONSTANT = require('../config/constant');

const db = new Wrapper({
    url: CONSTANT.MongoDBUrl,
    collections: ['users', 'messages']
});

db.onConnected(function() {
    console.log('MongoDB Connected');
});

module.exports = db;
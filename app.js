require('./helpers/db');

const CONSTANT = require('./config/constant');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

const security = require('./helpers/security');
const jwtAuth = security.getJwtAuth();
const roles = security.getConnectRoles();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwtAuth);
app.use(roles.middleware());

const router = express.Router();

//static content
router.use('/public', express.static(path.join(__dirname, 'public')));

//api
router.use('/user', userRoutes);
router.use('/message', roles.is('user'), messageRoutes);

//page
router.use((req, res, next) => {
    res.locals.contextPath = CONSTANT.ContextPath;
    next();
});
router.use('/', indexRoutes);

//serve for contextPath
app.use(CONSTANT.ContextPath, router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const PORT = process.env.PORT || 8080;

const http = require('http').Server(app);

http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

require('./db');

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let session = require('express-session');

let passport = require('passport');

let ConnectRoles = require('connect-roles');

let indexRoutes = require('./routes/index');
let userRoutes = require('./routes/user');
let messageRoutes = require('./routes/message');

let User = require('./models/user');

let roles = new ConnectRoles({
    failureHandler: (req, res, action) => {
        res.status(403).send('Access Denied - You don\'t have permission');
    }
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'NodeAngular' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(roles.middleware());

roles.use('user', (req) => {
    if (req.user && req.user.roles.indexOf('user') > -1) {
        return true;
    }
})

app.use('/user', userRoutes);
app.use('/message', roles.is('user'), messageRoutes);

app.use('/', indexRoutes);

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


module.exports = app;

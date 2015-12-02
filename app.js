const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const showsController = require('./controllers/shows');
const episodesController = require('./controllers/episodes');

app.get('/api/v0/shows', (req, res) => {
    showsController.fetchAll().then(
        shows => { res.send(shows); },
        err => { res.render('error', {mesage: err.message, error: err}); }
    );
});

app.get('/api/v0/shows/:showId/episodes', (req, res) => {
    episodesController.fetchWhere({show_id: Number(req.params.showId)}).then(
        episodes => { res.send(episodes); },
        err => { res.render('error', {mesage: err.message, error: err}); }
    );
});

const router = require('./app/components/router');
app.use(router.default);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

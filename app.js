var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser")
var cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
}))
var indexRouter = require('./routes/index');
var analysisRouter = require('./routes/analysis')
var analysisRouter2 = require('./routes/analysis2')
var analysisRouter3 = require('./routes/analysis3')
var analysisRouter4 = require('./routes/analysis4')
var analysisRouter5 = require('./routes/analysis5')
var analysisRouter6 = require('./routes/analysis6')
var analysisRouter7 = require('./routes/analysis7')
var metaRouter = require('./routes/meta')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
  next();
  })
app.use('/', indexRouter);
app.use('/meta',metaRouter)
app.use('/analysis', analysisRouter);
app.use('/analysis2', analysisRouter2);
app.use('/analysis3', analysisRouter3);
app.use('/analysis4', analysisRouter4);
app.use('/analysis5', analysisRouter5);
app.use('/analysis6', analysisRouter6);
app.use('/analysis7', analysisRouter7);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

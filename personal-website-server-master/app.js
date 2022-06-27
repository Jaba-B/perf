const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const serverTiming = require('server-timing');

const indexRouter = require('./routes/index');
const communityRouter = require('./routes/community');
const analyticsRouter = require('./routes/analytics');

const app = express();
global.appRoot = path.resolve(__dirname);

app.use(serverTiming());

app.use((req, res, next) => {
  res.setMetric('db', 100.0, 'Test: DB metric');
  res.setMetric('api', 200.0, 'Test: API metric');
  res.setMetric('cache', 300.0, 'Test: Cache metric');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/community', communityRouter);
app.use('/analytics', analyticsRouter);

module.exports = app;

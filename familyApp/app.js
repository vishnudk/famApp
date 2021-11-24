var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const https = require('https');
const request = require('request');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleryRouter = require('./routes/gallery');
var calendarRouter = require('./routes/calendar');
var listRouter = require('./routes/list');
var chatRouter = require('./routes/chat');
var apiGetData = require('./routes/getImageFileData');
var testServer = require('./database/addDataList');
var getListItm = require('./database/getDataFromServer');
var removeListItm = require('./database/removeDataFromServer');
var calendarApiRoute = require('./routes/calendarApi.js');
var calendarPutData = require('./database/putCalendarData')
var getCalendarData = require('./database/findDataCalendar')
var port = 5000;
var app = express();



// ========================================================================================
const io = require('socket.io')(5001)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
// ========================================================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery', galleryRouter)
app.use('/calendar', calendarRouter);
app.use('/list', listRouter);
app.use('/chat', chatRouter);
app.use('/apiData', apiGetData);
app.use('/updateListItm', testServer);
app.use('/listGetData', getListItm);
app.use('/removeFromDataBase', removeListItm);
app.use('/calendarApi', calendarApiRoute)
app.use('/putCalData', calendarPutData);
app.use('/getCalendarData', getCalendarData);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {

  console.log('The server is up at port ' + port);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

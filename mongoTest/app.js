var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
// mongodb password fileServer123

//  routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { copyFileSync } = require('fs');
// const { read } = require('fs/promises');

//  global variables
var port = 3000;
var app = express();
var userName = 'ncpProject'
const mongoUri = 'mongodb+srv://' + userName + ':ncpproject@cluster0.13bcs.mongodb.net/testFileEnter?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoUri);

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fileServer');
});
// middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) { return reject(err) }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'fileServer'
        };
        console.log("uploaded the file");
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
app.post('/serverUpload', upload.single('file'), (req, res) => {
  // alert("File uploaded successfully!");
  res.redirect("http://localhost:5000/gallery")
  // console.log("got the file");
  // res.json({ file: req.file });
});
app.get('/files/:fileName', (req, res) => {
  gfs.files.find({ "filename": req.params.fileName }).toArray((err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    // let readstream;
    for (var i = 0; i < file.length; i++) {
      // console.log(file[i]['filename'])
      const readstream = gfs.createReadStream({ 'filename': req.params.fileName });
      readstream.pipe(res);
    }
    // return res.json(file);
  });
});

app.get('/delete/:filename', (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'fileServer' }, (err, gridstore) => {
    if (err) return res.status(404).json({ err: err });
  });
  res.redirect("http://localhost:5000/gallery")
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    // let readstream;
    for (var i = 0; i < file.length; i++) {
      console.log(file[i]['filename'])

    }
    return res.json(file);
  });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.listen(port, function () {
  console.log('The server started at port ' + port);
})
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

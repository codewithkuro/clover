var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const upload = require('./modules/upload');
const apillon_storage = require('./modules/apillon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/upload', upload.single('file1'), async (req, res) => {
  let uploadedFile = req.file;
  const bucket = apillon_storage.bucket('33ddd3c8-0d6a-4741-a267-4253552782ee');
  let result = await bucket.uploadFiles([
    {
      fileName: uploadedFile.filename,
      contentType: uploadedFile.mimetype,
      content: fs.readFileSync(uploadedFile.path)
    }
  ], { wrapWithDirectory: true, directoryPath: 'main/uploads' });  

  res.render('upload-ok');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

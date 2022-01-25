var createError = require('http-errors')
var express = require('express')
var path = require('path')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// Get routes
var indexRouter = require('./routes/index')
var t3Router = require('./routes/t3')
var t3PlusRouter = require('./routes/t3Plus')
var customRouter1 = require('./routes/custom')
var customRouter2 = require('./routes/custom-2')
var customRouter3 = require('./routes/custom-3')
var railKitRouter = require('./routes/rail-kit')

// Server set-up
var app = express()
// app.use(helmet())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/yo', indexRouter)

app.use('/', t3Router)
app.use('/t3', t3Router)
app.use('/tapster-3', t3Router)

app.use('/t3plus', t3PlusRouter)
app.use('/tapster-3-plus', t3PlusRouter)

app.use('/concept-1', customRouter1)
app.use('/concept-2', customRouter2)
app.use('/concept-3', customRouter3)
app.use('/rail-kit', railKitRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
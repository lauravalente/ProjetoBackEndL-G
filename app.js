//Path e Env
const path = require("path")
require("dotenv").config()

//Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Template mustache
const mustacheExpress = require("mustache-express")
const engine = mustacheExpress()
app.engine("mustache", engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

//Cookies
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// //Sessão
// const session = require("express-session")
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

//Rotas
//const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
//app.use('/', homeRouter);
app.use('/login', loginRouter);

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
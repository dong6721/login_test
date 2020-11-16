const express = require('express');
const path = require('path');
const router = require('./routes/router.js');
const port = 3000;
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

//get html
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/',router);  //login router
app.use(express.static('public'));  //for using css, js
app.use(cookieParser());
//basic
app.get('/',(req,res) => {
  console.log(req.cookies)
  res.render('view');
});

//session
app.use(session({
  resave:false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const router = require('./routes/router.js');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./mongoose/mongoose');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('date-utils');
//get html
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//bodyParser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//session
app.use(session({
  secret: 'secret test',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge:60000},
  store:new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use((req,res,next)=>{
  next();
})

app.use('/',router);  //login router
app.use(express.static('public'));  //for using css, js
//app.use(cookieParser());

app.listen(port, () => {
  let newdate = new Date();
  let time = newdate.toFormat('YYYY-MM-DD HH24:MI:SS');
  console.log(`app listening at http://localhost:${port} current time:${time}`);
});

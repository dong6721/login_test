const express = require('express');
const path = require('path');
const router = require('./routes/router.js');
const port = 3000;
const app = express();
var cookieParser = require('cookie-parser')

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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

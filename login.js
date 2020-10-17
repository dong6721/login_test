// var http = require("http");
// var fs = require('fs');
// var url = require('url');
//
// var app = http.createServer(function(request,response){
//   var _url = request.url;
//   var pathname = url.parse(_url,true).pathname;
//   console.log(pathname);
//   if(pathname === '/'){
//     response.writeHead(302, {Location: `/login`});
//     response.end('success');
//   }
//   else if(pathname === '/login') {
//     response.writeHead(200);
//     response.end(fs.readFileSync('login.html'));
//   }
//   else if(pathname === '/css/style.css')
//   {
//     //css
//     fs.readFile('./css/style.css',(err,data) => {
//       response.writeHead(200, {'Content-Type': 'text/css'});
//       response.write(data);
//       response.end();
//     });
//   }
//   else {
//       response.writeHead(404);
//       response.end('Not found');
//   }
// });
// app.listen(3000);

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

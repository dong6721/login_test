const crypto = require ('crypto');
const bodyParser = require('body-parser');

const express = require('express');
const router = express.Router();

//connect to db
const mongoose = require("mongoose");
const schema = require("../schemas/user");
const mongoURL = "mongodb://localhost:27017/default";
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoURL,{
  dbName: 'login_test',
useUnifiedTopology: true,
useNewUrlParser: true
}, (err) => {
  if(err) {
    console.log('connect to mongoDB error',err);
  }
  else {
      console.log('connect mongoDB success');
  }
});
const db = mongoose.connection;
db.on('error',console.error);
db.once('open',() => {
  console.log('connect to mongoDB server');
});

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//login action
router.post('/login', (req,res,next) => {
    schema.findOne({userid : req.body.id}, (err,user) => {
      if(err){
        console.log("find one error!",error);
        return res.status(500).json({error: err});
      }
      if(!user) {
        console.log("no data in db!");
        return res.status(404).json({error: 'not found'});
      }
      crypto.pbkdf2(req.body.ps, user.userpsbuf , 100000, 64, 'sha512',  (err, key)=> {
        if(key == user.userps){
          res.json("success!");
        }
        else {
          res.json("fail!");
        }
      });
    });
  });

//create action
router.post('/register',(req,res,next) => {
  crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(req.body.ps, buf.toString('base64'), 100000, 64, 'sha512',  (err, key)=> {
      result = key;
      schema.create({
        userid: req.body.id,
        userps: result,
        userpsbuf: buf.toString('base64')
      },
      (err,user)=> {
        if(err)
          console.log("create fail",err);
      });
      //console.log(toString(result));
      res.json("create success");
    });
  });
});

module.exports = router;

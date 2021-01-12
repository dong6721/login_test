const db = require("../mongoose/dbctrl");
const crypto = require ('crypto');

module.exports = {
  //get
  //main_page
  login_page: (req,res,next)=> {
    res.render('view');
    next();
  },
  //login success
  login_success_page: (req,res,next)=>{
    res.send("success");
  },

  //post
  //login action
  login_post_login: async (req,res,next) => {
    try{
      let doc = await db.fo(req.body.id);
      if(!doc) {
        console.log("no data in DB!");
        res.status(400).json({error: 'id not found'});
      }
      crypto.pbkdf2(req.body.ps, user.userpsbuf , 100000, 64, 'sha512', (err,key)=>{
        if(key.toString() === user.userps){
          res.json("success!");
        }
        else {
          res.json("fail!");
        }
      })
    }
    catch(e) {
      console.log(e);
      res.status(500).json({error:e});
      //restart option
    }
  },
  //create action
  login_post_create: (req,res,next) => {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(req.body.ps, buf.toString('base64'), 100000, 64, 'sha512',  (err, key)=> {
        result = key;
        db.cr(req.body.id,result,buf.toString('base64'));
        //console.log(toString(result));
        res.json("create!");
      });
    });
  }
}

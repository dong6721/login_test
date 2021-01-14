const db = require("../mongoose/dbctrl");
const crypto = require ('crypto');

module.exports = {
  //get
  //main_page
  login_page: (req,res,next)=> {
    console.log(req.sessionID);
    if(req.session.login === "login"){
      req.session.login = "test";
      res.redirect('/success');
    }
    else {
      res.render('view');
    }
  },
  //login success
  login_success_page: (req,res,next)=>{
    res.send('success');
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
      crypto.pbkdf2(req.body.ps, doc.userpsbuf , 100000, 64, 'sha512', (err,key)=>{
        if(key.toString().trim() == doc.userps){
          req.session.login = "login";    //로그인 세션인증이 필요.
          console.log("login success");
          res.json("success!");
        }
        else {
          console.log("login fail");
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

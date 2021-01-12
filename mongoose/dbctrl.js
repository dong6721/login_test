const model = require('./schema');

module.exports = {
  fo: async (query)=>{
    //findOne Function
    return await model.findOne({query});
  },
  cr: (id,ps,psbuf)=>{
    schema.create({
      userid: req.body.id,
      userps: result,
      userpsbuf: buf.toString('base64')
    },(err)=>{
      if(err){
        console.log(err);
      }
    });
  }
}

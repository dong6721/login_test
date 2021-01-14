const model = require('./schema');

module.exports = {
  fo: async (query)=>{
    //findOne Function
    return await model.findOne({userid:query});
  },
  cr: (id,ps,psbuf)=>{
    model.create({
      userid: id,
      userps: ps,
      userpsbuf: psbuf
    },(err)=>{
      if(err){
        console.log(err);
      }
    });
  }
}

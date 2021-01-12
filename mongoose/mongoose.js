const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/default";

//mongoose setting

mongoose.set('useCreateIndex',true);
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

mongoose.connection.on('error',console.error);
mongoose.connection.once('open',()=>{
  console.log('connect to mongoDB server');
});

module.exports = mongoose;

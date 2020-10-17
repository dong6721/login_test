const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userid: {
    type : String,
    required: true,
    unique: true,
    lowercase: true
  },
  userps: {
    type : String,
    required: true,
    trim: true
  },
  userpsbuf: String
});

module.exports = mongoose.model('User',userSchema,'user');

//include modules
var mongoose = require('mongoose');
var user = require('../models/user.js');
var ChatSchema = new mongoose.Schema({
  chat_id: {type:String},
  user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  messageFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  message:{type:String},
  dateTime:{type:Date},
  blocked : {type:Boolean,default:false},
  advert_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' },
  server:{type:Boolean, default:false},
  readStatus : {type:Boolean,default:false},
  status : {type:Boolean, default: true},
  deletedBy : {type:Array,default:[]}
});
module.exports = mongoose.model('Chat', ChatSchema);

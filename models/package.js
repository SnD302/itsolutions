var mongoose = require('mongoose');
var PackageSchema = new mongoose.Schema({
  price: {type:Number},
  description:{type:String},
  name:{type:String},
  boosts:{type:Number},
  addCount : {type:Number},
  picture:{type:String},
  AIAP30 : {type:String },
  color:{type:String},
  sort:{type:Number},
  GIAP30 : {type:String },
  expiry : {type:Number},
  active: {type:Boolean,default:false},
  searchAd : {type:Boolean,default:false},
  placeAd : {type:Boolean,default:false}
});
module.exports = mongoose.model('Package',PackageSchema);

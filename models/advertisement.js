var mongoose = require('mongoose');
var AdvertisementSchema = new mongoose.Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  condition_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Condition' },
  physicalIssues:[{ type: mongoose.Schema.Types.ObjectId, ref: 'PhysicalIssues' }],
  accessories:[{ type: mongoose.Schema.Types.ObjectId, ref: 'PhysicalIssues' }],
  condition:{ type: mongoose.Schema.Types.ObjectId, ref: 'Condition' },
  deviceDetails : {type: mongoose.Schema.Types.ObjectId, ref: 'Mobile'},
  pictures:{type:Array},
  featured:{type:Boolean},
  offers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
  visible:{type:Boolean,default:false},
  price:{type:Number},
  isVerified:{type:Boolean,default:false},
  color:{type:String},
  imei:{type:Number},
  description:{type:String},
  storage:{type:String},
  age:{type:Number,default:0},
  phoneDead : {type:Boolean,default:false},
  title:{type:String},
  brandName:{type:String},
  type:{type:String,enum:['mobile','tablet','accessories']},
  location:{type:Array},
  payment : {type:Boolean,default:false},
  payment_id:[{type:mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  boosts : {type:Number,default:0},
  createdAt : {type:Date , default: Date.now()},
  updatedAt : {type:Date ,default: Date.now()},
  isFavourite : {type:Boolean,default:false},
  sold:{type:Boolean,default:false},
  boostStartingTime : {type:Number,default:0},
  boosted : {type:Boolean,default:false},
  distance : {type:String, default: "Not available"},
  country:{type:String},
  countryCode:{type:String},
  search:{type:String},
  views:{type:Number,default:0},
  isDeleted:{type:Boolean,default:false},
  reason:{type:String,default:""}

});
module.exports = mongoose.model('Advertisement',AdvertisementSchema);
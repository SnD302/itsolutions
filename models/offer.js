var mongoose = require('mongoose');
var OfferSchema = new mongoose.Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref: 'User', required:true},
  offered_price:{type:Number,required:true},
  advert_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Advertisement' ,required:true},
  status:{type:String, enum:['accepted','rejected','pending','counter','re-counter','sold']},
  sail_id : {type:mongoose.Schema.Types.ObjectId, ref: 'Sail' },
  visible : {type:Boolean,default:true},
  readStatus : {type:Boolean,default:false},
  createdAt : {type:Date , default:Date.now()},
  updatedAt : {type:Date , default:Date.now()},
  sort : {type:Number,default:1}
});
module.exports = mongoose.model('Offer',OfferSchema);

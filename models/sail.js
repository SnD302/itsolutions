var mongoose = require('mongoose');
var SailSchema = new mongoose.Schema({
  seller_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  advert_id : {type:mongoose.Schema.Types.ObjectId,ref:'Advertisement'},
  buyer_id : {type:mongoose.Schema.Types.ObjectId,ref:'User'},
  offer_id : {type:mongoose.Schema.Types.ObjectId,ref:'Offer'},
  payment_id : {type:mongoose.Schema.Types.ObjectId,ref:'Payment'},
  address : {type:String},
  tracking_id : {type:String},
  courierServiceName : {type:String},
  payKey:{type:String},
  managePersonally:{type:Boolean,default:false},
  status : {type:String, default:"address pending", enum:['canceled','payment pending','payment complete','address pending','departer pending','departed','received']}
});
module.exports = mongoose.model('Sail',SailSchema);

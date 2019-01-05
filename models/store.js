var mongoose = require('mongoose');
var StoreSchema = new mongoose.Schema({
  price: {type:Number},
  title:{type:String},
  boosts:{type:Number},
  AIAP : {type:String },
  sort:{type:Number},
  GIAP : {type:String }
});
module.exports = mongoose.model('Store',StoreSchema);

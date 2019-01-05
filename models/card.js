//include modules
var mongoose = require('mongoose');
var CardSchema = new mongoose.Schema({
  visa:{type:String},
  mastercard: {type:String},
  // American Express:{type:String},
  // Diners Club:{type:String},
  discover:{type:String},
  jcb:{type:String},
  unionpay:{type:String},
  maestro:{type:String},
  mir:{type:String}
});
module.exports = mongoose.model('Card', CardSchema);

var mongoose = require('mongoose');
var user = require('../models/user.js');
var CurrencySchema = new mongoose.Schema({
  currency : {type:String},
  valueInUSD : {type:Number}
});
module.exports = mongoose.model('Currency', CurrencySchema);

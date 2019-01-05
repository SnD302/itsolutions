//include modules
var mongoose = require('mongoose');
var CurrencyConversionsSchema = new mongoose.Schema({
  currentTime : {type:Date , default:Date.now()},
  rates : {type:Array}
});
module.exports = mongoose.model('CurrencyConversions', CurrencyConversionsSchema);

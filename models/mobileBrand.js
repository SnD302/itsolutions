var mongoose = require('mongoose');
var MobileBrandSchema = new mongoose.Schema({
  picture: {type:String },
  brandName: {type:String}
});
module.exports = mongoose.model('MobileBrand',MobileBrandSchema);
 

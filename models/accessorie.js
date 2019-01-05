var mongoose = require('mongoose');
var AccessorieSchema = new mongoose.Schema({
  title:{type:String},
  image:{type:String}
});
module.exports = mongoose.model('Accessorie',AccessorieSchema);

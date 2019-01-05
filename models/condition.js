var mongoose = require('mongoose');
var ConditionSchema = new mongoose.Schema({
  title:{type:String},
  condition : {type:Array}
});
module.exports = mongoose.model('Condition',ConditionSchema);

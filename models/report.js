var mongoose = require('mongoose');
var ReportSchema = new mongoose.Schema({
status: {type:String, default: "pending"},
user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',unique:false},
advert_id:{type:mongoose.Schema.Types.ObjectId,ref:'Advertisement',unique:false},
type: {type:String},
date: {type:Date, default: Date.now() },
advert_user: {type:mongoose.Schema.Types.ObjectId,ref:'User',unique:false}
});
module.exports = mongoose.model('Report',ReportSchema);

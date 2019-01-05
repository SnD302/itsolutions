var mongoose = require('mongoose');
var PhysicalIssuesSchema = new mongoose.Schema({
title:{type:String},
image:{type:String},
description:{type:String},
sort:{type:Number},
type:{type:String}
});
module.exports = mongoose.model('PhysicalIssues',PhysicalIssuesSchema);

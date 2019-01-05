var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    time:{type:Date},
    status:{type:String},
    currency:{type:String},
    description:{type:String},
    paymentInfoList : {type:Array},
    payKey:{type:String},
    actionType:{type:String},
    feesPayer:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});
module.exports = mongoose.model('Payment', PaymentSchema);

var mongoose = require('mongoose');

var EnumSchema = new mongoose.Schema({
    color: {type:Array},
    storage: {type:Array},
    price : {type:Array},
    colorHex:{type:Array},
    currency: {type:Array},
    age:{type:Array}
});
module.exports = mongoose.model('Enum', EnumSchema);

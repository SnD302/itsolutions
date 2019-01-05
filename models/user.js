var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
  name:{ type: String,required:true},
  email: { type: String, lowercase: true, unique: true, required: true,lowercase: true,trim: true },
  password: { type: String, select: false },
  blocked:{type:Boolean,default:false},
  mobile:{type:String},
  username:{type:String},
  accountStatus:{type:String,enum:['enabled','disabled','reported'],default:'enabled'},
  varificationCode:{type:Number},
  smsVerification: {type:Boolean,default:false},
  country : {type:String},
  connections:{type:Array, default:[]},
  isAdmin : {type : Boolean , default:false},
  blockReason : {type:String,default:""},
  profilePicture:{type:String,default:"https://res.cloudinary.com/hizi3ayop/image/upload/v1536871210/default.png"},
  isDeleted : {type:Boolean,default:false},
  socketId : {type:String,default:'12345'},
  stripeID:{type:String},
  boostCount:{type:Number,default:0},
  addsCount: {type:Number,default:2},
  defaultCard:{type:String},
  location:{type:Array,default:[]},
  fcmToken : {type:String},
  paypalEmail : {type:String},
  currency:{type:String , default:"USD"},
  favouriteAdds : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
  package: {type: mongoose.Schema.Types.ObjectId, ref: 'Package',default:"5b3c837b3a49153b1637ae15"}
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.New) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      else {
        bcrypt.hash(user.password, salt,null, function (err, hash) {
          if (err) {
            next(err);
          } else {
            console.log("password updated: ",hash);
            user.password = hash;
            next();
          }
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(pw,cb){
  bcrypt.compare(pw,this.password,function(err,isMatch){
    if(err){
      return cb(err);
    }else{
      cb(null,isMatch);
    }
  });
};

module.exports = mongoose.model('User',UserSchema);

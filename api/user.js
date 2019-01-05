const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
var sendgrid = require("sendgrid")(process.env.sendgridApiKey);
var stripe = require('stripe')(process.env.stripeSecretKey);
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var hashedPassword = require('password-hash');
var mobile = require('../models/mobile.js');
var enums = require('../models/enum.js');
const passport = require('passport');
var cookieParser = require('cookie-parser');
exports.homePage = function (req, res) {
  res.sendFile(__dirname + '/index.html');
}
var curr = require("../models/currency.js")
var offer = require('../models/offer.js');
var bcrypt = require('bcrypt-nodejs');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var cloudinary = require('cloudinary');
cloudinary.config(process.env.CLOUDINARY_URL);
var Advertisement = require('../models/advertisement.js');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('userFile')

exports.register = function (req, res) {
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.email != null && params.email != ""){
    var email1 = params.email+"";
    for(var k=0;k<15;k++){
      email1 = email1.replace(" ","");
      if(k == 14){
        params.email = email1;
        User.findOne({email:params.email}).exec(function(error,emailCheck){
          if(error){
            res.status(500).send({error:error});
          }else{
            if(emailCheck){
              res.status(409).send({
                message:"email already exists."
              })
            }else{User.create({
              name:req.body.name,
              email: params.email+","+Date.now(),
              password: req.body.password
            }).then(function(result){
              result.password = undefined;
              // stripe.customers.create(
              //   { email: req.body.email },
              //   function(err, customer) {
                  User.findOne({_id:result._id}).exec(function(error,compl){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                    //  compl.stripeID = customer.id;

                      compl.save(function(error,fine){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          var token = jwt.sign({ user: compl }, process.env.jwtsecret, { expiresIn: 1000000 });
                          User.findOne({_id:result._id}).populate('package').exec(function(error,complet){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              setTimeout(function() {
                                res.status(202).send({message:"User account created successfully.", token: 'JWT ' + token,user:complet})
                              }, 500);
                            }
                          })
                        }
                      })
                    }
                  })
              //   }
              // );
            })
          }
        }
      })
    }
  }
}else{
  res.status(403).send({message:"Email required."});
}
}


exports.authenticate = function (req, res) {
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if (req.body.email != null && req.body.email != "") {
    var email1 = req.body.email+"";
    for(var k=0;k<15;k++){
      emial1 = email1.replace(" ","");
      if(k == 14){
        req.body.email = email1;
        User.findOne({ email: req.body.email ,smsVerification:true}).populate('package').select('+password').exec(function (err, user) {
          if (err) {
            throw err;
          } else if (user) {
            console.log("***",user.blockReason.length)
            if(user.blockReason.length==0 ){
              if (user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  user.password = undefined;
                  var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                  User.findOne({_id:user._id}).populate('package').populate('favouriteAdds').then(function(found){
                    setTimeout(function() {
                      res.status('200').send({ success: true, token: 'JWT ' + token, user: found});
                    }, 500);
                  })
                } else {
                  res.status(401).send({ success: false, message: 'password did not match.' });
                }
              }));
            }else{
              res.status(401).send({message:"your account is suspended by admin"});
            }
          } else {
            res.status(401).send({ success: false, message: 'user not found' })
          }
        });
      }
    }
  } else {
    res.status(403).send({ message: "Perameters Missing" });
  }
}

exports.adminAuthenticate = function (req, res) {
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if (req.body.email != null && req.body.email != "") {
    var email1 = req.body.email+"";
    for(var k=0;k<15;k++){
      emial1 = email1.replace(" ","");
      if(k == 14){
        req.body.email = email1;
        User.findOne({ email: req.body.email , isDeleted:false,smsVerification:true,isAdmin:true}).populate('package').select('+password').exec(function (err, user) {
          if (err) {
            throw err;
          } else if (user) {
            if (user.comparePassword(req.body.password, function (err, isMatch) {
              if (isMatch && !err) {
                user.password = undefined;
                var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                User.findOne({_id:user._id}).populate('package').populate('favouriteAdds').then(function(found){
                  setTimeout(function() {
                    res.status('200').send({ success: true, token: 'JWT ' + token, user: found});
                  }, 500);
                })
              } else {
                res.status(401).send({ success: false, message: 'password did not match.' });
              }
            }));
          } else {
            res.status(401).send({ success: false, message: 'user not found' })
          }
        });
      }
    }
  } else {
    res.status(403).send({ message: "Perameters Missing" });
  }
}


// //function used to edit some data in database
exports.edit = function (req, res) {
  User
  .findOne({ _id: req.user._id }).select('+password')
  .exec(function (error, user) {
    user.name = req.body.name
    ? req.body.name
    : user.name;
    user.email = req.body.email
    ? req.body.email
    : user.email;
    user.save(function (error, user) {
      if (error) {
        res
        .status('500')
        .send({ error: error })
      } else {
        res
        .status('200')
        .send({ message: 'updated' })
      }
    });
  })
}



exports.updateUser = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request: ",params);
  }
  for (var i in params) {
    if (params[i] == "") {
      delete params[i];
    }
  }
  if(req.user._id!=null && req.user._id!=null){
    User
    .findOne({ _id: req.user._id }).select('+password')
    .exec(function (error, user) {
      if(error){
        res.status(500).send({error:error});
      }else{
        if(user){
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log("User : ",user);
          }
          if(req.body.name !=null && req.body.name!=undefined && req.body.name!=""){
            user.name = req.body.name;
          }
          if(req.body.mobile !=null && req.body.mobile!=undefined && req.body.mobile!=""){
            user.mobile = req.body.mobile;
          }
          if(req.body.fcmToken !=null && req.body.fcmToken!=undefined && req.body.fcmToken!=""){
            user.fcmToken = req.body.fcmToken;
          }
          if(req.body.currency !=null && req.body.currency!=undefined && req.body.currency!=""){
            user.currency = req.body.currency;
          }
          if(req.body.smsVerification !=null && req.body.smsVerification!=undefined && req.body.smsVerification!=""){
            user.smsVerification = req.body.smsVerification;
            var updatedEmail = user.email.split(',');
            user.email = updatedEmail[0];
          }
          if(req.body.password !=null && req.body.password!=undefined && req.body.password!=""){
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(req.body.password, salt,null, function (err, hash) {
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("password: ",hash);
                }
                user.password = hash
              });
            });
          }
          user.save(function (error, user) {
            if (error) {
              res
              .status('500')
              .send({ error: error })
            } else {
              User.findOne({_id:req.user._id}).populate("package").exec(function(error,fin){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("Updated User : ",fin);
                  }
                  if(req.body.currency !=null && req.body.currency!=undefined && req.body.currency!=""){
                    var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                    enums.findOne({}).exec(function(error,resultEnum){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(fin.currency!='USD'){
                          curr.findOne({currency:fin.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              resultEnum.price.forEach(function(i,idx,x){
                                if(parseFloat(currencyResult.valueInUSD)<10){
                                  resultEnum.price[idx] = i*1;
                                }else if(parseFloat(currencyResult.valueInUSD)>9 && parseFloat(currencyResult.valueInUSD)<100){
                                  resultEnum.price[idx] = i*10;
                                }else{
                                  resultEnum.price[idx] = i*100;
                                }
                                if(idx == x.length-1){
                                  res
                                  .status('200')
                                  .send({ message: 'updated' ,user:fin,token:'JWT ' + token,enums:resultEnum});
                                }
                              })
                            }
                          })
                        }else{
                          res
                          .status('200')
                          .send({ message: 'updated' ,user:fin,token:'JWT ' + token,enums:resultEnum});
                        }
                      }
                    })
                  }else{
                    res
                    .status('200')
                    .send({ message: 'updated' ,user:fin});
                  }
                }
              })
            }
          });
        }else{
          res.status(401).send({message:"user unauthorised"});
        }
      }
    })
  }
}



exports.sendPushNotification = function (req, res) {
  console.log("i am here in user file+++++++++++++++++++++++++++++++++");
  // var notificationHubService = azure.createNotificationHubService("zafaf-notifications-hub", "Endpoint=sb://zafaf-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=tTPOUW2cGn6x/AIXkYk/iByko1A2AHwKxg1MLYseW0s=");
  // var payloadIOS = {
  //   "aps": {
  //     "alert": req.params.message,
  //     "filterID": req.params.filterID
  //   }
  // };
  // var payloadAndroid = {
  //   "data": {
  //     "message": req.params.message,
  //     "filterID": req.params.filterID
  //   }
  // };
  // var tags = null;
  // //   if(req.body.tag!=undefined){
  // //     tags = req.body.tag;
  // //   }
  // notificationHubService.apns.send(req.params.id, payloadIOS, function (error) {
  //   if (!error) {
  //     //notification sent
  //     ////console.log('notification sent to IOS devices')
  //   } else {
  //     ////console.log('Error in sending notification to IOS Devices')
  //   }
  // });
  //
  // notificationHubService
  // .gcm
  // .send(req.params.id, payloadAndroid, function (error) {
  //   if (!error) {
  //     //notification sent
  //     ////console.log('notification sent to Android devices')
  //   } else {
  //     ////console.log('Error in sending notification to Android Devices')
  //   }
  // });

}



exports.registerWithFacebook = function (req, res) {
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if (req.body.email == null || req.body.password == null) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var email1 = req.body.email+"";
    for(var k=0;k<15;k++){
      email1 = email1.replace(" ","");
      if(k==14){
        req.body.email = email1;
        User.findOne({ email: req.body.email }).select({ connections: { $elemMatch: { id: req.body.id, email: req.body.email } } }).exec(function (error, result) {
          if (error) {
            res.send({ error: error });
          } else {
            if (!result) {
              var newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                connections: {
                  type: 'facebook',
                  id: req.body.id,
                  email: req.body.email,
                }
              });
              newUser.save((err, user) => {
                if (err) {
                  return res.json({ success: false, message: err });
                } else {
                  stripe.customers.create(
                    { email: req.body.email },
                    function(err, customer) {
                      User.findOne({_id:user._id}).exec(function(error,compl){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          compl.stripeID = customer.id;
                          compl.save(function(error,fine){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              fine.password = undefined;
                              var token = jwt.sign({ user: compl }, process.env.jwtsecret, { expiresIn: 1000000 });
                              User.findOne({_id:fine._id}).populate('package').exec(function(error,complet){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  setTimeout(function() {
                                    var token = jwt.sign(user, process.env.jwtsecret, { expiresIn: 1000000 });
                                    User.findOne({_id:fine._id}).populate('package').populate('favouriteAdds').then(function(found){
                                      res.status(202).send({ success: true, user: found, token: 'JWT ' + token, message: 'new user registered successfully' });
                                    })
                                  }, 500);
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  );
                }
              });
            } else {
              result.password = undefined;
              var token = jwt.sign(result, process.env.jwtsecret, { expiresIn: 1000000 });
              User.findOne({_id:result._id}).populate('package').populate('favouriteAdds').then(function(found){
                res.status('200').send({ success: true, token: 'JWT ' + token, user: found, message: 'already a user' });
              })
            }
          }
        })
      }
    }
  }
}


exports.getMobile = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("params:",params);
  }
  if(req.body.email!=null && req.body.email!=undefined && req.body.email!=""){
    var email1 = params.email+"";
    for(var k=0;k<15;k++){
      emial1 = email1.replace(" ","");
      params.email = email1;
      if(k==14){
        User.findOne({email:params.email}).exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            if(result){
              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                console.log("result",result);
              }
              res.status(200).send({mobile:result.mobile});
            }else{
              res.status(404).send({message:"User not found"});
            }
          }
        })
      }
    }
  }else{
    res.status(403).send({message:"Email missing"});
  }
}

exports.checkMobile = function(req,res){
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if(req.body.mobile != null && req.body.mobile != undefined && req.body.mobile != ""){
    User.findOne({mobile:req.body.mobile}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          var adminNumbers = "";
          adminNumbers=process.env.ADMIN_NUMBERS;
          if(adminNumbers.includes(req.body.mobile)){
            res.status(404).send({message:"Mobile number not found"});
          }else{
            res.status(200).send({message:"Mobile number already exists"});
          }
        }else{
          res.status(404).send({message:"Mobile number not found"});
        }
      }
    })
  }else{
    res.status(403).send({message:"Mobile number required"});
  }
}

exports.changePassword = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.password !=null && params.password !=undefined && params.password !=""){
    User.findOne({mobile:params.mobile,email:params.email}).select('+password').exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt,null, function (err, hash) {
              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                console.log("password: ",hash);
              }
              result.password = params.password
              result.save(function(error,done){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(200).send({result:done,message:"Password updated successfully"});
                }
              })
            });
          });
        }else{
          res.status(404).send({message:"User not found"});
        }
      }
    })
  }else{
    res.status(403).send({message:"Password required"});
  }
}




exports.changeResolution = function(req,res){
  mobile.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      result.forEach(function(x){
        if(x.resolution!=undefined){
          var k=(x.resolution).split(" x");
          var j = k[0];
          if(j.length>0){
            var g = j.split(" ");
            var l = k[1];
            if(l!=undefined && l.length>0){
              var y = l.split(" pix");
              var f = y[0];
              if(f.length!=undefined && f.length>0){
                var z=f.split(" ");
                x['length'] = z[1];
                x['width'] = g[0];
                x.update({_id:x._id},x);
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log(g[0], z[1]);
                }
              }
            }
          }
        }
      })
    }
  })
}


exports.uploadUserImage = function(req,res){
  User.findOne({_id:req.user._id}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(result){
        upload(req, res, function (err) {
          cloudinary.uploader.upload(req.file.path, function (cloudinarResult) {
            result.profilePicture = cloudinarResult.url;
            result.save(function(error,done){
              if(error){
                res.status(500).send({error:error});
              }else {
                User.findOne({_id:req.user._id}).populate("package").exec(function(error,result1){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    res.status(200).send({message:"Profile Picture uploaded successfully",user:result1});
                  }
                })
              }
            })
          });
        })
      }else{
        res.status(401).send({message:"user not authorised or logged in"});
      }
    }
  })
}

exports.addFavouriteAdds = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request :",params);
  }
  if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
    Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
      if(error){
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log("Error 501:",error);
        }
        res.status(500).send({error:error,message:"Error in finding advertisement"});
      }else{
        if(result){

          User.findOne({_id:req.user._id}).exec(function(error,done){
            if(error){
              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                console.log("Error 506:",error);
              }
              res.status(500).send({message:"error in finding user",error:error});
            }else{
              if(params.add==true || params.add == "true"){
                if(done.favouriteAdds.length==0){
                  done.favouriteAdds = params.advert_id;
                }else{
                  console.log(done.favouriteAdds);
                  done.favouriteAdds = done.favouriteAdds.concat([params.advert_id]);
                }
                done.save(function(error,final){
                  if(error){
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      console.log("Error 519:",error);
                    }
                    res.status(500).send({message:"error in saving user",error:error});
                  }else{
                    Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,resu){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        resu.isFavourite = true;
                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                          console.log({message:"successfully added to favourites",user:final,ad:resu});
                        }
                        if(req.user.currency !='USD'){
                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              User.findOne({_id:req.user._id}).exec(function(error,userResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(userResult.location.length>0){
                                    if(resu.location!=null && resu.location!=undefined){
                                      if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])>parseFloat(userResult.location[0])){
                                        resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                        if(parseFloat(resu.distance)<0){
                                          resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                        }else{
                                          resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                        }

                                      }else if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])<parseFloat(userResult.location[0])){
                                        resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                        if(parseFloat(resu.distance)<0){
                                          resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                        }else{
                                          resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                        }
                                      }
                                    }else{
                                      //resu null
                                      resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }
                                  }else{
                                      //user location null
                                      resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                  }
                                }
                              })
                            }
                          })
                        }else{
                          User.findOne({_id:req.user._id}).exec(function(error,userResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(userResult.location.length>0){
                                if(resu.location!=null && resu.location!=undefined){
                                  if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])>parseFloat(userResult.location[0])){
                                    resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                    if(parseFloat(resu.distance)<0){
                                      resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }else{
                                      resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }

                                  }else if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])<parseFloat(userResult.location[0])){
                                    resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                    if(parseFloat(resu.distance)<0){
                                      resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }else{
                                      resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }
                                  }
                                }else{
                                  //resu null
                                  res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                }
                              }else{
                                  //user location null
                                  res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                              }
                            }
                          })
                        }

                      }
                    })

                  }
                })
              }else{
                var array = done.favouriteAdds;
                var index = array.indexOf(params.advert_id);
                if (index > -1) {
                  done.favouriteAdds.splice(index, 1);
                }
                done.save(function(error,final){
                  if(error){
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      console.log("Error 535:",error);
                    }
                    res.status(500).send({message:"error in saving user",error:error});
                  }else{
                    Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,resu){
                      if(error){
                        res.status(500).send({error:error});
                      }else{

                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                          console.log({message:"successfully added to favourites",user:final,ad:resu});
                        }
                        if(req.user.currency !='USD'){
                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              User.findOne({_id:req.user._id}).exec(function(error,userResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(userResult.location.length>0){
                                    if(resu.location!=null && resu.location!=undefined){
                                      if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])>parseFloat(userResult.location[0])){
                                        resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                        if(parseFloat(resu.distance)<0){
                                          resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                        }else{
                                          resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                        }

                                      }else if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])<parseFloat(userResult.location[0])){
                                        resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                        if(parseFloat(resu.distance)<0){
                                          resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                        }else{
                                          resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                          resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                          res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                        }
                                      }
                                    }else{
                                      //resu null
                                      resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                      res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                    }
                                  }else{
                                    //user location null
                                    resu.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(resu.price)).toFixed(2);
                                    res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                  }
                                }
                              })
                            }
                          })
                        }else{
                          User.findOne({_id:req.user._id}).exec(function(error,userResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(userResult.location.length>0){
                                if(resu.location!=null && resu.location!=undefined){
                                  if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])>parseFloat(userResult.location[0])){
                                    resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                    if(parseFloat(resu.distance)<0){
                                      resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                      res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                    }else{
                                      resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                      res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                    }

                                  }else if(resu.location[1] !=null && resu.location[1] !=undefined && parseFloat(resu.location[1])<parseFloat(userResult.location[0])){
                                    resu.distance =   ((parseFloat(resu.location[1] - parseFloat(userResult.location[0])))*111)*1.69;
                                    if(parseFloat(resu.distance)<0){
                                      resu.distance = Number((parseFloat((resu.distance))*(-1)).toFixed(1));
                                      res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                    }else{
                                      resu.distance = Number(parseFloat(resu.distance)).toFixed(1);
                                      res.status(200).send({message:"successfully removed from favourites",user:final,ad:resu});
                                    }
                                  }
                                }else{
                                  //user location null
                                  res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                                }
                              }else{
                                //user location null
                                res.status(200).send({message:"successfully added to favourites",user:final,ad:resu});
                              }
                            }
                          })
                        }

                      }
                    })
                  }
                })
              }
            }
          })
        }else{
          res.status(404).send({message:"Invalid advert_id"});
        }
      }
    })
  }else{
    res.status(403).send({message:"advert_id required"});
  }
}

exports.getFavouriteAdds = function(req,res){
  User.findOne({_id:req.user._id}).exec(function(error,result){
    if(error){
      res.status(500).send({message:"error in finding user",error:error});
    }else{
      if(result.favouriteAdds!=null){
        Advertisement.find({_id:result.favouriteAdds}).populate("user_id").populate('physicalIssues').populate('accessories').populate('condition').populate('deviceDetails').populate("offers").sort({createdAt:-1}).exec(function(error,done){
          if(error){
            res.status(500).send({message:"error in finding favourite add and populating them",error:error});
          }else{
            if(done.length>0){
              console.log("User Currency : ",req.user.currency);
              if(req.user.currency != 'USD'){
                  curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(done.length>0){
                        done.forEach(function(i,idx,x){
                          done[idx]['isFavourite'] = true;
                          console.log("Before : ",done[idx].price);
                          done[idx].price = parseFloat(done[idx].price)*parseFloat(currencyResult.valueInUSD);
                          console.log("After : ",done[idx].price);
                          offer.find({_id:i.offers}).populate("user_id advert_id").exec(function(error,offerResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              //convert offered_price too

                          //    offerResult.offered_price = parseFloat(offerResult.offered_price)*parseFloat(currencyResult.valueInUSD);
                              done[idx].offers = offerResult;
                            }
                          })
                          if(idx == x.length-1){
                            setTimeout(function() {
                              res.status(200).send({result:done});
                            }, 1000);
                          }
                        })
                      }else{
                        res.status(200).send({result:done});
                      }
                    }
                  })
              }else{ // currency is USD
                if(done.length>0){
                  done.forEach(function(i,idx,x){
                    done[idx]['isFavourite'] = true;
                    offer.find({_id:i.offers}).populate("user_id advert_id").exec(function(error,offerResult){
                      if(error){
                        res.status(500).send({error:error});
                      }else{

                        done[idx].offers = offerResult;
                      }
                    })
                    if(idx == x.length-1){
                      setTimeout(function() {
                        res.status(200).send({result:done});
                      }, 1000);
                    }
                  })
                }else{
                  res.status(200).send({result:done});
                }
              }
            }else{
              res.status(200).send({result:done});
            }
          }
        })
      }else{
        res.status(404).send({message:"No favourite adds found"});
      }
    }
  })
}

exports.changePassword1 = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.newPassword!=null && params.newPassword!=undefined && params.newPassword!=''){
    if(params.oldPassword!=null && params.oldPassword!=undefined && params.oldPassword!=''){
      User.findOne({_id:req.user._id}).select('+password').exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          if (result.comparePassword(req.body.oldPassword, function (err, isMatch) {
            if (isMatch && !err) {
              result.password = params.newPassword;
              result.save(function(error,done){
                if(error){
                  res.status(500).send({error,error,message:"error in saving user"});
                }else{
                  res.status(200).send({message:"Password updated",user:done});
                }
              })
            } else {
              res.status(403).send({message:"current password not matched"});
            }
          })
        );
      }
    })
  }else{
    res.status(403).send({message:"oldPassword required"});
  }
}else{
  res.status(403).send({message:"newPassword required"});
}
}

exports.getUserDetails = function(req,res){
  User.findOne({_id:req.user._id}).populate("favouriteAdds package").exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      res.status(200).send({result:result});
    }
  })
}

exports.boostsPurchased = function(req,res){
  var params = req.body;
  if (params.purchased == null || params.purchased == undefined || params.purchased == "")
  {
    res.status(500).send({error: "Missing Params"})
  }
  else{
    User.findOne({_id:req.user._id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if (result.boostCount == undefined)
        {
          result.boostCount = 0;
        }
        result.boostCount = parseInt(result.boostCount) + parseInt(params.purchased.replace(/\D/g,''));
        result.save(function(error,done){
          if(error){
            res.status(500).send({error,error,message:"error in saving user"});
          }else{
            User.findOne({_id:req.user._id}).populate("package favouriteAdds").exec(function(error,final){
              if(error){
                res.status(500).send({error:error});
              }else{
                res.status(200).send({message:"User Updated",user:final});
              }
            })
          }
        })
      }
    })
  }
}

exports.removePaypal = function(req,res){
  var params = req.body;
  console.log("Request : ",req.body);
    User.findOne({_id:req.user._id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        var updatedResult = [];
        var count = 0;
        if(result.connections.length>0){
          result.connections.forEach(function(i,idx,x){
            if(i.type == 'paypal'){
        //      console.log("Found");
            }else{
              updatedResult[count] = i;
              count = count+1;
            }
            if(idx == x.length-1){
              result.connections = updatedResult;
              result.save(function(error,done){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(200).send({user:done});
                }
              })
            }
          })
        }else{
          res.status(404).send({message:"You dont have any linked paypal account"})
        }
      }
    })
}


exports.getAllUsers = function(req,res){
  if(req.user.isAdmin){
    User.find({}).populate("package").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        res.status(200).send({result:result});
      }
    })
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}


exports.getAllSuspendedUsers = function(req,res){
  if(req.user.isAdmin){
    User.find({blockReason:{$ne:""} , isDeleted:true}).populate("package").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(process.env.DEBUG_LOGS == 'true'){
          console.log("Found suspended: ",result.length);
        }
        res.status(200).send({result:result});
      }
    })
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}

exports.suspendUser = function(req,res){
  var params = req.body;
  if(req.user.isAdmin){
    if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
      if(params.reason!=null && params.reason!=undefined && params.reason!=''){
        User.findOne({_id:params.user_id}).populate("package").exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            result.isDeleted = true;
            result.blockReason = params.reason;
            result.save(function(error,saved){
              if(error){
                res.status(500).send({error:error});
              }else{
                res.status(200).send({message:"user suspended successfully",result:result});
              }
            })
          }
        })
      }else{
        res.status(403).send({message:"reason required"});
      }
    }else{
      res.status(403).send({message:"user_id required"});
    }
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}

exports.unsuspendUser = function(req,res){
  var params = req.body;
  if(req.user.isAdmin){
    if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
      User.findOne({_id:params.user_id}).populate("package").exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          result.isDeleted = false;
          result.blockReason = '';
          result.save(function(error,saved){
            if(error){
              res.status(500).send({error:error});
            }else{
              res.status(200).send({message:"user unblocked successfully",result:result});
            }
          })
        }
      })
    }else{
      res.status(403).send({message:"user_id required"});
    }
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}

exports.unsuspendAllUsers = function(req,res){
  if(req.user.isAdmin){
    User.update({blockReason:{$ne:""}},{blockReason:'',isDeleted:false},{multi:true}).then(function(result){
      User.find({}).populate("package").exec(function(error,done){
        if(error){
          res.status(500).send({error:error});
        }else{
            res.status(200).send({message:"all users unsuspended successfully",result:done});
        }
      })
    })
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}

exports.makeAdmin = function(req,res){
  var params = req.body;
  if(req.user.isAdmin){
    if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
      User.findOne({_id:req.body.user_id}).populate("packege").exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          if(result.isAdmin){
          result.isAdmin = false;
        }else{
          result.isAdmin = true;
        }
          result.save(function(error,done){
            if(error){
              res.status(500).send({error:error});
            }else{
              res.status(200).send({message:"success",result:result});
            }
          })
        }
      })
    }else{
      res.status(403).send({messgae:"user_id required"});
    }
  }else{
    res.status(401).send({message:"You are not authorised to make this call."})
  }
}

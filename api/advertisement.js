const Advertisement = require('../models/advertisement.js');
var httpreq = require('httpreq');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var cloudinary = require('cloudinary');
var groupBy = require('group-by');
var mobile = require('../models/mobile.js');
var report = require('../models/report.js');
var mobileBrand = require('../models/mobileBrand.js');
var User = require('../models/user.js');
var offer = require('../models/offer.js');
var chat = require('../models/chat.js');
var sail = require('../models/sail.js');
var offers = require('../models/offer.js');
var curr = require('../models/currency.js');
var request = require("request");
cloudinary.config(process.env.CLOUDINARY_URL);
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('userFile')
exports.checkParams = function(req,res){
  //console.log("Request: ",params);
}

exports.searchMobile = function(req,res){
  var userId = '';
  console.log("Request : ",req.body);
  if(req.body.user_id!=null && req.body.user_id!=undefined && req.body.user_id!=''){
    userId = req.body.user_id;
    delete req.body.user_id;
  }
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  for (var i in params) {
    if (params[i] == "") {
      delete params[i];
    }
  }
  var keys = Object.keys(params);
  var search ;
  var q = {};
  q.payment = false;
  if(params.color !=undefined && params.color !=""){
    q.color = params.color;
  }
  if(params.storage !=undefined && params.storage !=""){
    q.storage = params.storage;
  }
  delete params.color;
  delete params.price;
  delete params.storage;
  var ms = params;
  if(ms.keyword!=null && ms.keyword!=undefined && ms.keyword!=""){
    ms.DeviceName={ '$regex' : params['keyword'], '$options' : 'i' };
    q.description={ '$regex' : params['keyword'], '$options' : 'i' };
  }
  var skips;
  if(req.body.skip !=null && req.body.skip !=undefined && req.body.skip !=''){
    skips = req.body.skips;
    delete ms.skip;
  }else{
    skips = 0;
  }
  delete ms.keyword;
  mobile.find({$or:[
    {DeviceName:{ '$regex' : kw.toLowerCase(), '$options' : 'i' }},
    {description: { '$regex' : kw.toLowerCase(), '$options' : 'i' }}
  ]
}).exec(function(error,result){
  if(error){
    res.status(500).send({error:error});
  }else{
    var myArray=[];
    if(result.length>0){
      result.forEach(function(i,idx,x){
        myArray[idx] = i._id;
        if(idx == x.length-1){
          q['deviceDetails'] = { $in :myArray};
          q.visible = true;
          Advertisement.find(q).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,done){
            if(error){
              res.status(500).send({error:error});
            }else{
              if(done.length>0){
                search = done;
                if(userId!=''){
                  User.findOne({_id:userId}).exec(function(error,userResult){
                    if(error){
                      res.status(500).send({message:"find user error",error:error});
                    }else{
                      var fav = userResult.favouriteAdds;
                      if(fav.length>0){
                        search.forEach(function(i,idx,x){
                          fav.forEach(function(j,jdy,y){
                            var z =""+i._id;
                            var p = ""+j;
                            if(z==p){
                              i.isFavourite = true;
                            }
                            if(jdy==y.length-1){
                              if(idx==x.length-1){
                                res.status(200).send({result:search});
                              }
                            }
                          })
                        })
                      }else{
                        res.status(200).send({result:done});
                      }
                    }
                  })
                }else{
                  res.status(200).send({result:search});
                }
              }else{
                if(params.description!="" && params.description!=undefined && params.description!=null){
                  q.description = { '$regex' : params.description, '$options' : 'i' };
                }else{
                  delete q.description;
                }
                Advertisement.find(q).skip(skips*10).limit(10).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,done1){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(done1.length>0){
                      search = done1;
                      if(userId!=''){
                        User.findOne({_id:userId}).exec(function(error,userResult){
                          if(error){
                            res.status(500).send({message:"find user error",error:error});
                          }else{
                            var fav = userResult.favouriteAdds;
                            if(fav.length>0){
                              search.forEach(function(i,idx,x){
                                fav.forEach(function(j,jdy,y){
                                  var z =""+i._id;
                                  var p = ""+j;
                                  if(z==p){
                                    i.isFavourite = true;
                                  }
                                  if(jdy==y.length-1){
                                    if(idx==x.length-1){
                                      res.status(200).send({result:search});
                                    }
                                  }
                                })
                              })
                            }else{
                              res.status(200).send({result:done1});
                            }
                          }
                        })
                      }else{
                        res.status(200).send({result:search});
                      }
                    }else{
                      res.status(404).send({result:search,message:"No match found."});
                    }
                  }
                })
              }
            }
          })
        }
      })
    }else{
      if(params.description!="" && params.description!=undefined && params.description!=null){
        q.description = { '$regex' : params.description, '$options' : 'i' };
      }else{
        delete q.description;
      }
      Advertisement.find(q).skip(skips*10).limit(10).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,done1){
        if(error){
          res.status(500).send({error:error});
        }else{
          if(done1.length>0){
            search = done1;
            if(userId!=''){
              User.findOne({_id:userId}).exec(function(error,userResult){
                if(error){
                  res.status(500).send({message:"find user error",error:error});
                }else{
                  var fav = userResult.favouriteAdds;
                  if(fav.length>0){
                    search.forEach(function(i,idx,x){
                      fav.forEach(function(j,jdy,y){
                        var z =""+i._id;
                        var p = ""+j;
                        if(z==p){
                          i.isFavourite = true;
                        }
                        if(jdy==y.length-1){
                          if(idx==x.length-1){
                            res.status(200).send({result:search});
                          }
                        }
                      })
                    })
                  }else{
                    res.status(200).send({result:done1});
                  }
                }
              })
            }else{
              res.status(200).send({result:search});
            }
          }else{
            res.status(404).send({result:search,message:"No match found."});
          }
        }
      })
    }
  }
})
}

exports.placeAdd = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  for (var i in params) {
    if (params[i] == "") {
      delete params[i];
    }
  }
  params.user_id = req.user._id;
  User.findOne({_id:req.user._id}).exec(function(error,userResult){
    if(error){
      res.status(500).send({message:"error in finding user",error:error});
    }else{
      if(req.user.currency !='USD'){  //currency value of user is not USD
        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
          if(error){
            res.status(500).send({error:error});
          }else{
            params.price = parseFloat(params.price)/parseFloat(currencyResult.valueInUSD);
            if(userResult){
              if(userResult){
                if((typeof parseFloat(params.price) == "number" && !isNaN(params.price)  || (typeof parseFloat(params.age) == "number" || params.age == 0 || params.age=='0') && !isNaN(params.age)) || (params.age == 0 || params.age=='0')){
                  if(params.type !=null && params.type !=undefined && params.type !=""){
                    if(params.advert_id!=null && params.advert_id!="" && params.advert_id!=undefined){
                      Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          if(result){

                            result.price = req.body.price
                            ? req.body.price
                            : result.price;
                            result.color = req.body.color
                            ? req.body.color
                            : result.color;
                            if(req.body.age!=null && req.body.age!=undefined && req.body.age!=''){
                              result.age = req.body.age;
                            }
                            result.description = req.body.description
                            ? req.body.description
                            : result.description;
                            result.storage = req.body.storage
                            ? req.body.storage
                            : result.storage;
                            result.title = req.body.title
                            ? req.body.title
                            : result.title;
                            result.brandName = req.body.brandName
                            ? req.body.brandName
                            : result.brandName;
                            result.type = req.body.type
                            ? req.body.type
                            : result.type;
                            result.updatedAt = Date.now();
                            result.save(function(error,saved){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                      console.log("Updated : ",compl);
                                    }
                                    compl.price = Number(parseFloat(compl.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                    res.status(200).send({message:"Advertisement updated",result:compl});
                                  }
                                })
                              }
                            })
                          }else{
                            res.status(404).send({message:"Advertisement not found"});
                          }
                        }
                      })
                    }else{
                      if(userResult.addsCount){
                        params.price = parseFloat(params.price);
                        params.user_id = req.user._id;
                        mobile.findOne({_id:params.deviceDetails}).populate("Brand").exec(function(error,devices){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(devices){
                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                console.log("Brand Name : ",devices.Brand.brandName);
                              }
                              params.brandName = devices.Brand.brandName;
                              if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                var e = params.storage;
                                params.storage = e.toUpperCase();
                              }
                              if(params.color!=null && params.color!=undefined && params.color!=''){
                                var colorString = params.color;
                                params.color =   colorString.toUpperCase();
                              }
                              var lowerTitle = params.title.toLowerCase();
                              lowerTitle = lowerTitle.replace(" the","");
                              lowerTitle = lowerTitle.replace(" is","");
                              lowerTitle = lowerTitle.replace(" a","");
                              lowerTitle = lowerTitle.replace(" on","");
                              lowerTitle = lowerTitle.replace(" upon","");
                              lowerTitle = lowerTitle.replace(" was","");
                              var lowerDescription = params.title.toLowerCase();
                              lowerDescription = lowerDescription.replace(" the","");
                              lowerDescription = lowerDescription.replace(" is","");
                              lowerDescription = lowerDescription.replace(" a","");
                              lowerDescription = lowerDescription.replace(" on","");
                              lowerDescription = lowerDescription.replace(" upon","");
                              lowerDescription = lowerDescription.replace(" was","");
                              params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                              if(params.storage!=null && params.storage!=undefined && params.storage!='')
                              {
                                params.search = params.search + " "+params.storage;
                              }
                              if(params.color!=null && params.color!=undefined && params.color!='')
                              {
                                params.search = params.search + " " +params.color;
                              }
                              if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                              {
                                params.search = params.search + " " +params.brandName;
                              }
                              Advertisement.create(params).then(function(result){
                                Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                    console.log("AdvertID :",result._id);
                                    console.log("Populated Advert :",compl);
                                  }
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    //userResult.addsCount = parseInt(userResult.addsCount)-1;
                                    userResult.save(function(error,completedResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        compl.price = Number(parseFloat(compl.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                        res.status(202).send({result:compl});
                                      }
                                    })

                                  }
                                })
                              })
                            }else{
                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                console.log("New brand ....");
                              }
                              if((params.brandName!=null && params.brandName!=undefined && params.brandName!="") && (params.brand_id==null || params.brand_id==undefined || params.brand_id=="")){
                                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                  console.log("check#1");
                                }
                                mobileBrand.create({
                                  brandName : params.brandName
                                }).exec(function(comp){
                                  params.brandName = comp.brandName;
                                  if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                    var e = params.storage;
                                    params.storage = e.toUpperCase();
                                  }
                                  var lowerTitle = params.title.toLowerCase();
                                  lowerTitle = lowerTitle.replace(" the","");
                                  lowerTitle = lowerTitle.replace(" is","");
                                  lowerTitle = lowerTitle.replace(" a","");
                                  lowerTitle = lowerTitle.replace(" on","");
                                  lowerTitle = lowerTitle.replace(" upon","");
                                  lowerTitle = lowerTitle.replace(" was","");
                                  var lowerDescription = params.title.toLowerCase();
                                  lowerDescription = lowerDescription.replace(" the","");
                                  lowerDescription = lowerDescription.replace(" is","");
                                  lowerDescription = lowerDescription.replace(" a","");
                                  lowerDescription = lowerDescription.replace(" on","");
                                  lowerDescription = lowerDescription.replace(" upon","");
                                  lowerDescription = lowerDescription.replace(" was","");
                                  params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                                  if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                  {
                                    params.search = params.search + " "+params.storage;
                                  }
                                  if(params.color!=null && params.color!=undefined && params.color!='')
                                  {
                                    params.search = params.search + " " +params.color;
                                  }
                                  if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                  {
                                    params.search = params.search + " " +params.brandName;
                                  }
                                  Advertisement.create(params).then(function(result){
                                    Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                        console.log("AdvertID :",result._id);
                                        console.log("Populated Advert :",compl);
                                      }
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        //  userResult.addsCount = parseInt(userResult.addsCount)-1;
                                        userResult.save(function(error,completedResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            compl.price = Number(parseFloat(compl.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                            res.status(202).send({result:compl});
                                          }
                                        })
                                      }
                                    })
                                  })
                                })
                              }else if((params.brand_id!=null && params.brand_id!=undefined && params.brand_id!="" )&&(params.brandName==null || params.brandName==undefined || params.brandName=="")){
                                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                  console.log("check#2");
                                }
                                mobileBrand.findOne({_id:params.brand_id}).exec(function(error,makeit){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(makeit){
                                      params.brandName = makeit.brandName;
                                      var lowerTitle = params.title.toLowerCase();
                                      lowerTitle = lowerTitle.replace(" the","");
                                      lowerTitle = lowerTitle.replace(" is","");
                                      lowerTitle = lowerTitle.replace(" a","");
                                      lowerTitle = lowerTitle.replace(" on","");
                                      lowerTitle = lowerTitle.replace(" upon","");
                                      lowerTitle = lowerTitle.replace(" was","");
                                      var lowerDescription = params.title.toLowerCase();
                                      lowerDescription = lowerDescription.replace(" the","");
                                      lowerDescription = lowerDescription.replace(" is","");
                                      lowerDescription = lowerDescription.replace(" a","");
                                      lowerDescription = lowerDescription.replace(" on","");
                                      lowerDescription = lowerDescription.replace(" upon","");
                                      lowerDescription = lowerDescription.replace(" was","");
                                      params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                                      if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                      {
                                        params.search = params.search + " "+params.storage;
                                      }
                                      if(params.color!=null && params.color!=undefined && params.color!='')
                                      {
                                        params.search = params.search + " " +params.color;
                                      }
                                      if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                      {
                                        params.search = params.search + " " +params.brandName;
                                      }
                                      Advertisement.create(params).then(function(result){
                                        //    userResult.addsCount = parseInt(userResult.addsCount)-1;
                                        userResult.save(function(error,completedAdd){
                                          if(error){
                                            res.status(500).send({message:"error in updating user",error:error});
                                          }else{
                                            Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                  console.log("Response : ",compl);
                                                }
                                                //      userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                userResult.save(function(error,completedResult){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    compl.price = Number(parseFloat(compl.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                                    res.status(202).send({result:compl});
                                                  }
                                                })
                                              }
                                            })
                                          }
                                        })
                                      })
                                    }else{
                                      res.status(422).send({message: "Brand name or Brand ID cannot be empty, if you are placing accessory advertisement"});
                                    }
                                  }
                                })
                              }
                            }
                          }
                        })
                      }else{
                        res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
                      }
                    }
                  }else{
                    res.status(403).send({message: "type required"});
                  }
                }else{
                  res.status(422).send({message:"invalid parameters"});
                }
              }else{
                res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
              }
            }else{
              res.status(401).send({message:"user not found"});
            }
          }
        })
      }else{ // currency value of user is USD
        if(userResult){
          if(userResult){
            if((typeof parseFloat(params.price) == "number" && !isNaN(params.price)  || (typeof parseFloat(params.age) == "number" || params.age == 0 || params.age=='0') && !isNaN(params.age))|| (params.age == 0 || params.age=='0')){
              if(params.type !=null && params.type !=undefined && params.type !=""){
                if(params.advert_id!=null && params.advert_id!="" && params.advert_id!=undefined){
                  Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(result){

                        result.price = req.body.price
                        ? req.body.price
                        : result.price;
                        result.color = req.body.color
                        ? req.body.color
                        : result.color;

                        if(req.body.age!=null && req.body.age!=undefined && req.body.age!=''){
                          result.age = req.body.age;
                        }
                        result.description = req.body.description
                        ? req.body.description
                        : result.description;
                        result.storage = req.body.storage
                        ? req.body.storage
                        : result.storage;
                        result.title = req.body.title
                        ? req.body.title
                        : result.title;
                        result.brandName = req.body.brandName
                        ? req.body.brandName
                        : result.brandName;
                        result.type = req.body.type
                        ? req.body.type
                        : result.type;
                        result.updatedAt = Date.now();
                        result.save(function(error,saved){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                  console.log("Updated : ",compl);
                                }
                                res.status(200).send({message:"Advertisement updated",result:compl});
                              }
                            })
                          }
                        })
                      }else{
                        res.status(404).send({message:"Advertisement not found"});
                      }
                    }
                  })
                }else{
                  if(userResult.addsCount>0){
                    params.price = parseFloat(params.price);
                    params.user_id = req.user._id;
                    mobile.findOne({_id:params.deviceDetails}).populate("Brand").exec(function(error,devices){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(devices){
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Brand Name : ",devices.Brand.brandName);
                          }
                          params.brandName = devices.Brand.brandName;
                          if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                            var e = params.storage;
                            params.storage = e.toUpperCase();
                          }
                          if(params.color!=null && params.color!=undefined && params.color!=''){
                            var colorString = params.color;
                            params.color =   colorString.toUpperCase();
                          }
                          var lowerTitle = params.title.toLowerCase();
                          lowerTitle = lowerTitle.replace(" the","");
                          lowerTitle = lowerTitle.replace(" is","");
                          lowerTitle = lowerTitle.replace(" a","");
                          lowerTitle = lowerTitle.replace(" on","");
                          lowerTitle = lowerTitle.replace(" upon","");
                          lowerTitle = lowerTitle.replace(" was","");
                          var lowerDescription = params.title.toLowerCase();
                          lowerDescription = lowerDescription.replace(" the","");
                          lowerDescription = lowerDescription.replace(" is","");
                          lowerDescription = lowerDescription.replace(" a","");
                          lowerDescription = lowerDescription.replace(" on","");
                          lowerDescription = lowerDescription.replace(" upon","");
                          lowerDescription = lowerDescription.replace(" was","");
                          params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                          if(params.storage!=null && params.storage!=undefined && params.storage!='')
                          {
                            params.search = params.search + " "+params.storage;
                          }
                          if(params.color!=null && params.color!=undefined && params.color!='')
                          {
                            params.search = params.search + " " +params.color;
                          }
                          if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                          {
                            params.search = params.search + " " +params.brandName;
                          }
                          Advertisement.create(params).then(function(result){
                            Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                console.log("AdvertID :",result._id);
                                console.log("Populated Advert :",compl);
                              }
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                //  userResult.addsCount = parseInt(userResult.addsCount)-1;
                                userResult.save(function(error,completedResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    res.status(202).send({result:compl});
                                  }
                                })

                              }
                            })
                          })
                        }else{
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("New brand ....");
                          }
                          if((params.brandName!=null && params.brandName!=undefined && params.brandName!="") && (params.brand_id==null || params.brand_id==undefined || params.brand_id=="")){
                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                              console.log("check#1");
                            }
                            mobileBrand.create({
                              brandName : params.brandName
                            }).exec(function(comp){
                              params.brandName = comp.brandName;
                              if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                var e = params.storage;
                                params.storage = e.toUpperCase();
                              }
                              var lowerTitle = params.title.toLowerCase();
                              lowerTitle = lowerTitle.replace(" the","");
                              lowerTitle = lowerTitle.replace(" is","");
                              lowerTitle = lowerTitle.replace(" a","");
                              lowerTitle = lowerTitle.replace(" on","");
                              lowerTitle = lowerTitle.replace(" upon","");
                              lowerTitle = lowerTitle.replace(" was","");
                              var lowerDescription = params.title.toLowerCase();
                              lowerDescription = lowerDescription.replace(" the","");
                              lowerDescription = lowerDescription.replace(" is","");
                              lowerDescription = lowerDescription.replace(" a","");
                              lowerDescription = lowerDescription.replace(" on","");
                              lowerDescription = lowerDescription.replace(" upon","");
                              lowerDescription = lowerDescription.replace(" was","");
                              params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                              if(params.storage!=null && params.storage!=undefined && params.storage!='')
                              {
                                params.search = params.search + " "+params.storage;
                              }
                              if(params.color!=null && params.color!=undefined && params.color!='')
                              {
                                params.search = params.search + " " +params.color;
                              }
                              if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                              {
                                params.search = params.search + " " +params.brandName;
                              }
                              Advertisement.create(params).then(function(result){
                                Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                    console.log("AdvertID :",result._id);
                                    console.log("Populated Advert :",compl);
                                  }
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    //  userResult.addsCount = parseInt(userResult.addsCount)-1;
                                    userResult.save(function(error,completedResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        res.status(202).send({result:compl});
                                      }
                                    })
                                  }
                                })
                              })
                            })
                          }else if((params.brand_id!=null && params.brand_id!=undefined && params.brand_id!="" )&&(params.brandName==null || params.brandName==undefined || params.brandName=="")){
                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                              console.log("check#2");
                            }
                            mobileBrand.findOne({_id:params.brand_id}).exec(function(error,makeit){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                if(makeit){
                                  params.brandName = makeit.brandName;
                                  var lowerTitle = params.title.toLowerCase();
                                  lowerTitle = lowerTitle.replace(" the","");
                                  lowerTitle = lowerTitle.replace(" is","");
                                  lowerTitle = lowerTitle.replace(" a","");
                                  lowerTitle = lowerTitle.replace(" on","");
                                  lowerTitle = lowerTitle.replace(" upon","");
                                  lowerTitle = lowerTitle.replace(" was","");
                                  var lowerDescription = params.title.toLowerCase();
                                  lowerDescription = lowerDescription.replace(" the","");
                                  lowerDescription = lowerDescription.replace(" is","");
                                  lowerDescription = lowerDescription.replace(" a","");
                                  lowerDescription = lowerDescription.replace(" on","");
                                  lowerDescription = lowerDescription.replace(" upon","");
                                  lowerDescription = lowerDescription.replace(" was","");
                                  params.search = (lowerTitle+" "+lowerDescription).toLowerCase();
                                  if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                  {
                                    params.search = params.search + " "+params.storage;
                                  }
                                  if(params.color!=null && params.color!=undefined && params.color!='')
                                  {
                                    params.search = params.search + " " +params.color;
                                  }
                                  if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                  {
                                    params.search = params.search + " " +params.brandName;
                                  }
                                  Advertisement.create(params).then(function(result){
                                    //    userResult.addsCount = parseInt(userResult.addsCount)-1;
                                    userResult.save(function(error,completedAdd){
                                      if(error){
                                        res.status(500).send({message:"error in updating user",error:error});
                                      }else{
                                        Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("Response : ",compl);
                                            }
                                            //      userResult.addsCount = parseInt(userResult.addsCount)-1;
                                            userResult.save(function(error,completedResult){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                res.status(202).send({result:compl});
                                              }
                                            })
                                          }
                                        })
                                      }
                                    })
                                  })
                                }else{
                                  res.status(422).send({message: "Brand name or Brand ID cannot be empty, if you are placing accessory advertisement"});
                                }
                              }
                            })
                          }
                        }
                      }
                    })
                  }else{
                    res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
                  }
                }
              }else{
                res.status(403).send({message: "type required"});
              }
            }else{
              res.status(422).send({message:"invalid parameters"});
            }
          }else{
            res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
          }
        }else{
          res.status(401).send({message:"user not found"});
        }
      }
    }
  })
}

exports.getAddsWithGroup = function(req,res){
  Advertisement.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      results = result.reduce(function (r, a) {
        r[a.Brand] = r[a.Brand] || [];
        r[a.Brand].push(a);
        return r;
      }, Object.create(null));
      res.status(200).send({result:results});
    }
  })
}

exports.rectangleLocationSearch = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.pointOneLat != null && params.pointOneLat != undefined && params.pointOneLat != ''){
    if(params.pointTwoLat != null && params.pointTwoLat != undefined && params.pointTwoLat != ''){
      if(params.pointThreeLat != null && params.pointThreeLat != undefined && params.pointThreeLat != ''){
        if(params.pointFourLat != null && params.pointFourLat != undefined && params.pointFourLat != ''){
          Advertisement.find({ $and: [ {
            "location.0":{
              '$gte': parseInt(params.pointOneLat)
            },
            "location.1":{
              '$lte': parseInt(params.pointOneLng)
            } },{
              "location.0":{
                '$lte': parseInt(params.pointTwoLat)
              },
              "location.1":{
                '$lte': parseInt(params.pointTwoLng)
              } },{
                "location.0":{
                  '$lte': parseInt(params.pointThreeLat)
                },
                "location.1":{
                  '$gte': parseInt(params.pointThreeLng)
                } },{
                  "location.0":{
                    '$gte': parseInt(params.pointFourLat)
                  },
                  "location.1":{
                    '$gte': parseInt(params.pointFourLng)
                  } } ] }).exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(result.length>0){
                        res.status(200).send({result:result});
                      }else{
                        res.status(404).send({result:result});
                      }
                    }
                  })
                }else{
                  res.status(403).send({message:"Point four required"});
                }
              }else{
                res.status(403).send({message:"Point Three required"});
              }
            }else{
              res.status(403).send({message:"Point two required"});
            }
          }else{
            res.status(403).send({message:"Point one required"});
          }
        }

        exports.phoneSwitchOn = function(req,res){
          var params = req.body;
          if(params.advert_id!=null && params.advert_id!=undefined){
            Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                if(result){
                  result.phoneDead = params.phoneDead;
                  if(params.phoneDead == true || params.phoneDead == 'true'){
                    result.physicalIssues = [];
                  }
                  result.save(function(error,done){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(req.user.currency!='USD'){
                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            done.price = parseFloat(done.price)*parseFloat(currencyResult.valueInUSD);
                            res.status(200).send({result:done});
                          }
                        })
                      }else{
                        res.status(200).send({result:done});
                      }
                    }
                  })
                }else{
                  res.status(404).send({success:false,message:"Advertisement not found."});
                }
              }
            })
          }
        }

        exports.advertisementHistory = function(req,res){
          Advertisement.find({user_id:req.user._id}).exec(function(error,result){
            if(error){
              res.status(500).send({error:error});
            }else{
              res.status(200).send({result:result});
            }
          })
        }

        exports.verifyTrue = function(req,res){
          var params = req.body;
          if(params.advert_id!=null && params.advert_id!=""){
            User.findOne({_id:req.user._id}).exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                if(parseInt(result.addsCount)>0){
                  Advertisement.findOne({_id:params.advert_id}).exec(function(error,adResult){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      adResult.visible = true;
                      adResult.isVerified = true;
                      adResult.updatedAt = Date.now();
                      adResult.save(function(error,adSaved){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          result.addsCount = parseInt(result.addsCount)-1;
                          result.save(function(error,userSaved){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              User.findOne({_id:req.user._id}).populate("favouriteAdds package").exec(function(error,userResult1){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  Advertisement.findOne({_id:params.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,found){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      if(req.user.currency !='USD'){  //currency value of user is not USD
                                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            found.price = parseFloat(found.price)*parseFloat(currencyResult.valueInUSD);
                                            if(req.user.location.length>0){
                                              if(parseFloat(req.user.location[0])>parseFloat(found.location[1])){
                                                found.distance =   Number(((parseFloat(found.location[1]) - parseFloat(req.user.location[0]))*111)/1.69).toFixed(2);
                                              }else{
                                                found.distance =   Number(((parseFloat(req.user.location[0])-parseFloat(found.location[1]))*111)/1.69).toFixed(2);
                                              }
                                            }
                                            if(parseFloat(found.distance)<0){
                                              found.distance = (-1)*(parseFloat(found.distance));
                                            }
                                            if(parseFloat(found.distance)<0){
                                              found.distance = (-1)*(parseFloat(found.distance));
                                            }
                                            res.status(200).send({message:"Advertisement posted successfully",result:found,user:userResult1});
                                          }
                                        })
                                      }else{
                                        if(req.user.location.length>0){
                                          if(parseFloat(req.user.location[0])>parseFloat(found.location[1])){
                                            found.distance =   Number(((parseFloat(found.location[1]) - parseFloat(req.user.location[0]))*111)/1.69).toFixed(2);
                                          }else{
                                            found.distance =   Number(((parseFloat(req.user.location[0])-parseFloat(found.location[1]))*111)/1.69).toFixed(2);
                                          }
                                        }
                                        if(parseFloat(found.distance)<0){
                                          found.distance = (-1)*(parseFloat(found.distance));
                                        }
                                        if(parseFloat(found.distance)<0){
                                          found.distance = (-1)*(parseFloat(found.distance));
                                        }
                                        res.status(200).send({message:"Advertisement posted successfully",result:found,user:userResult1});
                                      }
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }else{
                  res.status(404).send({message:"Please upgrade your account first"});
                }
              }
            })
          }else{
            res.status(403).send({message:"Advertisement id required"});
          }

        }

        exports.enableDisableAdd = function(req,res){
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log("Request : ",req.body);
          }
          if(req.body.advert_id !=null && req.body.advert_id !=undefined && req.body.advert_id !=''){
            Advertisement.findOne({_id:req.body.advert_id,user_id:req.user._id}).exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                if(result && (result.reason==null || result.reason=="")){
                  if(result.visible == true){
                    result.visible = false;
                  }else{
                    result.visible = true;
                  }
                  console.log("Created At",new Date(result.createdAt).getTime());
                  if(new Date(Date.now()).getTime() - new Date(result.createdAt).getTime() < 2592000000 || result.visible == false){
                    //Time is less than one month
                    result.save(function(error,done){
                      if(error){
                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                          console.log("Error : ",error);
                        }
                        res.status(500).send({error:error});
                      }else{
                        if(req.user.currency !='USD'){  //currency value of user is not USD
                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              done.price = Number(parseFloat(done.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                              res.status(200).send({result:done});
                            }
                          })
                        }else{
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Currency not USD : ",done);
                            res.status(200).send({result:done});
                          }
                        }
                      }
                    })
                  }else{
                    //time greater than one month
                    User.findOne({_id:req.user._id}).populate("package").exec(function(error,userResult){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(parseInt(userResult.addsCount)>0){
                          userResult.addsCount = parseInt(userResult.addsCount - 1);
                          userResult.save(function(error,savedUser){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              result.createdAt = Date.now();
                              result.save(function(error,done){
                                if(error){
                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                    console.log("Error : ",error);
                                  }
                                  res.status(500).send({error:error});
                                }else{
                                  if(req.user.currency !='USD'){  //currency value of user is not USD
                                    curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        done.price = Number(parseFloat(done.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                        res.status(200).send({result:done , user:userResult});
                                      }
                                    })
                                  }else{
                                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                      console.log("Currency not USD : ",done);
                                      res.status(200).send({result:done , user:userResult});
                                    }
                                  }
                                }
                              })
                            }
                          })
                        }else{
                          //user addsCount is Zero
                          res.status(403).send({message:"Please upgrade your package first"});
                        }
                      }
                    })
                  }
                }else{
                  if(result && result.reason!=""){
                    res.status(403).send({message:"This advertisement is disabled by admin as " + result.reason});
                  }else{
                    res.status(404).send({message:"Advertisement not found or might be disabled by admin"});
                  }
                }
              }
            })
          }else{
            res.status(403).send({message:"advert_id required"});
          }
        }

        exports.makeOffer = function(req,res){
          var params = req.body;
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log("Request : ",params);
          }
          var currencyPrice = params.price;
          var priceBefore = parseFloat(params.price);
          if(req.user.currency !='USD'){  //currency value of user is not USD
            curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
              if(error){
                res.status(500).send({error:error});
              }else{
                params.price = parseFloat(params.price)/parseFloat(currencyResult.valueInUSD);

                if(typeof parseFloat(params.price) == "number" && !isNaN(params.price)){
                  if(params.advert_id != null && params.advert_id != undefined && params.advert_id != ""){

                    offer.findOne({  user_id:req.user._id,
                      advert_id:params.advert_id,
                      status : {$in:['pending','counter','re-counter']}}).exec(function(error,pendingRes){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          if(pendingRes){
                            res.status(403).send({message:"Already offered against this ad"});
                          }else{
                            offer.findOne({
                              user_id:req.user._id,
                              advert_id:params.advert_id,
                              status : 'pending',
                              visible:true

                            }).exec(function(error,offerFound){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                if(offerFound){
                                  res.status(403).send({message:"Already offered against this ad"});
                                }else{
                                  if(req.user.currency!='USD'){ //user currency is not USD
                                    curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        params.price = (parseFloat(params.price)/parseFloat(currencyResult.valueInUSD))*parseFloat(currencyResult.valueInUSD);
                                        console.log(params.price);
                                        offer.create({
                                          user_id:req.user._id,
                                          offered_price:parseFloat(params.price),
                                          advert_id:params.advert_id,
                                          status:'pending'
                                        }).then(function(result){
                                          Advertisement.findOne({_id:params.advert_id}).exec(function(error,done){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              if(done){
                                                if(done.offers.length>0){
                                                  done.offers=[result._id].concat(done.offers)
                                                }else{
                                                  done.offers = result._id;
                                                }
                                                done.updatedAt = Date.now();
                                                done.save(function(error,final){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    // var user11 = ""+req.user._id;
                                                    // var user22 = ""+final.user_id;
                                                    // var comparison = user11.localeCompare(user22);
                                                    // if (comparison > 0) {
                                                    //   chatId = user11 + user22 + params.advert_id;
                                                    // } else {
                                                    //   chatId = user22 + user11 + params.advert_id;
                                                    // }
                                                    // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"My offer for this advertisement is "+Number(parseFloat(currencyPrice)).toFixed(2)+ " " + req.user.currency,advert_id:params.advert_id })
                                                    // .save(function (error, resultchat) {
                                                    //   if (error) {
                                                    //     res.status(500).send({error:error});
                                                    //   } else {
                                                    Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").exec(function(error,advertFinal){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        offer.find({_id:advertFinal.offers}).populate("user_id advert_id sail_id").exec(function(error,completeResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            completeResult.offered_price = Number(priceBefore).toFixed(2);
                                                            advertFinal.offers = completeResult;
                                                            var messageNotification = "You have received an offer on "+done.title+". Please check your offer section";
                                                            var urlRequest =   { method: 'POST',
                                                            url: process.env.url+"/testnotification/" + done.user_id + "/" + messageNotification,
                                                            headers:
                                                            { 'content-type': 'application/x-www-form-urlencoded',
                                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                            'cache-control': 'no-cache' } }
                                                            console.log("Log1", urlRequest);
                                                            request(urlRequest, function (error, response, body) {
                                                              res.status(200).send({message:"Offer created successfully",result:advertFinal});
                                                            });
                                                          }
                                                        })

                                                      }
                                                    })

                                                    //   }
                                                    // })
                                                  }
                                                })
                                              }else{
                                                res.status(404).send({message:"Advertisement not found"});
                                              }
                                            }
                                          })
                                        })
                                      }
                                    })
                                  }else{ // user currency is USD
                                    offer.create({
                                      user_id:req.user._id,
                                      offered_price:parseFloat(params.price),
                                      advert_id:params.advert_id,
                                      status:'pending'
                                    }).then(function(result){
                                      console.log("user currency USD")
                                      Advertisement.findOne({_id:params.advert_id}).exec(function(error,done){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          if(done){
                                            if(done.offers.length>0){
                                              done.offers=[result._id].concat(done.offers);
                                            }else{
                                              done.offers = result._id;
                                            }
                                            done.updatedAt = Date.now();
                                            done.save(function(error,final){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                // var user11 = ""+req.user._id;
                                                // var user22 = ""+final.user_id;
                                                // var comparison = user11.localeCompare(user22);
                                                // if (comparison > 0) {
                                                //   chatId = user11 + user22 + params.advert_id;
                                                // } else {
                                                //   chatId = user22 + user11 + params.advert_id;
                                                // }
                                                // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"My offer for this advertisement is "+Number(parseFloat(currencyPrice)).toFixed(2)+ " " + req.user.currency  ,advert_id:params.advert_id})
                                                // .save(function (error, resultchat) {
                                                //   if (error) {
                                                //     res.status(500).send({error:error});
                                                //   } else {
                                                Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").exec(function(error,advertFinal){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    offer.find({_id:advertFinal.offers}).populate("user_id advert_id sail_id").exec(function(error,completeResult){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        advertFinal.offers = completeResult;
                                                        var messageNotification = "You have received an offer on "+done.title+". Please check your offer section";
                                                        var urlRequest = { method: 'POST',
                                                        url: process.env.url+"/testnotification/" + done.user_id + "/" + messageNotification,
                                                        headers:
                                                        { 'content-type': 'application/x-www-form-urlencoded',
                                                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                        'cache-control': 'no-cache' } }

                                                        request(urlRequest, function (error, response, body) {
                                                          res.status(200).send({message:"Offer created successfully",result:advertFinal});
                                                        });
                                                      }
                                                    })

                                                  }
                                                })
                                                //   }
                                                // })
                                              }
                                            })
                                          }else{
                                            res.status(404).send({message:"Advertisement not found"});
                                          }
                                        }
                                      })
                                    })
                                  }
                                }
                              }
                            })
                          }
                        }
                      })

                    }else{
                      res.status(403).send({message:"Advert ID missing"});
                    }
                  }
                }
              })
            }else{ //user currency is equal to USD
              params.price = parseFloat(params.price);
              if(typeof parseFloat(params.price) == "number" && !isNaN(params.price)){
                if(params.advert_id != null && params.advert_id != undefined && params.advert_id != ""){
                  offer.findOne({
                    user_id:req.user._id,
                    advert_id:params.advert_id,
                    status : 'pending'
                  }).exec(function(error,offerFound){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(offerFound){
                        res.status(403).send({message:"Already offered against this ad"});
                      }else{
                        offer.create({
                          user_id:req.user._id,
                          offered_price:parseFloat(params.price),
                          advert_id:params.advert_id,
                          status:'pending',
                          sort:1
                        }).then(function(result){
                          Advertisement.findOne({_id:params.advert_id}).exec(function(error,done){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(done){
                                if(done.offers.length>0){
                                  done.offers=[result._id].concat(done.offers)
                                }else{
                                  done.offers = result._id;
                                }
                                done.updatedAt = Date.now();
                                done.save(function(error,final){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    // var user11 = ""+req.user._id;
                                    // var user22 = ""+final.user_id;
                                    // var comparison = user11.localeCompare(user22);
                                    // if (comparison > 0) {
                                    //   chatId = user11 + user22 + params.advert_id;
                                    // } else {
                                    //   chatId = user22 + user11 + params.advert_id;
                                    // }
                                    // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"My offer for this advertisement is "+Number(parseFloat(currencyPrice)).toFixed(2)+" "+req.user.currency ,advert_id:params.advert_id})
                                    // .save(function (error, resultchat) {
                                    //   if (error) {
                                    //     res.status(500).send({error:error});
                                    //   } else {
                                    Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").exec(function(error,advertFinal){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        offer.find({_id:advertFinal.offers}).populate("user_id advert_id sail_id").exec(function(error,completeResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            completeResult.offered_price = Number(priceBefore).toFixed(2);
                                            advertFinal.offers = completeResult;
                                            var messageNotification = "You have received an offer on "+done.title+". Please check your offer section";
                                            var urlRequest = { method: 'POST',
                                            url: process.env.url+"/testnotification/" + done.user_id + "/" + messageNotification,
                                            headers:
                                            { 'content-type': 'application/x-www-form-urlencoded',
                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                            'cache-control': 'no-cache' } }
                                            request(urlRequest, function (error, response, body) {
                                              res.status(200).send({message:"Offer created successfully",result:advertFinal});
                                            });
                                          }
                                        })

                                      }
                                    })
                                    //   }
                                    // })
                                  }
                                })
                              }else{
                                res.status(404).send({message:"Advertisement not found"});
                              }
                            }
                          })
                        })
                      }
                    }
                  })

                }else{
                  res.status(403).send({message:"Advert ID missing"});
                }
              }else{
                res.status(422).send({message:"invalid parameters"});
              }
            }

          }

          exports.acceptRejectOffer = function(req,res){
            var params = req.body;
            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
              console.log("Request : ",params);
            }
            if(params.offer_id!=null && params.offer_id!=undefined && params.offer_id!="" && params.status!=null && params.status!=undefined && params.status!=""){
              offer.findOne({_id:params.offer_id,status:{$in:["pending","counter","re-counter"]}}).exec(function(error,result){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(result){
                    //  result.status = params.status;
                    result.save(function(error,done){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        offer.findOne({_id:params.offer_id}).populate("user_id advert_id").exec(function(error,final){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                              console.log("Offer after update : ",final);
                            }
                            if(params.status == 'accepted'){
                              offer.findOne({advert_id:final.advert_id,status:'accepted'}).exec(function(error,acceptedResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(acceptedResult){
                                    res.status(403).send({message:"Reject previous accepted offer first"});
                                  }else{
                                    sail.create({
                                      seller_id:final.advert_id.user_id,
                                      buyer_id : final.user_id,
                                      status : 'address pending',
                                      advert_id : final.advert_id._id,
                                      offer_id : params.offer_id
                                    }).then(function(sails){
                                      Advertisement.findOne({_id:final.advert_id._id}).exec(function(error,addResult){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          if(addResult){
                                            var soldImage = [process.env.SOLD_IMAGE];
                                            // addResult.pictures = soldImage.concat(addResult.pictures);
                                            addResult.boosted = false;
                                            addResult.save(function(error,addComplete){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                final.sail_id = sails._id;
                                                final.sort = 4;
                                                final.status = 'accepted',
                                                final.updatedAt = Date.now();
                                                final.save(function(error,finalSaved){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                      console.log("sail created : ",finalSaved);
                                                    }
                                                    offer.find({ advert_id:final.advert_id._id }).populate("user_id advert_id sail_id").exec(function(error,done){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        if(done.length>0){
                                                          done.forEach(function(i,idx,x){
                                                            User.findOne({_id:i.advert_id.user_id}).exec(function(error,result){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                done[idx].advert_id.user_id = result;
                                                                if(idx == x.length-1){
                                                                  //  console.log("User populated response :",done);
                                                                  if(req.user.currency !='USD'){  //currency value of user is not USD
                                                                    curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                                      if(error){
                                                                        res.status(500).send({error:error});
                                                                      }else{
                                                                        done.forEach(function(j,jdy,y){
                                                                          done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                                                          done[jdy].advert_id.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].advert_id.price)).toFixed(2);
                                                                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                            console.log("prices : ",done[jdy].offered_price,done[jdy].advert_id.price);
                                                                          }
                                                                          if(jdy == y.length-1){
                                                                            console.log("Length : done 1 ::  ",done.length);
                                                                            //                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                            if(final.status == 'counter'){
                                                                              var messageNotification = "Your offer has been accepted, Please check your advertisement offers.";
                                                                              var urlRequest =    { method: 'POST',
                                                                              url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                              headers:
                                                                              { 'content-type': 'application/x-www-form-urlencoded',
                                                                              'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                              'cache-control': 'no-cache' } }
                                                                              request(urlRequest, function (error, response, body) {
                                                                                // var user11 = ""+final.advert_id.user_id;
                                                                                // var user22 = ""+final.user_id._id;
                                                                                // var comparison = user11.localeCompare(user22);
                                                                                // if (comparison > 0) {
                                                                                //   chatId = user11 + user22 + final.advert_id._id;
                                                                                // } else {
                                                                                //   chatId = user22 + user11 + final.advert_id._id;
                                                                                // }
                                                                                // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                                //   console.log("***********Chat ID**********",chatId);
                                                                                // }
                                                                                // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                                                // .save(function (error, resultchat) {
                                                                                res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                                //  })
                                                                              });
                                                                            }else{
                                                                              var messageNotification = "Your offer has been accepted, Please check Your sent offers.";
                                                                              var urlRequest = { method: 'POST',
                                                                              url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                              headers:
                                                                              { 'content-type': 'application/x-www-form-urlencoded',
                                                                              'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                              'cache-control': 'no-cache' } }
                                                                              request(urlRequest, function (error, response, body) {
                                                                                // var user11 = ""+final.advert_id.user_id;
                                                                                // var user22 = ""+final.user_id._id;
                                                                                // var comparison = user11.localeCompare(user22);
                                                                                // if (comparison > 0) {
                                                                                //   chatId = user11 + user22 + final.advert_id._id;
                                                                                // } else {
                                                                                //   chatId = user22 + user11 + final.advert_id._id;
                                                                                // }
                                                                                // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                                //   console.log("***********Chat ID**********",chatId);
                                                                                // }
                                                                                // new chat({ chat_id: chatId, advert_id : final.advert_id._id,user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your offer has been accepted, Please check your advertisement offers."  })
                                                                                // .save(function (error, resultchat) {
                                                                                res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                                // })
                                                                              });
                                                                            }
                                                                          }
                                                                        })
                                                                      }
                                                                    })
                                                                  }else{ //user currency is not equal to USD
                                                                    console.log("Length : done 2::",done.length);
                                                                    if(final.status == 'counter'){
                                                                      var messageNotification = "Your offer has been accepted, Please check your advertisement offers.";
                                                                      var urlRequest = { method: 'POST',
                                                                      url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                      headers:
                                                                      { 'content-type': 'application/x-www-form-urlencoded',
                                                                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                      'cache-control': 'no-cache' } }
                                                                      request(urlRequest, function (error, response, body) {
                                                                        // var user11 = ""+final.advert_id.user_id;
                                                                        // var user22 = ""+final.user_id._id;
                                                                        // var comparison = user11.localeCompare(user22);
                                                                        // if (comparison > 0) {
                                                                        //   chatId = user11 + user22 + final.advert_id._id;
                                                                        // } else {
                                                                        //   chatId = user22 + user11 + final.advert_id._id;
                                                                        // }
                                                                        // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                        //   console.log("***********Chat ID**********",chatId);
                                                                        // }
                                                                        // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                                        // .save(function (error, resultchat) {
                                                                        res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                        // })
                                                                      });
                                                                    }else{
                                                                      var messageNotification = "Your offer has been accepted, Please check Your sent offers.";
                                                                      var urlRequest = { method: 'POST',
                                                                      url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                      headers:
                                                                      { 'content-type': 'application/x-www-form-urlencoded',
                                                                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                      'cache-control': 'no-cache' } }
                                                                      request(urlRequest, function (error, response, body) {
                                                                        // var user11 = ""+final.advert_id.user_id;
                                                                        // var user22 = ""+final.user_id._id;
                                                                        // var comparison = user11.localeCompare(user22);
                                                                        // if (comparison > 0) {
                                                                        //   chatId = user11 + user22 + final.advert_id._id;
                                                                        // } else {
                                                                        //   chatId = user22 + user11 + final.advert_id._id;
                                                                        // }
                                                                        // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                        //   console.log("***********Chat ID**********",chatId);
                                                                        // }
                                                                        // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your offer has been accepted, Please check your advertisement offers." })
                                                                        // .save(function (error, resultchat) {
                                                                        res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                        // })
                                                                      });
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            })
                                                          })
                                                        }else{
                                                          console.log("Length : done 3::",done.length);
                                                          if(final.status == 'counter'){
                                                            var messageNotification = "Your counter request has been accepted, Please check your advertisement offers.";
                                                            var urlRequest = { method: 'POST',
                                                            url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                            headers:
                                                            { 'content-type': 'application/x-www-form-urlencoded',
                                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                            'cache-control': 'no-cache' } }
                                                            request(urlRequest, function (error, response, body) {
                                                              // var user11 = ""+final.advert_id.user_id;
                                                              // var user22 = ""+final.user_id._id;
                                                              // var comparison = user11.localeCompare(user22);
                                                              // if (comparison > 0) {
                                                              //   chatId = user11 + user22 + final.advert_id._id;
                                                              // } else {
                                                              //   chatId = user22 + user11 + final.advert_id._id;
                                                              // }
                                                              // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                              //   console.log("***********Chat ID**********",chatId);
                                                              // }
                                                              // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers."  })
                                                              // .save(function (error, resultchat) {
                                                              res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                              //  })
                                                            });
                                                          }else{
                                                            var messageNotification = "Your offer has been accepted, Please check your offer section.";
                                                            var urlRequest = { method: 'POST',
                                                            url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                            headers:
                                                            { 'content-type': 'application/x-www-form-urlencoded',
                                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                            'cache-control': 'no-cache' } }
                                                            request(urlRequest, function (error, response, body) {
                                                              // var user11 = ""+final.advert_id.user_id;
                                                              // var user22 = ""+final.user_id._id;
                                                              // var comparison = user11.localeCompare(user22);
                                                              // if (comparison > 0) {
                                                              //   chatId = user11 + user22 + final.advert_id._id;
                                                              // } else {
                                                              //   chatId = user22 + user11 + final.advert_id._id;
                                                              // }
                                                              // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                              //   console.log("***********Chat ID**********",chatId);
                                                              // }
                                                              // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers."  })
                                                              // .save(function (error, resultchat) {
                                                              res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                              // })
                                                            });
                                                          }
                                                        }
                                                      }
                                                    })
                                                  }
                                                })
                                              }
                                            })
                                          }else{
                                            res.status(404).send({message:"Advertisement not found"});
                                          }
                                        }
                                      })
                                    })
                                  }
                                }
                              })
                            }else{
                              offer.findOne({_id:params.offer_id}).exec(function(error,finalComplete){
                                if(error){
                                  res.status({error:error});
                                }else{
                                  finalComplete.status = 'rejected';
                                  finalComplete.readStatus = false;
                                  finalComplete.sort = 5;
                                  finalComplete.updatedAt = Date.now();
                                  finalComplete.save(function(error,fResult){
                                    offer.find({_id:fResult._id}).populate("user_id advert_id").exec(function(error,finalComplete1){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        var sails = {};
                                        offer.find({ advert_id:final.advert_id._id  }).populate("user_id advert_id").exec(function(error,done){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(done.length>0){
                                              done.forEach(function(i,idx,x){
                                                User.findOne({_id:i.advert_id.user_id}).populate("package").exec(function(error,result){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    done[idx].advert_id.user_id = result;
                                                    if(idx == x.length-1){
                                                      //  console.log("User populated response :",done);
                                                      if(req.user.currency !='USD'){  //currency value of user is not USD
                                                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{

                                                            done.forEach(function(j,jdy,y){
                                                              done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                                              done[jdy].advert_id.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].advert_id.price)).toFixed(2);
                                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                console.log("prices : ",done[jdy].offered_price,done[jdy].advert_id.price);
                                                              }
                                                              if(jdy == y.length-1){
                                                                console.log("Length : done 1::",done.length);
                                                                if(final.status == 'counter'){
                                                                  var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                                  var urlRequest = { method: 'POST',
                                                                  url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                  headers:
                                                                  { 'content-type': 'application/x-www-form-urlencoded',
                                                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                  'cache-control': 'no-cache' } }
                                                                  request(urlRequest, function (error, response, body) {
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  });
                                                                }else{
                                                                  var messageNotification = "Your offer has been rejected, Please check your offer section.";
                                                                  var urlRequest = { method: 'POST',
                                                                  url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                  headers:
                                                                  { 'content-type': 'application/x-www-form-urlencoded',
                                                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                  'cache-control': 'no-cache' } }
                                                                  request(urlRequest, function (error, response, body) {
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  });
                                                                }
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }else{ //user currency is equal to USD
                                                        console.log("Length : done 2::",done.length);
                                                        if(final.status == 'counter'){
                                                          var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                          var urlRequest = { method: 'POST',
                                                          url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                          headers:
                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                          'cache-control': 'no-cache' } }
                                                          request(urlRequest, function (error, response, body) {
                                                            User.findOne({_id:req.user._id}).populate("package").exec(function(error,resultUser){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                done.forEach(function(k,p,kp){
                                                                  done[p].advert_id.user_id = resultUser;
                                                                  if(p == kp.length-1){
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  }
                                                                })
                                                              }
                                                            })

                                                          });
                                                        }else{
                                                          var messageNotification = "Your offer has been rejected, Please check Your sent offers.";
                                                          var urlRequest = { method: 'POST',
                                                          url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                          headers:
                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                          'cache-control': 'no-cache' } }
                                                          request(urlRequest, function (error, response, body) {
                                                            User.findOne({_id:req.user._id}).populate("package").exec(function(error,resultUser){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                done.forEach(function(k,p,kp){
                                                                  done[p].advert_id.user_id = resultUser;
                                                                  if(p == kp.length-1){
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  }
                                                                })
                                                              }
                                                            })
                                                          });
                                                        }
                                                      }
                                                    }
                                                  }
                                                })
                                              })
                                            }else{
                                              console.log("Length : done 3::",done.length);
                                              if(final.status == 'counter'){
                                                var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                var urlRequest = { method: 'POST',
                                                url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                headers:
                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                'cache-control': 'no-cache' } }
                                                request(urlRequest, function (error, response, body) {
                                                  res.status(200).send({message:"Offer updated successfully",result:done,sail:sails});
                                                });
                                              }else{
                                                var messageNotification = "Your offer has been rejected, Please check Your sent offers.";
                                                var urlRequest = { method: 'POST',
                                                url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                headers:
                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                'cache-control': 'no-cache' } }
                                                request(urlRequest, function (error, response, body) {
                                                  res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                });
                                              }
                                            }
                                          }
                                        })
                                      }
                                    })
                                  })
                                }
                              })
                            }
                          }
                        })
                      }
                    })
                  }else{
                    res.status(404).send({message:"Offer not found with pending status"});
                  }
                }
              })
            }else{
              res.status(403).send({message:"Parameters missing"});
            }
          }

          exports.acceptRejectCounterOffer = function(req,res){
            var params = req.body;
            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
              console.log("Request : ",params);
            }
            if(params.offer_id!=null && params.offer_id!=undefined && params.offer_id!="" && params.status!=null && params.status!=undefined && params.status!=""){
              offer.findOne({_id:params.offer_id,status:{$in:["pending","counter","re-counter"]}}).exec(function(error,result){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(result){
                    //  result.status = params.status;
                    //result.updatedAt = Date.now();
                    result.save(function(error,done){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        offer.findOne({_id:params.offer_id}).populate("user_id advert_id").exec(function(error,final){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                              console.log("Offer after update : ",final);
                            }
                            var finalStatus = final.status;
                            if(params.status == 'accepted'){
                              sail.create({
                                seller_id:final.advert_id.user_id,
                                buyer_id : final.user_id,
                                status : 'address pending',
                                advert_id : final.advert_id._id,
                                offer_id : params.offer_id
                              }).then(function(sails){

                                Advertisement.findOne({_id:final.advert_id._id}).exec(function(error,addResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(addResult){
                                      var soldImage = [process.env.SOLD_IMAGE];
                                      // addResult.pictures = soldImage.concat(addResult.pictures);
                                      addResult.boosted = false;
                                      addResult.save(function(error,addComplete){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{

                                          final.sail_id = sails._id;
                                          final.status = 'accepted';
                                          final.updatedAt = Date.now();
                                          final.sort = 4;
                                          final.save(function(error,finalSaved){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("sail created : ",finalSaved);
                                              }
                                              offer.find({ user_id:final.user_id._id }).populate("user_id advert_id sail_id").exec(function(error,done){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  if(done.length>0){
                                                    done.forEach(function(i,idx,x){
                                                      User.findOne({_id:i.advert_id.user_id}).exec(function(error,result){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          done[idx].advert_id.user_id = result;
                                                          if(idx == x.length-1){
                                                            //  console.log("User populated response :",done);
                                                            if(req.user.currency !='USD'){  //currency value of user is not USD
                                                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                                if(error){
                                                                  res.status(500).send({error:error});
                                                                }else{

                                                                  done.forEach(function(j,jdy,y){
                                                                    done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                                                    done[jdy].advert_id.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].advert_id.price)).toFixed(2);
                                                                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                      console.log("prices : ",done[jdy].offered_price,done[jdy].advert_id.price);
                                                                    }
                                                                    if(jdy == y.length-1){
                                                                      console.log("Length : done 1 ::  ",done.length);
                                                                      //                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                      if(finalStatus ==  'counter'){
                                                                        var messageNotification = "Your counter request has been accepted, Please check your advertisement offers.";
                                                                        var urlRequest = { method: 'POST',
                                                                        url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                        headers:
                                                                        { 'content-type': 'application/x-www-form-urlencoded',
                                                                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                        'cache-control': 'no-cache' } }
                                                                        request(urlRequest, function (error, response, body) {
                                                                          // var user11 = ""+final.advert_id.user_id;
                                                                          // var user22 = ""+final.user_id._id;
                                                                          // var comparison = user11.localeCompare(user22);
                                                                          // if (comparison > 0) {
                                                                          //   chatId = user11 + user22 + final.advert_id._id;
                                                                          // } else {
                                                                          //   chatId = user22 + user11 + final.advert_id._id;
                                                                          // }
                                                                          // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                          //   console.log("***********Chat ID**********",chatId);
                                                                          // }
                                                                          // new chat({ chat_id: chatId, advert_id : final.advert_id._id,user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers."  })
                                                                          // .save(function (error, resultchat) {
                                                                          messageNotification = "offer has been accepted, Please check Your offers.";
                                                                          var urlRequest = { method: 'POST',
                                                                          url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                          headers:
                                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                          'cache-control': 'no-cache' } }
                                                                          request(urlRequest, function (error, response, body) {
                                                                            res.status(200).send({message:"counter offer accepted successfully",result:done,sail:sails});
                                                                          })
                                                                          //  })
                                                                        });
                                                                      }else{
                                                                        var messageNotification = "Your offer has been accepted, Please check Your sent offers.";
                                                                        var urlRequest = { method: 'POST',
                                                                        url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                        headers:
                                                                        { 'content-type': 'application/x-www-form-urlencoded',
                                                                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                        'cache-control': 'no-cache' } }
                                                                        request(urlRequest, function (error, response, body) {
                                                                          // var user11 = ""+final.advert_id.user_id;
                                                                          // var user22 = ""+final.user_id._id;
                                                                          // var comparison = user11.localeCompare(user22);
                                                                          // if (comparison > 0) {
                                                                          //   chatId = user11 + user22 + final.advert_id._id;
                                                                          // } else {
                                                                          //   chatId = user22 + user11 + final.advert_id._id;
                                                                          // }
                                                                          // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                          //   console.log("***********Chat ID**********",chatId);
                                                                          // }
                                                                          // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                                          // .save(function (error, resultchat) {
                                                                          messageNotification = "offer has been accepted, Please check Your offers.";
                                                                          var urlRequest = { method: 'POST',
                                                                          url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                          headers:
                                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                          'cache-control': 'no-cache' } }
                                                                          request(urlRequest, function (error, response, body) {
                                                                            res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                          })
                                                                          // })
                                                                        });
                                                                      }
                                                                    }
                                                                  })
                                                                }
                                                              })
                                                            }else{ //user currency is equal to USD
                                                              console.log("Length : done 2::",done.length);
                                                              if(finalStatus ==  'counter'){
                                                                var messageNotification = "Your counter request has been accepted, Please check your advertisement offers.";
                                                                var urlRequest = { method: 'POST',
                                                                url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                headers:
                                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                'cache-control': 'no-cache' } }
                                                                request(urlRequest, function (error, response, body) {
                                                                  // var user11 = ""+final.advert_id.user_id;
                                                                  // var user22 = ""+final.user_id._id;
                                                                  // var comparison = user11.localeCompare(user22);
                                                                  // if (comparison > 0) {
                                                                  //   chatId = user11 + user22 + final.advert_id._id;
                                                                  // } else {
                                                                  //   chatId = user22 + user11 + final.advert_id._id;
                                                                  // }
                                                                  // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                  //   console.log("***********Chat ID**********",chatId);
                                                                  // }
                                                                  // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                                  // .save(function (error, resultchat) {
                                                                  res.status(200).send({message:"counter offer accepted successfully",result:done,sail:sails});
                                                                })
                                                                // });
                                                              }else{
                                                                var messageNotification = "Your offer has been accepted, Please check Your sent offers.";
                                                                var urlRequest = { method: 'POST',
                                                                url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                headers:
                                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                'cache-control': 'no-cache' } }
                                                                request(urlRequest, function (error, response, body) {
                                                                  // var user11 = ""+final.advert_id.user_id;
                                                                  // var user22 = ""+final.user_id._id;
                                                                  // var comparison = user11.localeCompare(user22);
                                                                  // if (comparison > 0) {
                                                                  //   chatId = user11 + user22 + final.advert_id._id;
                                                                  // } else {
                                                                  //   chatId = user22 + user11 + final.advert_id._id;
                                                                  // }
                                                                  // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                  //   console.log("***********Chat ID**********",chatId);
                                                                  // }
                                                                  // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                                  // .save(function (error, resultchat) {
                                                                  res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                                  //})
                                                                });
                                                              }
                                                            }
                                                          }
                                                        }
                                                      })
                                                    })
                                                  }else{
                                                    console.log("Length : done 3::",done.length);
                                                    if(finalStatus ==  'counter'){
                                                      var messageNotification = "Your counter request has been accepted, Please check your advertisement offers.";
                                                      var urlRequest = { method: 'POST',
                                                      url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                      headers:
                                                      { 'content-type': 'application/x-www-form-urlencoded',
                                                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                      'cache-control': 'no-cache' } }
                                                      request(urlRequest, function (error, response, body) {
                                                        // var user11 = ""+final.advert_id.user_id;
                                                        // var user22 = ""+final.user_id._id;
                                                        // var comparison = user11.localeCompare(user22);
                                                        // if (comparison > 0) {
                                                        //   chatId = user11 + user22 + final.advert_id._id;
                                                        // } else {
                                                        //   chatId = user22 + user11 + final.advert_id._id;
                                                        // }
                                                        // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                        //   console.log("***********Chat ID**********",chatId);
                                                        // }
                                                        // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers."  })
                                                        // .save(function (error, resultchat) {
                                                        res.status(200).send({message:"counter offer accepted successfully",result:done,sail:sails});
                                                        // })
                                                      });
                                                    }else{
                                                      var messageNotification = "Your offer has been accepted, Please check Your sent offers.";
                                                      var urlRequest = { method: 'POST',
                                                      url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                      headers:
                                                      { 'content-type': 'application/x-www-form-urlencoded',
                                                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                      'cache-control': 'no-cache' } }
                                                      request(urlRequest, function (error, response, body) {
                                                        // var user11 = ""+final.advert_id.user_id;
                                                        // var user22 = ""+final.user_id._id;
                                                        // var comparison = user11.localeCompare(user22);
                                                        // if (comparison > 0) {
                                                        //   chatId = user11 + user22 + final.advert_id._id;
                                                        // } else {
                                                        //   chatId = user22 + user11 + final.advert_id._id;
                                                        // }
                                                        // if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                        //   console.log("***********Chat ID**********",chatId);
                                                        // }
                                                        // new chat({ chat_id: chatId,advert_id : final.advert_id._id, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:"Your counter request has been accepted, Please check your advertisement offers." })
                                                        // .save(function (error, resultchat) {
                                                        res.status(200).send({message:"Offer accepted successfully",result:done,sail:sails});
                                                        // })
                                                      });
                                                    }
                                                  }
                                                }
                                              })
                                            }
                                          })
                                        }
                                      })
                                    }else{
                                      res.status(404).send({message:"Advertisement not found"});
                                    }
                                  }
                                })
                              })


                            }else{
                              offer.findOne({_id:params.offer_id}).exec(function(error,finalComplete){
                                if(error){
                                  res.status({error:error});
                                }else{
                                  finalComplete.status = 'rejected';
                                  finalComplete.sort = 5;
                                  finalComplete.readStatus = false;
                                  finalComplete.updatedAt = Date.now();
                                  finalComplete.save(function(error,fResult){
                                    offer.find({_id:fResult._id}).populate("user_id advert_id").exec(function(error,finalComplete1){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        var sails = {};
                                        offer.find({ user_id:final.user_id._id  }).populate("user_id advert_id").exec(function(error,done){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(done.length>0){
                                              done.forEach(function(i,idx,x){
                                                User.findOne({_id:i.advert_id.user_id}).exec(function(error,result){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    done[idx].advert_id.user_id = result;
                                                    if(idx == x.length-1){
                                                      //  console.log("User populated response :",done);
                                                      if(req.user.currency !='USD'){  //currency value of user is not USD
                                                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{

                                                            done.forEach(function(j,jdy,y){
                                                              done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                                              done[jdy].advert_id.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].advert_id.price)).toFixed(2);
                                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                                console.log("prices : ",done[jdy].offered_price,done[jdy].advert_id.price);
                                                              }
                                                              if(jdy == y.length-1){
                                                                console.log("Length : done 1::",done.length);
                                                                if(finalStatus ==  'counter'){
                                                                  var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                                  var urlRequest = { method: 'POST',
                                                                  url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                                  headers:
                                                                  { 'content-type': 'application/x-www-form-urlencoded',
                                                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                  'cache-control': 'no-cache' } }
                                                                  request(urlRequest, function (error, response, body) {
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  });
                                                                }else{
                                                                  var messageNotification = "Your offer has been rejected, Please check Your sent offers.";
                                                                  var urlRequest = { method: 'POST',
                                                                  url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                                  headers:
                                                                  { 'content-type': 'application/x-www-form-urlencoded',
                                                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                                  'cache-control': 'no-cache' } }
                                                                  request(urlRequest, function (error, response, body) {
                                                                    res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                                  });
                                                                }
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }else{ //user currency is equal to USD
                                                        console.log("Length : done 2::",done.length);
                                                        if(finalStatus ==  'counter'){
                                                          var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                          var urlRequest = { method: 'POST',
                                                          url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                          headers:
                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                          'cache-control': 'no-cache' } }
                                                          request(urlRequest, function (error, response, body) {
                                                            res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                          });
                                                        }else{
                                                          var messageNotification = "Your offer has been rejected, Please check Your sent offers.";
                                                          var urlRequest = { method: 'POST',
                                                          url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                          headers:
                                                          { 'content-type': 'application/x-www-form-urlencoded',
                                                          'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                          'cache-control': 'no-cache' } }
                                                          request(urlRequest, function (error, response, body) {
                                                            res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                          });
                                                        }
                                                      }
                                                    }
                                                  }
                                                })
                                              })
                                            }else{
                                              console.log("Length : done 3::",done.length);
                                              if(finalStatus ==  'counter'){
                                                var messageNotification = "Your counter request has been rejected, Please check your advertisement offers.";
                                                var urlRequest = { method: 'POST',
                                                url: process.env.url+"/testnotification/" + final.advert_id.user_id + "/" + messageNotification,
                                                headers:
                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                'cache-control': 'no-cache' } }
                                                request(urlRequest, function (error, response, body) {
                                                  res.status(200).send({message:"counter offer rejected successfully",result:done,sail:sails});
                                                });
                                              }else{
                                                var messageNotification = "Your offer has been rejected, Please check your sent offers.";
                                                var urlRequest = { method: 'POST',
                                                url: process.env.url+"/testnotification/" + final.user_id._id + "/" + messageNotification,
                                                headers:
                                                { 'content-type': 'application/x-www-form-urlencoded',
                                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                'cache-control': 'no-cache' } }
                                                request(urlRequest, function (error, response, body) {
                                                  res.status(200).send({message:"Offer rejected successfully",result:done,sail:sails});
                                                });
                                              }
                                            }
                                          }
                                        })
                                      }
                                    })
                                  })
                                }
                              })
                            }
                          }
                        })
                      }
                    })
                  }else{
                    res.status(404).send({message:"Offer not found with pending status"});
                  }
                }
              })
            }else{
              res.status(403).send({message:"Parameters missing"});
            }
          }

          exports.myAdds = function(req,res){
            Advertisement.find({user_id:req.user._id,isVerified:true,isDeleted:false}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort({createdAt:-1}).exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                console.log("User Currency : ",req.user.currency);
                if(req.user.currency !='USD'){  //currency value of user is not USD
                  curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(result.length>0){
                        result.forEach(function(j,jdy,y){
                          result[jdy]['price'] = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[jdy].price)).toFixed(2);
                          offer.find({_id:result[jdy]['offers']}).populate("user_id advert_id sail_id").sort({sort:1}).exec(function(error,don){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(don.length>0){
                                don.forEach(function(i,idx,x){
                                  don.offered_price = parseFloat(currencyResult.valueInUSD)*parseFloat(don.offered_price);
                                  if(idx == x.length-1){
                                    result[jdy]['offers'] = don;
                                  }
                                })

                              }else{
                                result[jdy]['offers'] = don;
                              }
                              if(jdy == y.length-1){
                                res.status(200).send({result:result});
                              }
                            }
                          })
                        })
                      }else{
                        res.status(200).send({result:result});
                      }
                    }
                  })
                }else{ //user currency is equal to USD\
                  if(result.length>0){
                    result.forEach(function(j,jdy,y){
                      offer.find({_id:result[jdy]['offers']}).populate("user_id advert_id sail_id").sort({sort:1}).exec(function(error,don){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          result[jdy]['offers'] = don;
                          if(jdy == y.length-1){
                            res.status(200).send({result:result});
                          }
                        }
                      })
                    })
                  }else{
                    res.status(200).send({result:result});
                  }
                }
                //res.status(200).send({result:result});
              }
            })
          }

          exports.selfCreatedOffers = function(req,res){
            var params = req.body;
            offer.find({user_id:req.user._id,visible:true}).populate("advert_id").exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                res.status(200).send({result:result});
              }
            })
          }

          exports.searchFilters = function(req,res){
            console.log(req.body)
            var distanceLat = '';
            var distanceLng = '';
            console.log("***************parsed point one : ",parseFloat(req.body.pointOneLng))
            req.body.isDeleted = false;
            if(req.body.dlat!=null && req.body.dlat != undefined && req.body.dlat!='' && req.body.dlng!=null && req.body.dlng != undefined && req.body.dlng!=''){
              distanceLat = parseFloat(req.body.dlat);
              distanceLng = parseFloat(req.body.dlng);
              if(req.body.user_id!=null && req.body.user_id!=undefined && req.body.user_id!=''){
                User.findOne({_id:req.body.user_id}).exec(function(error,result){
                  if(error){
                    res.status(500).send({error:error,message:"error in finding user"});
                  }else{
                    if(result){
                      if(result.location==null){
                        result.location = [distanceLat,distanceLng];
                        result.save(function(error,resul){
                          if(error){
                            // res.status(500).send({error:error,message:"error in saving user"});
                            console.log("user location not updated here");
                          }
                        })
                      }
                    }
                  }
                })
              }
              // if(req.body.lat!=null && req.body.lat!=undefined && req.body.lat!='' && req.body.lng!=null && req.body.lng!=undefined && req.body.lng!=''){
              //   distanceLat = parseFloat(req.body.lat);
              //   distanceLng = parseFloat(req.body.lng);
              //   console.log("lat lng saved at Request lat lng");
              // }

            }
            var currencys = 'USD';
            if(req.body.currency!=null && req.body.currency!=undefined && req.body.currency!=''){
              currencys = req.body.currency;
            }

            curr.findOne({currency:currencys}).exec(function(error,currencyResult){
              if(error){
                res.status(500).send({message:"error in getting currency",error:error});
              }else{
                if(currencyResult){
                  if(currencys != 'USD'){
                    console.log("in usd method :")
                    if(req.body.priceStart!=null && req.body.priceStart!=undefined && req.body.priceStart!=''  && req.body.priceStart!='0'){
                      req.body.priceStart = parseInt(req.body.priceStart)/parseFloat(currencyResult.valueInUSD);
                    }else{
                      delete req.body.priceStart;
                    }
                    if(req.body.priceEnd!=null && req.body.priceEnd!=undefined && req.body.priceEnd!='' && req.body.priceEnd!='0'){
                      req.body.priceEnd = parseInt(req.body.priceEnd)/parseFloat(currencyResult.valueInUSD);
                    }else{
                      delete req.body.priceEnd;
                    }
                  }
                  console.log("++++++====++++++++user currency : ",req.body.currency);
                  console.log("price start : ",req.body.priceStart);
                  console.log("price end : ",req.body.priceEnd);
                  delete req.body.dlat;
                  delete req.body.dlng;
                  console.log("distance lat : ",distanceLat);
                  var userId = '';
                  req.body.visible = true;
                  var limit = 15;
                  var sor={};
                  var skips = 0;
                  var currency = 'USD';
                  if(req.body.currency!=undefined && req.body.currency!=null && req.body.currency!=''){
                    currency = req.body.currency;
                  }
                  delete req.body.currency;

                  console.log(req.body.sortKey,req.body.sortValue);
                  if(req.body.sortKey == 'boosts' || req.body.sortKey == 'Boosts'){
                    sor = {boostStartingTime : parseInt(req.body.sortValue)}
                  }else if(req.body.sortKey == 'price' || req.body.sortKey == 'Price'){
                    sor = {price : parseInt(req.body.sortValue)}
                  }else if(req.body.sortKey == 'createdAt' || req.body.sortKey == 'CreatedAt' || req.body.sortKey == 'createdat'){
                    sor = {createdAt : parseInt(req.body.sortValue)}
                  }else if(req.body.sortKey == 'age' || req.body.sortKey == 'Age'){
                    sor = {age : parseInt(req.body.sortValue)}
                  }else if(req.body.sortKey == 'location' || req.body.sortKey == 'Location'){
                    sor = {"location.1" : parseInt(req.body.sortValue)}
                  }else{
                    sor = {boostStartingTime : -1}
                  }
                  delete req.body.sortKey;
                  delete req.body.sortValue;


                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("Request: ",req.body);
                  }
                  if(req.body.web == true){
                    limit = 999
                    delete req.body.web;
                  }else{
                    if(req.body.limit!=null && req.body.limit!=undefined && req.body.limit!=''){
                      limit = parseInt(req.body.limit);
                    }else{
                      limit = 15;
                    }
                    delete req.body.limit;
                  }
                  if(req.body.user_id!=null && req.body.user_id!=undefined && req.body.user_id!=''){
                    userId = req.body.user_id;
                    delete req.body.user_id;
                  }

                  if(req.body.skip !=null && req.body.skip !=undefined && req.body.skip !=''){
                    skips = parseInt(req.body.skip);
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      console.log("value for variable skips :"+parseInt(skips)+"----",skips);
                    }
                    delete req.body.skip;
                  }else{
                    skips = 0;
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      console.log("value not updated at skips");
                    }

                  }
                  var t = true
                  if(req.body.keyword!=null && req.body.keyword!=undefined && req.body.keyword=='' && t == false){
                    console.log("here in keyword search")
                    //
                  }else{
                    var params = req.body;
                    if(params.deviceDetails!=null && params.deviceDetails!=undefined && params.deviceDetails!=''){
                      var vid = params.deviceDetails;
                      vid[vid.length-1] = "";
                      var dd =  vid.split(",");
                      dd.splice(dd.length-1,1);
                      params.deviceDetails = { $in: dd  };
                    }

                    if(req.body.keyword!=null && req.body.keyword!=undefined && req.body.keyword!=''){
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" the","");
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" in","");
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" a","");
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" at","");
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" on","");
                      req.body.keyword = (req.body.keyword).toLowerCase().replace(" is","");
                      //  params.search = {'$in':(req.body.keyword).split(" ")};
                      var keywordArray = (req.body.keyword).split(" ");
                      var keywordFinal = [];
                      console.log(keywordArray)
                      keywordArray.forEach(function(i,idx,x){
                        keywordFinal[idx] = { search:{ '$regex' : i.toLowerCase(), '$options' : 'i' }}
                        if(idx == x.length-1){
                          params.$or = keywordFinal;
                        }
                      })
                      //                    params.search ={ '$regex' : (req.body.keyword).toLowerCase(), '$options' : 'i' }
                    }
                    // keyword is null or empty
                    delete req.body.keyword;

                    params.sold = false;
                    for (var i in params) {
                      if (params[i] == "") {
                        delete params[i];
                      }
                    }
                    if(params.rectangle == true || params.rectangle=="true"){ // rectangle true && keyword false
                      delete params.rectangle;
                      if(params.pointOneLat != null && params.pointOneLat != undefined && params.pointOneLat != ''){
                        if(params.pointTwoLat != null && params.pointTwoLat != undefined && params.pointTwoLat != ''){
                          if(params.pointThreeLat != null && params.pointThreeLat != undefined && params.pointThreeLat != ''){
                            if(params.pointFourLat != null && params.pointFourLat != undefined && params.pointFourLat != ''){
                              Advertisement.find({ $and: [ {
                                "location.0":{
                                  '$lte': parseFloat(params.pointOneLng)
                                },
                                "location.1":{
                                  '$lte': parseFloat(params.pointOneLat)
                                } },{
                                  "location.0":{
                                    '$gte': parseFloat(params.pointFourLng)
                                  },
                                  "location.1":{
                                    '$gte': parseFloat(params.pointFourLat)
                                  } } ] }).exec(function(error,result){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      if(result.length>0){
                                        var loc = [];
                                        delete params.pointOneLat;
                                        delete params.pointTwoLat;
                                        delete params.pointThreeLat;
                                        delete params.pointFourLat;
                                        delete params.pointOneLng;
                                        delete params.pointTwoLng;
                                        delete params.pointThreeLng;
                                        delete params.pointFourLng;
                                        result.forEach(function(l,ldx,locationResult){
                                          loc[ldx] = l._id;
                                          if(ldx==locationResult.length-1){
                                            params._id = loc;
                                            //     console.log("location search :",result.length);
                                            params.payment = false;
                                            if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                                              params.$and = [
                                                { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                                                { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                                              ];
                                              delete params.lengthEnd;
                                              delete params.lengthStart;
                                              delete params.widthEnd;
                                              delete params.widthStart;
                                            }
                                            if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!=''  && params.priceStart!=null && params.priceStart!=undefined && params.priceStart!=''){
                                              if(parseInt(params.priceEnd)<=0 || params.priceEnd=='0' || parseInt(params.priceEnd) <= 0){
                                                params.price = {$gte: parseInt(params.priceStart) }
                                              }else{
                                                if(parseInt(params.priceStart) < parseInt(params.priceEnd)){
                                                  params.price = { $lte: parseInt(params.priceEnd), $gte: parseInt(params.priceStart) }
                                                }else{
                                                  params.price = { $lte: parseInt(params.priceStart), $gte: parseInt(params.priceEnd) }
                                                }
                                              }
                                            }else if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!=''){
                                              params.price = { $gte: 0.0, $lte: parseInt(params.priceEnd) }
                                            }else if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!=''){
                                              params.price = { $gte: parseInt(params.priceStart)}
                                            }
                                            delete params.priceEnd;
                                            delete params.priceStart;
                                            if(params.color !=null && params.color !=undefined && params.color !=''){
                                              var colorArray = params.color.split(',');
                                            }
                                            if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''){
                                              params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                                              // if(parseInt(params.ageEnd)<-1 ){
                                              //   params.age = {$gte: parseInt(params.ageStart) }
                                              // }else{
                                              //   if(parseInt(params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                                              //     params.ageStart = 0;
                                              //   }
                                              //   if(parseInt(params.ageEnd)>parseInt(params.ageStart)){
                                              //     params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                                              //   }else{
                                              //     params.age = { $lte: parseInt(params.ageStart), $gte: parseInt(params.ageEnd) }
                                              //   }
                                              // }
                                            }else if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && (params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                                              params.age = { $lte: parseInt(params.ageEnd)}
                                            }else if(params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''  && (params.ageEnd==null || params.ageEnd==undefined || params.ageEnd=='')){
                                              params.age = { $gte: parseInt(params.ageStart)}
                                            }else if(parseInt(params.ageStart) == parseInt(params.ageEnd)){
                                              params.age = parseInt(params.ageStart);
                                            }
                                            delete params.ageStart;
                                            delete params.ageEnd;
                                            if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                                              var brandArray = params.brandName.split(',');
                                            }
                                            if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                                              var storageArray = params.storage.split(',');
                                            }
                                            if(params.color !=null && params.color !=undefined && params.color !=''){
                                              params.color = { $in: colorArray  };
                                            }
                                            if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                                              params.brandName = { $in: brandArray };
                                            }
                                            if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                                              params.storage = {  $in: storageArray };
                                            }
                                            if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                                              distance = parseFloat(params.distance)/111;
                                              params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                                              // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                                              // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                                              delete params.lng;
                                              delete params.lat;
                                            }
                                            delete params.lng;
                                            delete params.lat;
                                            delete params.distance;
                                            //   console.log("Request at length 02:",params);
                                            delete params.rectangle;

                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("empty keyword location Searching : ",params);
                                              console.log("Skips : ",parseInt(skips)*10);
                                            }
                                            Advertisement.find(params).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort(sor).exec(function(error,result){
                                              if(error){
                                                console.log("Error",error);
                                                res.status(500).send({error:error});
                                              }else{
                                                if(result.length>0){
                                                  if(userId!=''){
                                                    User.findOne({_id:userId}).exec(function(error,userResult){
                                                      if(error){
                                                        res.status(500).send({message:"find user error",error:error});
                                                      }else{
                                                        if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                                        }else{
                                                          distanceLat = userResult.location[0];
                                                        }
                                                        var fav = userResult.favouriteAdds;
                                                        if(fav.length>0){
                                                          result.forEach(function(i,idx,x){
                                                            fav.forEach(function(j,jdy,y){
                                                              var z =""+i._id;
                                                              var p = ""+j;
                                                              if(z==p){
                                                                i.isFavourite = true;
                                                              }
                                                              if(jdy==y.length-1){
                                                                if(idx==x.length-1){
                                                                  if(currency !='USD'){  //currency value of user is not USD
                                                                    curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                                      if(error){
                                                                        res.status(500).send({error:error});
                                                                      }else{
                                                                        result.forEach(function(d,jdz,z){
                                                                          result[jdz].price = parseFloat(currencyResult.valueInUSD)*parseFloat(result[jdz].price);
                                                                          if(distanceLat!=''){
                                                                            if(result[jdz].location!=null && result[jdz].location!=undefined){
                                                                              if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])>distanceLat){
                                                                                result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(result[jdz].distance)<0){
                                                                                  result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                                }
                                                                              }else if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])<distanceLat){
                                                                                result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(result[jdz].distance)<0){
                                                                                  result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                          if(jdz == z.length-1){
                                                                            res.status(200).send({result:result, length:parseInt(result.length)});
                                                                          }
                                                                        })
                                                                      }
                                                                    })
                                                                  }else{ //user currency is not equal to USD
                                                                    res.status(200).send({result:result, length:parseInt(result.length)});
                                                                  }
                                                                  //  res.status(200).send({result:result, length:parseInt(result.length)});
                                                                }
                                                              }
                                                            })
                                                          })
                                                        }else{
                                                          if(currency !='USD'){  //currency value of user is not USD
                                                            curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                result.forEach(function(d,jdz,z){
                                                                  result[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[jdz].price)).toFixed(2);
                                                                  if(distanceLat!=''){
                                                                    if(result[jdz].location!=null && result[jdz].location!=undefined){
                                                                      if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])>distanceLat){
                                                                        result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                        if(parseFloat(result[jdz].distance)<0){
                                                                          result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                        }else{
                                                                          result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                        }
                                                                      }else if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])<distanceLat){
                                                                        result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                        if(parseFloat(result[jdz].distance)<0){
                                                                          result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                        }else{
                                                                          result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                  if(jdz == z.length-1){
                                                                    res.status(200).send({result:result, length:parseInt(result.length)});
                                                                  }
                                                                })
                                                              }
                                                            })
                                                          }else{ //user currency is equal to USD
                                                            result.forEach(function(d,jdz,z){
                                                              //distance calculation Algorithem between two positions start
                                                              if(distanceLat!=''){
                                                                if(result[jdz].location!=null && result[jdz].location!=undefined){
                                                                  if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])>distanceLat){
                                                                    result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(result[jdz].distance)<0){
                                                                      result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                    }
                                                                  }else if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])<distanceLat){
                                                                    result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(result[jdz].distance)<0){
                                                                      result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                              //distance calculation algorithem Algorithim ends here
                                                              if(jdz == z.length-1){
                                                                res.status(200).send({result:result, length:parseInt(result.length)});
                                                              }
                                                            })
                                                          }
                                                          //  res.status(200).send({result:result});
                                                        }
                                                      }
                                                    })
                                                  }else{
                                                    if(currency !='USD'){  //currency value of user is not USD
                                                      curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          result.forEach(function(d,jdz,z){
                                                            result[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[jdz].price)).toFixed(2);
                                                            if(distanceLat!=''){
                                                              if(result[jdz].location!=null && result[jdz].location!=undefined){
                                                                if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])>distanceLat){
                                                                  result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(result[jdz].distance)<0){
                                                                    result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    result[jdz].distance = Number(parseFloat(result[jdz].distance)).toFixed(1);
                                                                  }

                                                                }else if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])<distanceLat){
                                                                  result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(result[jdz].distance)<0){
                                                                    result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    result[jdz].distance = Number(parseFloat(result[jdz].distance)).toFixed(1);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            if(jdz == z.length-1){
                                                              res.status(200).send({result:result, length:parseInt(result.length)});
                                                            }
                                                          })
                                                        }
                                                      })
                                                    }else{ //user currency is equal to USD
                                                      result.forEach(function(d,jdz,z){
                                                        //distance calculation Algorithem between two positions start
                                                        if(distanceLat!=''){
                                                          if(result[jdz].location!=null && result[jdz].location!=undefined){
                                                            if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])>distanceLat){
                                                              result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(result[jdz].distance)<0){
                                                                result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                              }
                                                            }else if(result[jdz].location[1] !=null && result[jdz].location[1] !=undefined && parseFloat(result[jdz].location[1])<distanceLat){
                                                              result[jdz].distance =   ((parseFloat(result[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(result[jdz].distance)<0){
                                                                result[jdz].distance = Number((parseFloat((result[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                result[jdz].distance = Number((parseFloat(result[jdz].distance)).toFixed(1));
                                                              }
                                                            }
                                                          }
                                                        }
                                                        //distance calculation algorithem Algorithim ends here
                                                        if(jdz == z.length-1){
                                                          res.status(200).send({result:result, length:parseInt(result.length)});
                                                        }
                                                      })
                                                    }
                                                    //  res.status(200).send({result:result,length:parseInt(result.length)});
                                                  }
                                                }else{
                                                  res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                                  //                                              res.status(404).send({message:"no advertisements found"});
                                                }
                                              }
                                            })
                                          }
                                        })
                                      }else{
                                        res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                        //                                    res.status(404).send({result:result});
                                      }
                                    }
                                  })
                                }else{
                                  res.status(403).send({message:"Point four required"});
                                }
                              }else{
                                res.status(403).send({message:"Point Three required"});
                              }
                            }else{
                              res.status(403).send({message:"Point two required"});
                            }
                          }else{
                            res.status(403).send({message:"Point one required"});
                          }
                        }else{ //rectangle false && keyword false
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check1");
                          }
                          delete params.rectangle;
                          params.payment = false;
                          if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                            params.$and = [
                              { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                              { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                            ];
                            delete params.lengthEnd;
                            delete params.lengthStart;
                            delete params.widthEnd;
                            delete params.widthStart;
                          }
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check2");
                          }
                          // if(params.priceEnd!=null && params.priceEnd!=undefined  && params.priceStart!=null && params.priceStart!=undefined){
                          //   if(parseInt(params.priceEnd)<=0 || params.priceEnd=='0' || parseInt(params.priceEnd) <= 0){
                          //     params.price = {$gt: parseInt(params.priceStart) }
                          //   }else{
                          //     if(parseInt(params.priceStart) < parseInt(params.priceEnd)){
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceEnd), $gt: parseInt(params.priceStart) }
                          //       }
                          //     }else{
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceStart), $gt: parseInt(params.priceEnd) }
                          //       }
                          //
                          //     }
                          //     console.log("Price **********",params.price);
                          //   }
                          // }else if(params.priceStart==undefined || params.priceStart==null){
                          //   if(params.priceEnd!='0' && params.priceEnd!=0){
                          //   params.price = {  $lte: parseFloat(params.priceEnd) }
                          // }
                          //   //    console.log("Params.priceStart",params.priceStart,"params.priceEnd",params.priceEnd)
                          // }else if(params.priceEnd==undefined || params.priceEnd==null){
                          //   if(params.priceStart!='0' && params.priceStart!=0 ){
                          //   params.price = {  $gte: parseFloat(params.priceStart) }
                          // }
                          // }

                          if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!='' && params.priceStart!='0' && params.priceStart!=0 && !isNaN(params.priceStart)){
                            if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!='' && params.priceEnd!='0' && params.priceEnd!=0 && !isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd), $gte: parseFloat(params.priceStart) }
                            }else{ // price end null or undefined
                              params.price = { $gte: parseFloat(params.priceStart) }
                            }
                          }else{ // price start null or undefined
                            if(!isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd) }
                            }
                          }

                          if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''){
                            if(parseInt(params.ageEnd) == parseInt(params.ageStart)){
                              params.age = parseInt(params.ageStart);
                            }else{
                              params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            }
                            // if(parseInt(params.ageEnd)<1 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                            //   params.age = {$gte: parseInt(params.ageStart) }
                            // }else{
                            //   if(parseInt(params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            //     params.ageStart = 0;
                            //   }
                            //   if(parseInt(params.ageEnd)>parseInt(params.ageStart)){
                            //     params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            //   }else{
                            //     params.age = { $lte: parseInt(params.ageStart), $gte: parseInt(params.ageEnd) }
                            //   }
                            // }
                          }else if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && (params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            params.age = { $lte: parseInt(params.ageEnd)}
                          }else if(params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''  && (params.ageEnd==null || params.ageEnd==undefined || params.ageEnd=='')){
                            params.age = { $gte: parseInt(params.ageStart)}
                          }else if(parseInt(params.ageStart) == parseInt(params.ageEnd)){
                            params.age = parseInt(params.ageStart);
                          }
                          delete params.ageStart;
                          delete params.ageEnd;
                          delete params.priceEnd;
                          delete params.priceStart;
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            var colorArray = params.color.split(',');
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            var brandArray = params.brandName.split(',');
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            var storageArray = params.storage.split(',');
                          }
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check3");
                          }
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            params.color = { $in: colorArray  };
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            params.brandName = { $in: brandArray };
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            params.storage = {  $in: storageArray };
                          }
                          if (params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0' && params.distance=='National')
                          {
                            var crg = require('country-reverse-geocoding').country_reverse_geocoding();
                            var country = crg.get_country(parseFloat(params.lat), parseFloat(params.lng));
                            if (country != null)
                            {
                              params.country = country.name
                            }
                            else {
                              console.log("country", "Null");
                            }
                            //    console.log("*Params", "check 0120");
                            //  console.log("*Params", params);
                            delete params.distance;
                            delete params.lng;
                            delete params.lat;
                          }
                          else if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                            distance = parseFloat(params.distance)/111;
                            //    console.log("** Distance : ",distance);
                            params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                            // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                            // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                            delete params.lng;
                            delete params.lat;
                          }
                          delete params.lng;
                          delete params.lat;
                          delete params.distance;
                          //    console.log("Request at length 0:",params);
                          delete params.pointOneLat;
                          delete params.pointTwoLat;
                          delete params.pointThreeLat;
                          delete params.pointFourLat;
                          delete params.pointOneLng;
                          delete params.pointTwoLng;
                          delete params.pointThreeLng;
                          delete params.pointFourLng;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Skips : ",parseInt(skips)*10);
                          }
                          delete params.rectangle;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Searching 11: ",params);
                          }
                          params.sold = false;
                          var fin = {};
                          if(userId == ''){
                            fin = {user_id:"5b90db36ca1bb6337df61968"}
                          }else{
                            fin = {user_id:userId}
                          }
                          console.log("Request to be searched : ",JSON.stringify(params));
                          console.log(params , limit,fin);
                          offers.find(fin).exec(function(error,offresult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(offresult.length>0){
                                var uoid = [];
                                offresult.forEach(function(i,idx,x){
                                  uoid[idx] = i._id;
                                  if(idx == x.length-1){
                                    //                                params.offers = {$nin : uoid};
                                    console.log(params , limit);
                                    Advertisement.find(params).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort(sor).exec(function(error,result){
                                      if(error){
                                        console.log("Error",error);
                                        res.status(500).send({error:error});
                                      }else{
                                        if(result.length>0){
                                          if(userId!=''){
                                            //console.log("check4");
                                            User.findOne({_id:userId}).exec(function(error,userResult){
                                              if(error){
                                                res.status(500).send({message:"find user error",error:error});
                                              }else{
                                                if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                                }else{
                                                  distanceLat = userResult.location[0];
                                                }
                                                var fav = userResult.favouriteAdds;
                                                if(fav.length>0){
                                                  result.forEach(function(i,idx,x){
                                                    fav.forEach(function(j,jdy,y){
                                                      var z =""+i._id;
                                                      var p = ""+j;
                                                      if(z==p){
                                                        i.isFavourite = true;
                                                      }
                                                      if(jdy==y.length-1){
                                                        if(idx==x.length-1){
                                                          if(skips*limit<result.length){
                                                            var count = 0;
                                                            var fresponse = [];
                                                            if((skips*limit)+limit < result.length){
                                                              for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                                fresponse[count] = result[m];
                                                                count = count+1;
                                                                if(m == ((skips*limit)+limit)-1 || count == limit){
                                                                  if(currency !='USD'){  //currency value of user is not USD
                                                                    curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                                      if(error){
                                                                        res.status(500).send({error:error});
                                                                      }else{
                                                                        //  console.log("currency : ",currencyResult);
                                                                        fresponse.forEach(function(d,jdz,z){
                                                                          fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                          if(distanceLat!=''){
                                                                            if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                              if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                                }
                                                                              }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                          if(jdz == z.length-1){
                                                                            res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                          }
                                                                        })
                                                                      }
                                                                    })
                                                                  }else{ //user currency is equal to USD
                                                                    fresponse.forEach(function(d,jdz,z){
                                                                      //distance calculation Algorithem between two positions start
                                                                      if(distanceLat!=''){
                                                                        if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                          if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                            fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                            if(parseFloat(fresponse[jdz].distance)<0){
                                                                              fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                            }else{
                                                                              fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                            }
                                                                          }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                            fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                            if(parseFloat(fresponse[jdz].distance)<0){
                                                                              fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                            }else{
                                                                              fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                      //distance calculation algorithem Algorithim ends here
                                                                      if(jdz == z.length-1){
                                                                        res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                      }
                                                                    })
                                                                  }
                                                                  //  res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                  break;
                                                                }
                                                              }
                                                            }else{
                                                              var count = 0;
                                                              var fresponse = [];
                                                              for(var m = skips*limit;m<result.length;m++){
                                                                fresponse[count] = result[m];
                                                                count = count+1;
                                                                if(m == result.length-1 || count == limit){
                                                                  if(currency !='USD'){  //currency value of user is not USD
                                                                    curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                                      if(error){
                                                                        res.status(500).send({error:error});
                                                                      }else{
                                                                        fresponse.forEach(function(d,jdz,z){
                                                                          fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                          if(distanceLat!=''){
                                                                            if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                              if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                                }
                                                                              }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                                }else{
                                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                          if(jdz == z.length-1){
                                                                            res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                          }
                                                                        })
                                                                      }
                                                                    })
                                                                  }else{ //user currency is equal to USD
                                                                    fresponse.forEach(function(d,jdz,z){
                                                                      //distance calculation Algorithem between two positions start
                                                                      if(distanceLat!=''){
                                                                        if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                          if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                            fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                            if(parseFloat(fresponse[jdz].distance)<0){
                                                                              fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                            }else{
                                                                              fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                            }
                                                                          }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                            fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                            if(parseFloat(fresponse[jdz].distance)<0){
                                                                              fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                            }else{
                                                                              fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                      //distance calculation algorithem Algorithim ends here
                                                                      if(jdz == z.length-1){
                                                                        res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                      }
                                                                    })
                                                                  }
                                                                  //  res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                  break;
                                                                }
                                                              }
                                                            }
                                                          }else{
                                                            res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                                            //                                                        res.status(404).send({message:"no Advertisement found."});
                                                          }
                                                          //res.status(200).send({result:result});
                                                        }
                                                      }
                                                    })
                                                  })
                                                }else{
                                                  console.log("99999")
                                                  if(skips*limit<result.length){
                                                    console.log("if ******,",result[0]);
                                                    var count = 0;
                                                    var fresponse = [];
                                                    if((skips*limit)+limit < result.length){
                                                      for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                        fresponse[count] = result[m];
                                                        count = count+1;
                                                        if(m == ((skips*limit)+limit)-1 || count == limit || count == result.length-1){
                                                          res.status(200).send({result:fresponse,length:parseInt(result.length)});
                                                          break;
                                                        }
                                                      }
                                                    }else{
                                                      var count = 0;
                                                      var fresponse = [];
                                                      for(var m = skips*limit;m<result.length;m++){
                                                        fresponse[count] = result[m];
                                                        count = count+1;
                                                        if(m == result.length-1 || count == limit){
                                                          if(currency !='USD'){  //currency value of user is not USD
                                                            curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                fresponse.forEach(function(d,jdz,z){
                                                                  fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                  if(distanceLat!=''){
                                                                    if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                      if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                        fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                        if(parseFloat(fresponse[jdz].distance)<0){
                                                                          fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                        }else{
                                                                          fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                        }

                                                                      }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                        fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                        if(parseFloat(fresponse[jdz].distance)<0){
                                                                          fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                        }else{
                                                                          fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                  if(jdz == z.length-1){
                                                                    res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                  }
                                                                })
                                                              }
                                                            })
                                                          }else{ //user currency is equal to USD
                                                            fresponse.forEach(function(d,jdz,z){
                                                              //distance calculation Algorithem between two positions start
                                                              if(distanceLat!=''){
                                                                if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                  if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                              //distance calculation algorithem Algorithim ends here
                                                              if(jdz == z.length-1){
                                                                res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                              }
                                                            })
                                                          }
                                                          //  res.status(200).send({result:fresponse,length:parseInt(result.length)});
                                                          break;
                                                        }
                                                      }
                                                    }
                                                  }else{
                                                    //    console.log("else not found",result);
                                                    res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                                    //                                                res.status(404).send({message:"no Advertisement found."});
                                                  }
                                                }
                                              }
                                            })
                                          }else{
                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("check5");
                                            }
                                            if(skips*limit<result.length){
                                              var count = 0;
                                              var fresponse = [];
                                              if((skips*limit)+limit < result.length){
                                                for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                  fresponse[count] = result[m];
                                                  count = count+1;
                                                  if(m == ((skips*limit)+limit)-1 || count == limit){
                                                    if(currency !='USD'){  //currency value of user is not USD
                                                      curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          fresponse.forEach(function(d,jdz,z){
                                                            fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                            if(distanceLat!=''){
                                                              if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            if(jdz == z.length-1){
                                                              res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                            }
                                                          })
                                                        }
                                                      })
                                                    }else{ //user currency is equal to USD
                                                      fresponse.forEach(function(d,jdz,z){
                                                        //distance calculation Algorithem between two positions start
                                                        if(distanceLat!=''){
                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }
                                                          }
                                                        }
                                                        if(jdz == z.length-1){
                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                        }
                                                      })
                                                    }
                                                    break;
                                                  }
                                                }
                                              }else{
                                                var count = 0;
                                                var fresponse = [];
                                                for(var m = skips*limit;m<result.length;m++){
                                                  fresponse[count] = result[m];
                                                  count = count+1;
                                                  if(m == result.length-1 || count == limit){
                                                    if(currency !='USD'){  //currency value of user is not USD
                                                      curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          fresponse.forEach(function(d,jdz,z){
                                                            fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                            if(distanceLat!=''){
                                                              if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            if(jdz == z.length-1){
                                                              res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                            }
                                                          })
                                                        }
                                                      })
                                                    }else{ //user currency is equal to USD
                                                      fresponse.forEach(function(d,jdz,z){
                                                        //distance calculation Algorithem between two positions start
                                                        if(distanceLat!=''){
                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }
                                                          }
                                                        }
                                                        //distance calculation algorithem Algorithim ends here
                                                        if(jdz == z.length-1){
                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                        }
                                                      })
                                                    }
                                                    break;
                                                  }
                                                }
                                              }
                                            }else{
                                              res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                            }
                                          }
                                        }else{
                                          res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                        }
                                      }
                                    })
                                  }
                                })
                              }else{
                                Advertisement.find(params).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort(sor).exec(function(error,result){
                                  if(error){
                                    console.log("Error",error);
                                    res.status(500).send({error:error});
                                  }else{
                                    if(result.length>0){
                                      if(userId!=''){
                                        //console.log("check4");
                                        User.findOne({_id:userId}).exec(function(error,userResult){
                                          if(error){
                                            res.status(500).send({message:"find user error",error:error});
                                          }else{
                                            if(userResult){
                                              if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                              }else{
                                                distanceLat = userResult.location[0];
                                              }
                                              var fav = userResult.favouriteAdds;
                                              if(fav.length>0){
                                                result.forEach(function(i,idx,x){
                                                  fav.forEach(function(j,jdy,y){
                                                    var z =""+i._id;
                                                    var p = ""+j;
                                                    if(z==p){
                                                      i.isFavourite = true;
                                                    }
                                                    if(jdy==y.length-1){
                                                      if(idx==x.length-1){
                                                        if(skips*limit<result.length){
                                                          var count = 0;
                                                          var fresponse = [];
                                                          if((skips*limit)+limit < result.length){
                                                            for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                              fresponse[count] = result[m];
                                                              count = count+1;
                                                              if(m == ((skips*limit)+limit)-1 || count == limit){
                                                                if(currency !='USD'){  //currency value of user is not USD
                                                                  curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                                    if(error){
                                                                      res.status(500).send({error:error});
                                                                    }else{
                                                                      fresponse.forEach(function(d,jdz,z){
                                                                        fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                        if(distanceLat!=''){
                                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                              }else{
                                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                              }
                                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                              }else{
                                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                        if(jdz == z.length-1){
                                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                        }
                                                                      })
                                                                    }
                                                                  })
                                                                }else{ //user currency is equal to USD
                                                                  fresponse.forEach(function(d,jdz,z){
                                                                    //distance calculation Algorithem between two positions start
                                                                    if(distanceLat!=''){
                                                                      if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                        if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                          }else{
                                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                          }
                                                                        }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                          }else{
                                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                    //distance calculation algorithem Algorithim ends here
                                                                    if(jdz == z.length-1){
                                                                      res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                    }
                                                                  })
                                                                }
                                                                break;
                                                              }
                                                            }
                                                          }else{
                                                            var count = 0;
                                                            var fresponse = [];
                                                            for(var m = skips*limit;m<result.length;m++){
                                                              fresponse[count] = result[m];
                                                              count = count+1;
                                                              if(m == result.length-1 || count == limit){
                                                                if(currency !='USD'){  //currency value of user is not USD
                                                                  curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                                    if(error){
                                                                      res.status(500).send({error:error});
                                                                    }else{
                                                                      fresponse.forEach(function(d,jdz,z){
                                                                        fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                        if(distanceLat!=''){
                                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                              }else{
                                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                              }
                                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                              }else{
                                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                        if(jdz == z.length-1){
                                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                        }
                                                                      })
                                                                    }
                                                                  })
                                                                }else{ //user currency is equal to USD
                                                                  fresponse.forEach(function(d,jdz,z){
                                                                    //distance calculation Algorithem between two positions start
                                                                    if(distanceLat!=''){
                                                                      if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                        if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                          }else{
                                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                          }
                                                                        }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                          }else{
                                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                    //distance calculation algorithem Algorithim ends here
                                                                    if(jdz == z.length-1){
                                                                      res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                    }
                                                                  })
                                                                }
                                                                break;
                                                              }
                                                            }
                                                          }
                                                        }else{
                                                          res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                                        }
                                                      }
                                                    }
                                                  })
                                                })
                                              }else{
                                                console.log("99999")
                                                if(skips*limit<result.length){
                                                  var count = 0;
                                                  var fresponse = [];
                                                  if((skips*limit)+limit < result.length){
                                                    for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                      fresponse[count] = result[m];
                                                      count = count+1;
                                                      if(m == ((skips*limit)+limit)-1 || count == limit){
                                                        if(currency !='USD'){  //currency value of user is not USD
                                                          curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                            if(error){
                                                              res.status(500).send({error:error});
                                                            }else{
                                                              fresponse.forEach(function(d,jdz,z){
                                                                fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                if(distanceLat!=''){
                                                                  if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                    if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                      fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                      if(parseFloat(fresponse[jdz].distance)<0){
                                                                        fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                      }else{
                                                                        fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                      }
                                                                    }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                      fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                      if(parseFloat(fresponse[jdz].distance)<0){
                                                                        fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                      }else{
                                                                        fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                                if(jdz == z.length-1){
                                                                  res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                }
                                                              })
                                                            }
                                                          })
                                                        }else{ //user currency is equal to USD
                                                          fresponse.forEach(function(d,jdz,z){
                                                            //distance calculation Algorithem between two positions start
                                                            if(distanceLat!=''){
                                                              if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            //distance calculation algorithem Algorithim ends here
                                                            if(jdz == z.length-1){
                                                              res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                            }
                                                          })
                                                        }
                                                        break;
                                                      }
                                                    }
                                                  }else{
                                                    var count = 0;
                                                    var fresponse = [];
                                                    for(var m = skips*limit;m<result.length;m++){
                                                      fresponse[count] = result[m];
                                                      count = count+1;
                                                      if(m == result.length-1 || count == limit){
                                                        if(currency !='USD'){  //currency value of user is not USD
                                                          curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                            if(error){
                                                              res.status(500).send({error:error});
                                                            }else{
                                                              fresponse.forEach(function(d,jdz,z){
                                                                fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                                if(distanceLat!=''){
                                                                  if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                    if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                      fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                      if(parseFloat(fresponse[jdz].distance)<0){
                                                                        fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                      }else{
                                                                        fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                      }
                                                                    }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                      fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                      if(parseFloat(fresponse[jdz].distance)<0){
                                                                        fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                      }else{
                                                                        fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                                if(jdz == z.length-1){
                                                                  res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                                }
                                                              })
                                                            }
                                                          })
                                                        }else{ //user currency is equal to USD
                                                          fresponse.forEach(function(d,jdz,z){
                                                            //distance calculation Algorithem between two positions start
                                                            if(distanceLat!=''){
                                                              if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                  fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                  if(parseFloat(fresponse[jdz].distance)<0){
                                                                    fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                  }else{
                                                                    fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                            //distance calculation algorithem Algorithim ends here
                                                            if(jdz == z.length-1){
                                                              res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                            }
                                                          })
                                                        }
                                                        break;
                                                      }
                                                    }
                                                  }
                                                }else{
                                                  res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                                }
                                              }
                                            }else{
                                              console.log("99999")
                                              if(skips*limit<result.length){
                                                var count = 0;
                                                var fresponse = [];
                                                if((skips*limit)+limit < result.length){
                                                  for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                                    fresponse[count] = result[m];
                                                    count = count+1;
                                                    if(m == ((skips*limit)+limit)-1 || count == limit){
                                                      if(currency !='USD'){  //currency value of user is not USD
                                                        curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            fresponse.forEach(function(d,jdz,z){
                                                              fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                              if(distanceLat!=''){
                                                                if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                  if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                              if(jdz == z.length-1){
                                                                res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }else{ //user currency is equal to USD
                                                        fresponse.forEach(function(d,jdz,z){
                                                          //distance calculation Algorithem between two positions start
                                                          if(distanceLat!=''){
                                                            if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                              if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                }else{
                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                }
                                                              }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                }else{
                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                }
                                                              }
                                                            }
                                                          }
                                                          //distance calculation algorithem Algorithim ends here
                                                          if(jdz == z.length-1){
                                                            res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                          }
                                                        })
                                                      }
                                                      break;
                                                    }
                                                  }
                                                }else{
                                                  var count = 0;
                                                  var fresponse = [];
                                                  for(var m = skips*limit;m<result.length;m++){
                                                    fresponse[count] = result[m];
                                                    count = count+1;
                                                    if(m == result.length-1 || count == limit){
                                                      if(currency !='USD'){  //currency value of user is not USD
                                                        curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            fresponse.forEach(function(d,jdz,z){
                                                              fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                              if(distanceLat!=''){
                                                                if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                                  if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                    fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                    if(parseFloat(fresponse[jdz].distance)<0){
                                                                      fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                    }else{
                                                                      fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                              if(jdz == z.length-1){
                                                                res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }else{ //user currency is equal to USD
                                                        fresponse.forEach(function(d,jdz,z){
                                                          //distance calculation Algorithem between two positions start
                                                          if(distanceLat!=''){
                                                            if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                              if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                }else{
                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                }
                                                              }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                                fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                                if(parseFloat(fresponse[jdz].distance)<0){
                                                                  fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                                }else{
                                                                  fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                                }
                                                              }
                                                            }
                                                          }
                                                          //distance calculation algorithem Algorithim ends here
                                                          if(jdz == z.length-1){
                                                            res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                          }
                                                        })
                                                      }
                                                      break;
                                                    }
                                                  }
                                                }
                                              }else{
                                                res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                              }
                                            }
                                          }
                                        })
                                      }else{
                                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                          console.log("check5");
                                        }
                                        if(skips*limit<result.length){
                                          var count = 0;
                                          var fresponse = [];
                                          if((skips*limit)+limit < result.length){
                                            for(var m = skips*limit;m<(skips*limit)+limit;m++){
                                              fresponse[count] = result[m];
                                              count = count+1;
                                              if(m == ((skips*limit)+limit)-1 || count == limit){
                                                if(currency !='USD'){  //currency value of user is not USD
                                                  curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      fresponse.forEach(function(d,jdz,z){
                                                        fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                        if(distanceLat!=''){
                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }
                                                          }
                                                        }
                                                        if(jdz == z.length-1){
                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                        }
                                                      })
                                                    }
                                                  })
                                                }else{ //user currency is equal to USD
                                                  fresponse.forEach(function(d,jdz,z){
                                                    //distance calculation Algorithem between two positions start
                                                    if(distanceLat!=''){
                                                      if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                        if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                          }else{
                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                          }
                                                        }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                          }else{
                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                          }
                                                        }
                                                      }
                                                    }
                                                    //distance calculation algorithem Algorithim ends here
                                                    if(jdz == z.length-1){
                                                      res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                    }
                                                  })
                                                }
                                                break;
                                              }
                                            }
                                          }else{
                                            var count = 0;
                                            var fresponse = [];
                                            for(var m = skips*limit;m<result.length;m++){
                                              fresponse[count] = result[m];
                                              count = count+1;
                                              if(m == result.length-1 || count == limit){
                                                if(currency !='USD'){  //currency value of user is not USD
                                                  curr.findOne({currency:currency}).exec(function(error,currencyResult){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      fresponse.forEach(function(d,jdz,z){
                                                        fresponse[jdz].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(fresponse[jdz].price)).toFixed(2);
                                                        if(distanceLat!=''){
                                                          if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                            if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                              fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                              if(parseFloat(fresponse[jdz].distance)<0){
                                                                fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                              }else{
                                                                fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                              }
                                                            }
                                                          }
                                                        }
                                                        if(jdz == z.length-1){
                                                          res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                        }
                                                      })
                                                    }
                                                  })
                                                }else{ //user currency is equal to USD
                                                  fresponse.forEach(function(d,jdz,z){
                                                    //distance calculation Algorithem between two positions start
                                                    if(distanceLat!=''){
                                                      if(fresponse[jdz].location!=null && fresponse[jdz].location!=undefined){
                                                        if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])>distanceLat){
                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                          }else{
                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                          }

                                                        }else if(fresponse[jdz].location[1] !=null && fresponse[jdz].location[1] !=undefined && parseFloat(fresponse[jdz].location[1])<distanceLat){
                                                          fresponse[jdz].distance =   ((parseFloat(fresponse[jdz].location[1] - distanceLat))*111)/1.69;
                                                          if(parseFloat(fresponse[jdz].distance)<0){
                                                            fresponse[jdz].distance = Number((parseFloat((fresponse[jdz].distance))*(-1)).toFixed(1));
                                                          }else{
                                                            fresponse[jdz].distance = Number(parseFloat(fresponse[jdz].distance)).toFixed(1);
                                                          }
                                                        }
                                                      }
                                                    }
                                                    //distance calculation algorithem Algorithim ends here
                                                    if(jdz == z.length-1){
                                                      res.status(200).send({result:fresponse, length:parseInt(result.length)});
                                                    }
                                                  })
                                                }
                                                break;
                                              }
                                            }
                                          }
                                        }else{
                                          res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                        }
                                      }
                                    }else{
                                      res.status(200).send({result:[], length:0,message:"no advertisements found"});
                                    }
                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    }else{
                      console.log("currency not found");
                    }
                  }
                })
              }

              exports.testFind = function(req,res){
                Advertisement.find({}).populate("user_id").exec(function(error,result){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    res.status(200).send({result:result});
                  }
                })
              }

              exports.updateAddLocation = function(req,res){
                var params = req.body;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("Request: ",params);
                }
                for (var i in params) {
                  if (params[i] == "") {
                    delete params[i];
                  }
                }
                if(params.advert_id!=null && params.advert_id!=undefined){
                  if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                    Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(result){
                          result.location=[parseFloat(params.lng),parseFloat(params.lat)];
                          var crg = require('country-reverse-geocoding').country_reverse_geocoding();

                          var cntry = crg.get_country(parseFloat(params.lat), parseFloat(params.lng));
                          console.log("**Country", cntry);

                          if (cntry != null)
                          {
                            result["country"] = cntry.name
                            result["countryCode"] = cntry.code
                          }


                          result.updatedAt = Date.now();
                          result.save(function(error,done){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(req.user.currency !='USD'){  //currency value of user is not USD
                                curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    done.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done.price)).toFixed(2);
                                    res.status(200).send({message:"location updated successfully",result:done});
                                  }
                                })
                              }else{ //user currency is equal to USD
                                res.status(200).send({message:"location updated successfully",result:done});
                              }
                              //  res.status(200).send({message:"location updated successfully",result:done});
                            }
                          })
                        }else{
                          res.status(404).send({message:"Advertisement not found"});
                        }
                      }
                    })
                  }else{
                    res.status(403).send({message:"lat lng missing"});
                  }
                }else{
                  res.status(403).send({message:"advert_id missing"});
                }
              }

              exports.boostAdverisement = function(req,res){
                console.log("request : ",req.body);
                if(req.body.advert_id!=null && req.body.advert_id!=undefined && req.body.advert_id!=''){
                  User.findOne({_id:req.user._id}).populate("favouriteAdds package").exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error,message:"error in finding user"});
                    }else{
                      if(result){
                        if(result.boostCount>0  && (req.body.enabled == true || req.body.enabled == 'true')){
                          Advertisement.findOne({_id:req.body.advert_id,boosted:false}).exec(function(error,done){
                            if(error){
                              res.status(500).send({error:error,message:"error in finding advertisement"});
                            }else{
                              if(done){
                                done.boosts = 25;
                                done.boosted = true;
                                done.boostStartingTime = new Date(Date.now()).getTime();
                                done.save(function(error,final){
                                  if(error){
                                    res.status(500).send({error:error,message:"error in updating advertisement"});
                                  }else{
                                    result.boostCount = parseInt(result.boostCount)-1;
                                    result.save(function(error,completed){
                                      if(error){
                                        res.status(500).send({error:error,message:"error in updating user"});
                                      }else{
                                        Advertisement.findOne({_id:req.body.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,finalAd){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(req.user.currency !='USD'){  //currency value of user is not USD
                                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  finalAd.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(finalAd.price)).toFixed(2);
                                                  res.status(200).send({message:"Advertisement Boosted",result:finalAd,user:result});
                                                }
                                              })
                                            }else{ //user currency is equal to USD
                                              res.status(200).send({message:"Advertisement Boosted",result:finalAd,user:result});
                                            }

                                          }
                                        })
                                      }
                                    })
                                  }
                                })
                              }else{
                                res.status(404).send({message:"Advertisement not found or might be already boosted"});
                              }
                            }
                          })
                        }else{
                          Advertisement.findOne({_id:req.body.advert_id,boosted:true}).exec(function(error,done){
                            if(error){
                              res.status(500).send({error:error,message:"error in finding advertisement"});
                            }else{
                              if(done){
                                done.boosts = 0;
                                done.boosted = false;
                                done.boostStartingTime = 0;
                                done.save(function(error,final){
                                  if(error){
                                    res.status(500).send({error:error,message:"error in updating advertisement"});
                                  }else{
                                    result.save(function(error,completed){
                                      if(error){
                                        res.status(500).send({error:error,message:"error in updating user"});
                                      }else{
                                        Advertisement.findOne({_id:req.body.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,finalAd){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(req.user.currency !='USD'){  //currency value of user is not USD
                                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  finalAd.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(finalAd.price)).toFixed(2);
                                                  res.status(200).send({message:"Advertisement removed from Boosted",result:finalAd,user:result});
                                                }
                                              })
                                            }else{ //user currency is equal to USD
                                              res.status(200).send({message:"Advertisement removed from Boosted",result:finalAd,user:result});
                                            }

                                          }
                                        })
                                      }
                                    })
                                  }
                                })
                              }else{
                                res.status(404).send({message:"Advertisement not found "});
                              }
                            }
                          })
                        }
                      }else{
                        res.stauts(401).send({message:"User not found"});
                      }
                    }
                  })
                }else{
                  res.status(403).send({message:"advert_id required"});
                }
              }

              exports.getAdvertismentDetatils = function(req,res){
                var distanceLat = '';
                var distanceLng = '';
                console.log(req.body,"*****")
                if(req.body.dlat!=null && req.body.dlat != undefined && req.body.dlat!='' && req.body.dlng!=null && req.body.dlng != undefined && req.body.dlng!=''){
                  distanceLat = parseFloat(req.body.dlat);
                  distanceLng = parseFloat(req.body.dlng);
                }
                console.log("************",distanceLat,distanceLng);
                delete req.body.dlat;
                delete req.body.dlng;
                Advertisement.findOne({_id:req.body.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,result){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(distanceLat!=''){
                      if(result.location!=null && result.location!=undefined){
                        if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                          result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                          if(parseFloat(result.distance)<0){
                            result.distance = (result.distance)*(-1);
                          }else{
                            result.distance = result.distance;
                          }
                        }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                          result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                          if(parseFloat(result.distance)<0){
                            result.distance = (result.distance)*(-1);
                          }else{
                            result.distance = result.distance;
                          }
                        }
                      }
                    }
                    if(req.user){
                      if(req.user.currency !='USD'){  //currency value of user is not USD
                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            result.price = parseFloat(currencyResult.valueInUSD)*parseFloat(result.price);
                            if(result.offers.length>0){
                              result.offers.forEach(function(i,idx,x){
                                result.offers[idx].offered_price = parseFloat(currencyResult.valueInUSD)*parseFloat(result.offers[idx].offered_price);
                                if(idx == x.length-1){
                                  res.status(200).send({result:result});
                                }
                              })
                            }else{
                              res.status(200).send({result:result});
                            }
                          }
                        })
                      }else{ //user currency is equal to USD
                        res.status(200).send({result:result});
                      }
                    }else{
                      res.status(200).send({result:result});
                    }
                  }
                })
              }

              exports.deleteImage = function(req,res){
                var params= req.body;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("request : ",params);
                }
                if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                  if(params.imageUrl!=null && params.imageUrl!=undefined && params.imageUrl!=''){
                    Advertisement.update(
                      {_id:params.advert_id },
                      { $pull: { pictures: params.imageUrl } },
                      { multi: false }
                    ).then(function(result){
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log(result);
                      }
                      Advertisement.findOne({_id:params.advert_id}).exec(function(error,done){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          if(result){
                            if(req.user.currency!='USD'){
                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  done.price = parseFloat(done.price)*parseFloat(currencyResult.valueInUSD);
                                  res.status(200).send({message:"Image deleted successfully",result:done});
                                }
                              })
                            }else{ // user currency equal to USD
                              res.status(200).send({message:"Image deleted successfully",result:done});
                            }
                          }else{
                            res.status(404).send({message:"Advertisement not found"});
                          }
                        }
                      })
                    })
                  }else{
                    res.status(403).send({message:"iamgeUrl required"});
                  }
                }else{
                  res.stauts(403).send({message:"advert_id required"});
                }
              }

              exports.placeAddWeb = function(req,res){
                var params = req.body;
                params.sold = false;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("Request : ",params);
                }
                for (var i in params) {
                  if (params[i] == "") {
                    delete params[i];
                  }
                }
                params.user_id = req.user._id;
                User.findOne({_id:req.user._id}).exec(function(error,userResult){
                  if(error){
                    res.status(500).send({message:"error in finding user",error:error});
                  }else{
                    params.search = (params.title+" "+params.description).toLowerCase();
                    if(req.user.currency !='USD'){  //currency value of user is not USD
                      curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          params.price = parseFloat(params.price)/parseFloat(currencyResult.valueInUSD);
                          if(userResult){
                            if(parseFloat(userResult.addsCount)>0){
                              if(typeof parseFloat(params.price) == "number" && !isNaN(params.price)){
                                if(params.type !=null && params.type !=undefined && params.type !=""){
                                  if(params.advert_id!=null && params.advert_id!="" && params.advert_id!=undefined){
                                    Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        if(result){
                                          //physicalIssues
                                          result.price = req.body.price
                                          ? req.body.price
                                          : result.price;
                                          if(req.body.physicalIssues.length>0){
                                            result.physicalIssues = req.body.physicalIssues
                                          }
                                          if(req.body.accessories.length>0){
                                            result.accessories = req.body.accessories;
                                          }
                                          if(req.body.age!=null && req.body.age!=undefined && req.body.age!=''){
                                            result.age = req.body.age;
                                          }
                                          result.color = req.body.color
                                          ? req.body.color
                                          : result.color;
                                          result.description = req.body.description
                                          ? req.body.description
                                          : result.description;
                                          result.storage = req.body.storage
                                          ? req.body.storage
                                          : result.storage;
                                          result.title = req.body.title
                                          ? req.body.title
                                          : result.title;
                                          result.brandName = req.body.brandName
                                          ? req.body.brandName
                                          : result.brandName;
                                          result.type = req.body.type
                                          ? req.body.type
                                          : result.type;
                                          result.imei = req.body.imei
                                          ? req.body.imei
                                          : result.imei;

                                          result.updatedAt = Date.now();

                                          result.save(function(error,saved){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                    console.log("Updated : ",compl);
                                                  }
                                                  //        userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                  userResult.save(function(error,completedResult){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      if(req.user.currency !='USD'){  //currency value of user is not USD
                                                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                            res.status(200).send({message:"Advertisement updated",result:compl});
                                                          }
                                                        })
                                                      }else{ //user currency is not equal to USD
                                                        res.status(200).send({message:"Advertisement updated",result:compl});
                                                      }

                                                    }
                                                  })
                                                }
                                              })
                                            }
                                          })
                                        }else{
                                          res.status(404).send({message:"Advertisement not found"});
                                        }
                                      }
                                    })
                                  }else{
                                    params.price = parseFloat(params.price);
                                    params.user_id = req.user._id;
                                    mobile.findOne({_id:params.deviceDetails}).populate("Brand").exec(function(error,devices){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        if(devices){
                                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                            console.log("Brand Name : ",devices.Brand.brandName);
                                          }
                                          params.brandName = devices.Brand.brandName;
                                          if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                            var e = params.storage;
                                            params.storage = e.toUpperCase();
                                          }
                                          if(params.color!=null && params.color!=undefined && params.color!=''){
                                            var colorString = params.color;
                                            params.color =   colorString.toUpperCase();
                                          }
                                          var lowerTitle = params.title.toLowerCase();
                                          lowerTitle = lowerTitle.replace(" the","");
                                          lowerTitle = lowerTitle.replace(" is","");
                                          lowerTitle = lowerTitle.replace(" a","");
                                          lowerTitle = lowerTitle.replace(" on","");
                                          lowerTitle = lowerTitle.replace(" upon","");
                                          lowerTitle = lowerTitle.replace(" was","");
                                          var lowerDescription = params.title.toLowerCase();
                                          lowerDescription = lowerDescription.replace(" the","");
                                          lowerDescription = lowerDescription.replace(" is","");
                                          lowerDescription = lowerDescription.replace(" a","");
                                          lowerDescription = lowerDescription.replace(" on","");
                                          lowerDescription = lowerDescription.replace(" upon","");
                                          lowerDescription = lowerDescription.replace(" was","");
                                          params.search = ((lowerTitle+" "+lowerDescription).toLowerCase()).split(" ");
                                          if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                          {
                                            params.search = params.search.concat([params.storage])
                                          }
                                          if(params.color!=null && params.color!=undefined && params.color!='')
                                          {
                                            params.search = params.search.concat([params.color])
                                          }
                                          if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                          {
                                            params.search = params.search.concat([params.brandName])
                                          }
                                          Advertisement.create(params).then(function(result){
                                            Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("AdvertID :",result._id);
                                                console.log("Populated Advert :",compl);
                                              }
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                //    userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                userResult.save(function(error,completedResult){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    if(req.user.currency !='USD'){  //currency value of user is not USD
                                                      curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                          res.status(202).send({result:compl});
                                                        }
                                                      })
                                                    }else{ //user currency is not equal to USD
                                                      res.status(202).send({result:compl});
                                                    }

                                                  }
                                                })
                                              }
                                            })
                                          })
                                        }else{
                                          console.log("New brand ....");
                                          if((params.brandName!=null && params.brandName!=undefined && params.brandName!="") && (params.brand_id==null || params.brand_id==undefined || params.brand_id=="")){
                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("check#1");
                                            }
                                            mobileBrand.create({
                                              brandName : params.brandName
                                            }).exec(function(comp){
                                              params.brandName = comp.brandName;
                                              if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                                var e = params.storage;
                                                params.storage = e.toUpperCase();
                                              }
                                              var lowerTitle = params.title.toLowerCase();
                                              lowerTitle = lowerTitle.replace(" the","");
                                              lowerTitle = lowerTitle.replace(" is","");
                                              lowerTitle = lowerTitle.replace(" a","");
                                              lowerTitle = lowerTitle.replace(" on","");
                                              lowerTitle = lowerTitle.replace(" upon","");
                                              lowerTitle = lowerTitle.replace(" was","");
                                              var lowerDescription = params.title.toLowerCase();
                                              lowerDescription = lowerDescription.replace(" the","");
                                              lowerDescription = lowerDescription.replace(" is","");
                                              lowerDescription = lowerDescription.replace(" a","");
                                              lowerDescription = lowerDescription.replace(" on","");
                                              lowerDescription = lowerDescription.replace(" upon","");
                                              lowerDescription = lowerDescription.replace(" was","");
                                              params.search = ((lowerTitle+" "+lowerDescription).toLowerCase()).split(" ");
                                              if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                              {
                                                params.search = params.search.concat([params.storage])
                                              }
                                              if(params.color!=null && params.color!=undefined && params.color!='')
                                              {
                                                params.search = params.search.concat([params.color])
                                              }
                                              if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                              {
                                                params.search = params.search.concat([params.brandName])
                                              }
                                              Advertisement.create(params).then(function(result){
                                                Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                    console.log("AdvertID :",result._id);
                                                    console.log("Populated Advert :",compl);
                                                  }
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    //                userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                    userResult.save(function(error,completedResult){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        if(req.user.currency !='USD'){  //currency value of user is not USD
                                                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                            if(error){
                                                              res.status(500).send({error:error});
                                                            }else{
                                                              compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                              res.status(202).send({result:compl});
                                                            }
                                                          })
                                                        }else{ //user currency is not equal to USD
                                                          res.status(202).send({result:compl});
                                                        }
                                                      }
                                                    })
                                                  }
                                                })
                                              })
                                            })
                                          }else if((params.brand_id!=null && params.brand_id!=undefined && params.brand_id!="" )&&(params.brandName==null || params.brandName==undefined || params.brandName=="")){
                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("check#2");
                                            }
                                            mobileBrand.findOne({_id:params.brand_id}).exec(function(error,makeit){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                if(makeit){
                                                  params.brandName = makeit.brandName;
                                                  Advertisement.create(params).then(function(result){
                                                    //          userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                    userResult.save(function(error,completedAdd){
                                                      if(error){
                                                        res.status(500).send({message:"error in updating user",error:error});
                                                      }else{
                                                        Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                              console.log("Response : ",compl);
                                                            }
                                                            //        userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                            userResult.save(function(error,completedResult){
                                                              if(error){
                                                                res.status(500).send({error:error});
                                                              }else{
                                                                if(req.user.currency !='USD'){  //currency value of user is not USD
                                                                  curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                                    if(error){
                                                                      res.status(500).send({error:error});
                                                                    }else{
                                                                      compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                                      res.status(202).send({result:compl});
                                                                    }
                                                                  })
                                                                }else{ //user currency is not equal to USD
                                                                  res.status(202).send({result:compl});
                                                                }
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }
                                                    })
                                                  })
                                                }else{
                                                  res.status(422).send({message: "Brand name or Brand ID cannot be empty, if you are placing accessory advertisement"});
                                                }
                                              }
                                            })
                                          }else{
                                            res.status(403).send({message:"Brand Name not found"});
                                          }
                                        }
                                      }
                                    })
                                  }
                                }else{
                                  res.status(403).send({message: "type required"});
                                }
                              }else{
                                res.status(422).send({message:"invalid parameters"});
                              }
                            }else{
                              res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
                            }
                          }else{
                            res.status(401).send({message:"user not found"});
                          }
                        }
                      })
                    }else{ // currency value of user is USD
                      if(userResult){
                        if(parseFloat(userResult.addsCount)>0){
                          if(typeof parseFloat(params.price) == "number" && !isNaN(params.price)){
                            if(params.type !=null && params.type !=undefined && params.type !=""){
                              if(params.advert_id!=null && params.advert_id!="" && params.advert_id!=undefined){
                                Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(result){
                                      if(req.body.physicalIssues.length>0){
                                        result.physicalIssues = req.body.physicalIssues
                                      }
                                      if(req.body.accessories.length>0){
                                        result.accessories = req.body.accessories;
                                      }
                                      result.price = req.body.price
                                      ? req.body.price
                                      : result.price;
                                      if(req.body.age!=null && req.body.age!=undefined && req.body.age!=''){
                                        result.age = req.body.age;
                                      }
                                      result.color = req.body.color
                                      ? req.body.color
                                      : result.color;
                                      result.description = req.body.description
                                      ? req.body.description
                                      : result.description;
                                      result.storage = req.body.storage
                                      ? req.body.storage
                                      : result.storage;
                                      result.title = req.body.title
                                      ? req.body.title
                                      : result.title;
                                      result.brandName = req.body.brandName
                                      ? req.body.brandName
                                      : result.brandName;
                                      result.type = req.body.type
                                      ? req.body.type
                                      : result.type;
                                      result.imei = req.body.imei
                                      ? req.body.imei
                                      : result.imei;
                                      result.updatedAt = Date.now();

                                      result.save(function(error,saved){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("Updated : ",compl);
                                              }
                                              //        userResult.addsCount = parseInt(userResult.addsCount)-1;
                                              userResult.save(function(error,completedResult){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  if(req.user.currency !='USD'){  //currency value of user is not USD
                                                    curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                        res.status(200).send({message:"Advertisement updated",result:compl});
                                                      }
                                                    })
                                                  }else{ //user currency is not equal to USD
                                                    res.status(200).send({message:"Advertisement updated",result:compl});
                                                  }

                                                }
                                              })
                                            }
                                          })
                                        }
                                      })
                                    }else{
                                      res.status(404).send({message:"Advertisement not found"});
                                    }
                                  }
                                })
                              }else{
                                params.price = parseFloat(params.price);
                                params.user_id = req.user._id;
                                mobile.findOne({_id:params.deviceDetails}).populate("Brand").exec(function(error,devices){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(devices){
                                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                        console.log("Brand Name : ",devices.Brand.brandName);
                                      }
                                      params.brandName = devices.Brand.brandName;
                                      if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                        var e = params.storage;
                                        params.storage = e.toUpperCase();
                                      }
                                      if(params.color!=null && params.color!=undefined && params.color!=''){
                                        var colorString = params.color;
                                        params.color =   colorString.toUpperCase();
                                      }
                                      var lowerTitle = params.title.toLowerCase();
                                      lowerTitle = lowerTitle.replace(" the","");
                                      lowerTitle = lowerTitle.replace(" is","");
                                      lowerTitle = lowerTitle.replace(" a","");
                                      lowerTitle = lowerTitle.replace(" on","");
                                      lowerTitle = lowerTitle.replace(" upon","");
                                      lowerTitle = lowerTitle.replace(" was","");
                                      var lowerDescription = params.title.toLowerCase();
                                      lowerDescription = lowerDescription.replace(" the","");
                                      lowerDescription = lowerDescription.replace(" is","");
                                      lowerDescription = lowerDescription.replace(" a","");
                                      lowerDescription = lowerDescription.replace(" on","");
                                      lowerDescription = lowerDescription.replace(" upon","");
                                      lowerDescription = lowerDescription.replace(" was","");
                                      params.search = ((lowerTitle+" "+lowerDescription).toLowerCase()).split(" ");
                                      if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                      {
                                        params.search = params.search.concat([params.storage])
                                      }
                                      if(params.color!=null && params.color!=undefined && params.color!='')
                                      {
                                        params.search = params.search.concat([params.color])
                                      }
                                      if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                      {
                                        params.search = params.search.concat([params.brandName])
                                      }
                                      Advertisement.create(params).then(function(result){
                                        Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                            console.log("AdvertID :",result._id);
                                            console.log("Populated Advert :",compl);
                                          }
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            //  userResult.addsCount = parseInt(userResult.addsCount)-1;
                                            userResult.save(function(error,completedResult){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                if(req.user.currency !='USD'){  //currency value of user is not USD
                                                  curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                      res.status(202).send({result:compl});
                                                    }
                                                  })
                                                }else{ //user currency is not equal to USD
                                                  res.status(202).send({result:compl});
                                                }
                                              }
                                            })
                                          }
                                        })
                                      })
                                    }else{
                                      console.log("New brand ....");
                                      if((params.brandName!=null && params.brandName!=undefined && params.brandName!="") && (params.brand_id==null || params.brand_id==undefined || params.brand_id=="")){
                                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                          console.log("check#1");
                                        }
                                        mobileBrand.create({
                                          brandName : params.brandName
                                        }).exec(function(comp){
                                          params.brandName = comp.brandName;
                                          if(params.storage!=null && params.storage!=undefined && params.storage!=""){
                                            var e = params.storage;
                                            params.storage = e.toUpperCase();
                                          }
                                          var lowerTitle = params.title.toLowerCase();
                                          lowerTitle = lowerTitle.replace(" the","");
                                          lowerTitle = lowerTitle.replace(" is","");
                                          lowerTitle = lowerTitle.replace(" a","");
                                          lowerTitle = lowerTitle.replace(" on","");
                                          lowerTitle = lowerTitle.replace(" upon","");
                                          lowerTitle = lowerTitle.replace(" was","");
                                          var lowerDescription = params.title.toLowerCase();
                                          lowerDescription = lowerDescription.replace(" the","");
                                          lowerDescription = lowerDescription.replace(" is","");
                                          lowerDescription = lowerDescription.replace(" a","");
                                          lowerDescription = lowerDescription.replace(" on","");
                                          lowerDescription = lowerDescription.replace(" upon","");
                                          lowerDescription = lowerDescription.replace(" was","");
                                          params.search = ((lowerTitle+" "+lowerDescription).toLowerCase()).split(" ");
                                          if(params.storage!=null && params.storage!=undefined && params.storage!='')
                                          {
                                            params.search = params.search.concat([params.storage])
                                          }
                                          if(params.color!=null && params.color!=undefined && params.color!='')
                                          {
                                            params.search = params.search.concat([params.color])
                                          }
                                          if(params.brandName!=null && params.brandName!=undefined && params.brandName!='')
                                          {
                                            params.search = params.search.concat([params.brandName])
                                          }
                                          Advertisement.create(params).then(function(result){
                                            Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("AdvertID :",result._id);
                                                console.log("Populated Advert :",compl);
                                              }
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                //    userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                userResult.save(function(error,completedResult){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    if(req.user.currency !='USD'){  //currency value of user is not USD
                                                      curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                          res.status(202).send({result:compl});
                                                        }
                                                      })
                                                    }else{ //user currency is not equal to USD
                                                      res.status(202).send({result:compl});
                                                    }
                                                  }
                                                })
                                              }
                                            })
                                          })
                                        })
                                      }else if((params.brand_id!=null && params.brand_id!=undefined && params.brand_id!="" )&&(params.brandName==null || params.brandName==undefined || params.brandName=="")){
                                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                          console.log("check#2");
                                        }
                                        mobileBrand.findOne({_id:params.brand_id}).exec(function(error,makeit){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(makeit){
                                              params.brandName = makeit.brandName;
                                              Advertisement.create(params).then(function(result){
                                                //          userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                userResult.save(function(error,completedAdd){
                                                  if(error){
                                                    res.status(500).send({message:"error in updating user",error:error});
                                                  }else{
                                                    Advertisement.findOne({_id:result._id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,compl){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                          console.log("Response : ",compl);
                                                        }
                                                        //              userResult.addsCount = parseInt(userResult.addsCount)-1;
                                                        userResult.save(function(error,completedResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            if(req.user.currency !='USD'){  //currency value of user is not USD
                                                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                                                if(error){
                                                                  res.status(500).send({error:error});
                                                                }else{
                                                                  compl.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(compl.price)).toFixed(2);
                                                                  res.status(202).send({result:compl});
                                                                }
                                                              })
                                                            }else{ //user currency is not equal to USD
                                                              res.status(202).send({result:compl});
                                                            }
                                                          }
                                                        })
                                                      }
                                                    })
                                                  }
                                                })
                                              })
                                            }else{
                                              res.status(422).send({message: "Brand name or Brand ID cannot be empty, if you are placing accessory advertisement"});
                                            }
                                          }
                                        })
                                      }
                                    }
                                  }
                                })
                              }
                            }else{
                              res.status(403).send({message: "type required"});
                            }
                          }else{
                            res.status(422).send({message:"invalid parameters"});
                          }
                        }else{
                          res.status(406).send({message:"Ad limit reached, Please upgrade your account to place an ad."});
                        }
                      }else{
                        res.status(401).send({message:"user not found"});
                      }
                    }
                  }
                })
              }

              exports.getAdvertisementDetails = function(req,res){
                var params = req.body;
                console.log("Request : ",params);
                var distanceLat = '';
                var distanceLng = '';
                console.log(req.body,"*****")
                if(req.body.dlat!=null && req.body.dlat != undefined && req.body.dlat!='' && req.body.dlng!=null && req.body.dlng != undefined && req.body.dlng!=''){
                  distanceLat = parseFloat(req.body.dlat);
                  distanceLng = parseFloat(req.body.dlng);
                }
                console.log("************",distanceLat,distanceLng);
                delete req.body.dlat;
                delete req.body.dlng;
                if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                  Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      //  console.log(result)
                      var myOffers = [];
                      var count = 0;

                      if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
                        console.log("1");
                        User.findOne({_id:params.user_id}).exec(function(error,userResult){
                          if(error){
                            res.status(500).send({error:error});
                          }else{

                            if(result && userResult){

                              console.log("user currency : ",userResult.currency);
                              if(userResult.currency !='USD'){  //currency value of user is not USD
                                curr.findOne({currency:userResult.currency}).exec(function(error,currencyResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    result.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result.price));
                                    if(result.offers.length>0){

                                      result.offers.forEach(function(i,idx,x){
                                        if(i.user_id == params.user_id || result.user_id._id == params.user_id){
                                          result.offers[idx].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result.offers[idx].offered_price));
                                          myOffers[count] = result.offers[idx];
                                          count = count+1;
                                        }
                                        if(idx == x.length-1){
                                          result.offers = myOffers;
                                          if(distanceLat!=''){
                                            if(result.location!=null && result.location!=undefined){
                                              console.log("1");
                                              if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                                                result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                                console.log("Distance : ***************",result.distance);
                                                console.log("2");
                                                if(parseFloat(result.distance)<0){
                                                  result.distance = (result.distance)*(-1);
                                                  if(userResult.favouriteAdds.length>0){
                                                    userResult.favouriteAdds.forEach(function(p,pl,l){
                                                      if(p+"" == result._id+""){
                                                        result.isFavourite = true;
                                                      }
                                                      if(pl == l.length-1){
                                                        res.status(200).send({result:result});
                                                      }
                                                    })
                                                  }else{
                                                    res.status(200).send({result:result});
                                                  }
                                                }else{
                                                  console.log("3");
                                                  console.log(result.distance);
                                                  if(userResult.favouriteAdds.length>0){
                                                    userResult.favouriteAdds.forEach(function(p,pl,l){
                                                      if(p+"" == result._id+""){
                                                        result.isFavourite = true;
                                                      }
                                                      if(pl == l.length-1){
                                                        res.status(200).send({result:result});
                                                      }
                                                    })
                                                  }else{
                                                    res.status(200).send({result:result});
                                                  }
                                                }
                                                console.log("4");
                                              }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                                                console.log("5");
                                                result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                                console.log("Distance : ***************",result.distance);

                                                if(parseFloat(result.distance)<0){
                                                  result.distance = (result.distance)*(-1);
                                                  if(userResult.favouriteAdds.length>0){
                                                    userResult.favouriteAdds.forEach(function(p,pl,l){
                                                      if(p+"" == result._id+""){
                                                        result.isFavourite = true;
                                                      }
                                                      if(pl == l.length-1){
                                                        res.status(200).send({result:result});
                                                      }
                                                    })
                                                  }else{
                                                    res.status(200).send({result:result});
                                                  }
                                                }else{
                                                  result.distance = result.distance;
                                                  if(userResult.favouriteAdds.length>0){
                                                    userResult.favouriteAdds.forEach(function(p,pl,l){
                                                      if(p+"" == result._id+""){
                                                        result.isFavourite = true;
                                                      }
                                                      if(pl == l.length-1){
                                                        res.status(200).send({result:result});
                                                      }
                                                    })
                                                  }else{
                                                    res.status(200).send({result:result});
                                                  }
                                                }
                                              }
                                            }
                                          }else{
                                            if(userResult.favouriteAdds.length>0){
                                              userResult.favouriteAdds.forEach(function(p,pl,l){
                                                if(p+"" == result._id+""){
                                                  result.isFavourite = true;
                                                }
                                                if(pl == l.length-1){
                                                  res.status(200).send({result:result});
                                                }
                                              })
                                            }else{
                                              res.status(200).send({result:result});
                                            }
                                          }

                                        }
                                      })
                                    }else{
                                      if(distanceLat!=''){
                                        if(result.location!=null && result.location!=undefined){
                                          console.log("1");
                                          if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                                            result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                            console.log("Distance : ***************",result.distance);

                                            console.log("2");
                                            if(parseFloat(result.distance)<0){
                                              result.distance = (result.distance)*(-1);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }else{
                                              console.log("3");
                                              console.log(result.distance);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }
                                            console.log("4");
                                          }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                                            console.log("5");
                                            result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                            console.log("Distance : ***************",result.distance);

                                            if(parseFloat(result.distance)<0){
                                              result.distance = (result.distance)*(-1);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }else{
                                              result.distance = result.distance;
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }
                                          }
                                        }
                                      }else{
                                        if(userResult.favouriteAdds.length>0){
                                          userResult.favouriteAdds.forEach(function(p,pl,l){
                                            if(p+"" == result._id+""){
                                              result.isFavourite = true;
                                            }
                                            if(pl == l.length-1){
                                              res.status(200).send({result:result});
                                            }
                                          })
                                        }else{
                                          res.status(200).send({result:result});
                                        }
                                      }
                                    }
                                  }
                                })
                              }else{ //user currency is not equal to USD
                                if(result.offers.length>0){

                                  result.offers.forEach(function(i,idx,x){
                                    if(i.user_id == params.user_id || result.user_id._id == params.user_id){
                                      myOffers[count] = result.offers[idx];
                                      count = count+1;
                                    }
                                    if(idx == x.length-1){
                                      result.offers = myOffers;
                                      if(distanceLat!=''){
                                        if(result.location!=null && result.location!=undefined){
                                          console.log("1");
                                          if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                                            result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                            console.log("Distance : ***************",result.distance);

                                            console.log("2");
                                            if(parseFloat(result.distance)<0){
                                              result.distance = (result.distance)*(-1);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }else{
                                              console.log("3");
                                              console.log(result.distance);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }
                                            console.log("4");
                                          }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                                            console.log("5");
                                            result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                            console.log("Distance : ***************",result.distance);
                                            if(parseFloat(result.distance)<0){
                                              result.distance = (result.distance)*(-1);
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }else{
                                              result.distance = result.distance;
                                              if(userResult.favouriteAdds.length>0){
                                                userResult.favouriteAdds.forEach(function(p,pl,l){
                                                  if(p+"" == result._id+""){
                                                    result.isFavourite = true;
                                                  }
                                                  if(pl == l.length-1){
                                                    res.status(200).send({result:result});
                                                  }
                                                })
                                              }else{
                                                res.status(200).send({result:result});
                                              }
                                            }
                                          }
                                        }
                                      }else{
                                        if(userResult.favouriteAdds.length>0){
                                          userResult.favouriteAdds.forEach(function(p,pl,l){
                                            if(p+"" == result._id+""){
                                              result.isFavourite = true;
                                            }
                                            if(pl == l.length-1){
                                              res.status(200).send({result:result});
                                            }
                                          })
                                        }else{
                                          res.status(200).send({result:result});
                                        }
                                      }
                                    }
                                  })
                                }else{
                                  if(distanceLat!=''){
                                    if(result.location!=null && result.location!=undefined){
                                      console.log("1");
                                      if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                                        result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                        console.log("Distance : ***************",result.distance);

                                        console.log("2");
                                        if(parseFloat(result.distance)<0){
                                          result.distance = (result.distance)*(-1);
                                          if(userResult.favouriteAdds.length>0){
                                            userResult.favouriteAdds.forEach(function(p,pl,l){
                                              if(p+"" == result._id+""){
                                                result.isFavourite = true;
                                              }
                                              if(pl == l.length-1){
                                                res.status(200).send({result:result});
                                              }
                                            })
                                          }else{
                                            res.status(200).send({result:result});
                                          }
                                        }else{
                                          console.log("3");
                                          console.log(result.distance);
                                          if(userResult.favouriteAdds.length>0){
                                            userResult.favouriteAdds.forEach(function(p,pl,l){
                                              if(p+"" == result._id+""){
                                                result.isFavourite = true;
                                              }
                                              if(pl == l.length-1){
                                                res.status(200).send({result:result});
                                              }
                                            })
                                          }else{
                                            res.status(200).send({result:result});
                                          }
                                        }
                                        console.log("4");
                                      }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                                        console.log("5");
                                        result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                        console.log("Distance : ***************",result.distance);
                                        if(parseFloat(result.distance)<0){
                                          result.distance = (result.distance)*(-1);
                                          if(userResult.favouriteAdds.length>0){
                                            userResult.favouriteAdds.forEach(function(p,pl,l){
                                              if(p+"" == result._id+""){
                                                result.isFavourite = true;
                                              }
                                              if(pl == l.length-1){
                                                res.status(200).send({result:result});
                                              }
                                            })
                                          }else{
                                            res.status(200).send({result:result});
                                          }
                                        }else{
                                          result.distance = result.distance;
                                          if(userResult.favouriteAdds.length>0){
                                            userResult.favouriteAdds.forEach(function(p,pl,l){
                                              if(p+"" == result._id+""){
                                                result.isFavourite = true;
                                              }
                                              if(pl == l.length-1){
                                                res.status(200).send({result:result});
                                              }
                                            })
                                          }else{
                                            res.status(200).send({result:result});
                                          }
                                        }
                                      }
                                    }
                                  }else{
                                    if(userResult.favouriteAdds.length>0){
                                      userResult.favouriteAdds.forEach(function(p,pl,l){
                                        if(p+"" == result._id+""){
                                          result.isFavourite = true;
                                        }
                                        if(pl == l.length-1){
                                          res.status(200).send({result:result});
                                        }
                                      })
                                    }else{
                                      res.status(200).send({result:result});
                                    }
                                  }
                                }
                              }
                            }else{
                              res.status(404).send({message : "user or advertisement not found"})
                            }
                          }
                        })


                      }else{
                        console.log("2")
                        Advertisement.findOne({_id:params.advert_id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").select("-offers").exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(distanceLat!=''){
                              if(result.location!=null && result.location!=undefined){
                                console.log("1");
                                if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])>distanceLat){
                                  result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                  console.log("Distance : ***************",result.distance);

                                  console.log("2");
                                  if(parseFloat(result.distance)<0){
                                    result.distance = (result.distance)*(-1);
                                    res.status(200).send({result:result});
                                  }else{
                                    console.log("3");
                                    console.log(result.distance);
                                    res.status(200).send({result:result});
                                  }
                                  console.log("4");
                                }else if(result.location[0] !=null && result.location[0] !=undefined && parseFloat(result.location[0])<distanceLat){
                                  console.log("5");
                                  result.distance =   ((parseFloat(result.location[0] - distanceLat))*111)*1.69;
                                  if(parseFloat(result.distance)<0){
                                    result.distance = (result.distance)*(-1);
                                    res.status(200).send({result:result});
                                  }else{
                                    result.distance = result.distance;
                                    res.status(200).send({result:result});
                                  }
                                }
                              }
                            }else{
                              res.status(200).send({result:result});
                            }
                          }
                        })
                      }
                    }
                  })
                }else{
                  res.status(403).send({message:"advert_id required"});
                }
              }

              exports.getMyAddsOffers = function(req,res){
                var params = req.body;
                if(params.status!=null && params.status!=undefined && params.status!=''){
                  Advertisement.find({user_id:req.user._id,offers: { $exists: true, $ne: [] },status:params.status,visible:true}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort({updatedAt:-1}).exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(result){
                        var sortedOffers = [];
                        if(req.user.currency !='USD'){
                          console.log("step 7");
                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              var count = 0;
                              result.forEach(function(i,idx,x){
                                offer.find({advert_id:i._id,visible:true}).populate("user_id").sort({updatedAt:-1}).exec(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    if(done.length>0){
                                      done.forEach(function(j,jdy,y){
                                        done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].price)).toFixed(2);
                                        result[count].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[count].price)).toFixed(2);
                                        count = count+1;
                                        if(jdy==y.length-1){
                                          result[count]['offers'] = done;
                                          if(idx == x.length-1){
                                            setTimeout(function() {
                                              res.status(200).send({result:result});
                                            }, 2000);
                                          }
                                        }
                                      })
                                    }else{
                                      if(idx == x.length-1){
                                        setTimeout(function() {
                                          res.status(200).send({result:result});
                                        }, 2000);
                                      }
                                    }
                                  }
                                })
                              })
                            }
                          })
                        }else{ //user currency equal to USD
                          result.forEach(function(i,idx,x){
                            offer.find({advert_id:i._id,visible:true}).populate("user_id").sort({updatedAt:-1}).exec(function(error,done){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                result[idx]['offers'] = done;
                                if(idx == x.length-1){
                                  setTimeout(function() {
                                    res.status(200).send({result:result});
                                  }, 2000);
                                }
                              }
                            })
                          })
                        }
                      }else{
                        res.status(404).send({message:"Advertisement not found."});
                      }
                    }
                  })
                }else{
                  Advertisement.find({user_id:req.user._id,visible:true,offers: { $exists: true, $ne: [] },status:{$ne:'rejected'}}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort({updatedAt:-1}).exec(function(error,result){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(result.length>0){
                        console.log("user currency : ",req.user.currency);
                        if(req.user.currency !='USD'){
                          console.log("step 7");
                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              result.forEach(function(i,idx,x){
                                result[idx].price = parseFloat(i.price)*parseFloat(currencyResult.valueInUSD);
                                offer.find({advert_id:i._id,visible:true}).populate("user_id").sort({updatedAt:-1}).exec(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    done.forEach(function(j,jdy,y){
                                      if(process.env.DEBUG_LOGS == 'true' || process.env.DEBUG_LOGS == true){
                                        console.log("before : ",result[idx].price);
                                      }
                                      done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                      //  result[idx].price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[idx].price)).toFixed(2);
                                      if(process.env.DEBUG_LOGS == 'true' || process.env.DEBUG_LOGS == true){
                                        console.log("after : ",result[idx].price);
                                      }
                                      if(jdy==y.length-1){
                                        result[idx]['offers'] = done;
                                        if(idx == x.length-1){
                                          setTimeout(function() {
                                            res.status(200).send({result:result});
                                          }, 2000);
                                        }
                                      }
                                    })
                                  }
                                })
                              })
                            }
                          })
                        }else{ //user currency equal to USD
                          result.forEach(function(i,idx,x){
                            offer.find({advert_id:i._id , visible:true}).populate("user_id").sort({updatedAt:-1}).exec(function(error,done){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                result[idx]['offers'] = done;
                                if(idx == x.length-1){
                                  setTimeout(function() {
                                    res.status(200).send({result:result});
                                  }, 2000);
                                }
                              }
                            })
                          })
                        }
                      }else{
                        res.status(404).send({message:"Advertisement not found."});
                      }
                    }
                  })
                }
              }

              exports.removeMyCreatedOffer = function(req,res){
                var params= req.body;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("request : ",params);
                }
                if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                  if(params.offer_id!=null && params.offer_id!=undefined && params.offer_id!=''){
                    Advertisement.update(
                      {_id:params.advert_id },
                      { $pull: { offers: params.offer_id } },
                      { multi: false }
                    ).then(function(result){
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log(result);
                      }
                      Advertisement.find({ offers: { $in: [req.user._id] } }).exec(function(error,done){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          offer.findOne({_id:params.offer_id}).exec(function(error,donId){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              donId.status = 'rejected';
                              donId.sort = 5;
                              donId.save(function(error,completed){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  res.status(200).send({message:"Offer removed successfully",result:done});
                                }
                              })
                            }
                          })
                        }
                      })
                    })
                  }else{
                    res.status(403).send({message:"offer_id required"});
                  }
                }else{
                  res.stauts(403).send({message:"advert_id required"});
                }
              }


              exports.getAllOffersCreatedBySelf = function(req,res){
                offer.find({ user_id:req.user._id,visible:true }).populate("user_id advert_id").sort({updatedAt:-1}).exec(function(error,done){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(done.length>0){
                      var sortedOffers = [];
                      var count = 0;
                      done.forEach(function(i,idx,x){
                        User.findOne({_id:i.advert_id.user_id}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            done[idx].advert_id.user_id = result;
                            console.log("Status : ",done[idx]['status']);
                            if(idx == x.length-1){
                              //  console.log("User populated response :",done);
                              if(req.user.currency !='USD'){  //currency value of user is not USD
                                curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    done.forEach(function(j,jdy,y){
                                      done[jdy].offered_price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].offered_price)).toFixed(2);
                                      done[jdy].advert_id.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(done[jdy].advert_id.price)).toFixed(2);
                                      Advertisement.findOne({_id:j.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition").exec(function(error,advertResult){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          advertResult.price = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(advertResult.price)).toFixed(2);
                                          done[jdy].advert_id = advertResult;
                                        }
                                      })
                                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                        console.log("prices : ",done[jdy].offered_price,done[jdy].advert_id.price);
                                      }
                                      if(jdy == y.length-1){
                                        setTimeout(function() {
                                          res.status(200).send({result:done});
                                        }, 2000);
                                      }
                                    })
                                  }
                                })
                              }else{ //user currency is equal to USD
                                done.forEach(function(j,jdy,y){
                                  Advertisement.findOne({_id:j.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,advertResult){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      done[jdy].advert_id = advertResult;
                                    }
                                  })
                                  if(jdy == y.length-1){
                                    setTimeout(function() {
                                      res.status(200).send({result:done});
                                    }, 2000);
                                  }
                                })
                              }
                            }
                          }
                        })
                      })
                    }else{
                      res.status(200).send({result:done});
                    }
                  }
                })
              }

              exports.updateOfferCreatedBySelf = function(req,res){
                var params = req.body;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("Request :",params);
                }
                if(params.offer_id!=null && params.offer_id!=undefined && params.offer_id!=''){
                  offer.findOne({user_id:req.user._id,_id:params.offer_id}).populate("advert_id").exec(function(error,result){
                    if(error){
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log("Error :",error);
                      }
                      res.status(500).send({error:error});
                    }else{
                      if(result){
                        if(result.status == "pending"){
                          if(req.user.currency !='USD'){  //currency value of user is not USD
                            curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                result.offered_price = parseFloat(params.offered_price)/parseFloat(currencyResult.valueInUSD);
                                result.updatedAt = Date.now();
                                result.readStatus = false;
                                result.save(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    var messageNotification = "You have an updated offer, Please check.";
                                    var urlRequest = { method: 'POST',
                                    url: process.env.url+"/testnotification/" + result.advert_id.user_id + "/" + messageNotification,
                                    headers:
                                    { 'content-type': 'application/x-www-form-urlencoded',
                                    'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                    'cache-control': 'no-cache' } }
                                    request(urlRequest, function (error, response, body) {
                                      offer.findOne({_id:params.offer_id}).populate("user_id sail_id").exec(function(error,offeredResult){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          Advertisement.findOne({_id:offeredResult.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,resultFinal){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              offeredResult.advert_id = resultFinal;
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("Response data  :",offeredResult);
                                              }
                                              // var user11 = ""+req.user._id;
                                              // var user22 = ""+resultFinal.user_id._id;
                                              // var comparison = user11.localeCompare(user22);
                                              // if (comparison > 0) {
                                              //   chatId = user11 + user22 + resultFinal._id;
                                              // } else {
                                              //   chatId = user22 + user11 + resultFinal._id;
                                              // }
                                              // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" updated offer to "+Number(parseFloat(offeredResult.offered_price)*parseFloat(currencyResult.valueInUSD)).toFixed(2)+ " "+req.user.currency ,advert_id:resultFinal._id })
                                              // .save(function (error, resultchat) {
                                              offeredResult.offered_price = parseFloat(offeredResult.offered_price)*parseFloat(currencyResult.valueInUSD)
                                              res.status(200).send({message:"Offer updated successfully",result:offeredResult});
                                              //    })
                                            }
                                          })
                                        }
                                      })
                                    });
                                    //  res.status(200).send({message:"Offer updated successfully.",result:result});
                                  }
                                })
                              }
                            })
                          }else{
                            result.offered_price = params.offered_price;
                            result.updatedAt = Date.now();
                            result.readStatus = false;
                            result.save(function(error,done){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                var messageNotification = "You have an updated offer, Please check.";
                                var urlRequest = { method: 'POST',
                                url: process.env.url+"/testnotification/" + result.advert_id.user_id + "/" + messageNotification,
                                headers:
                                { 'content-type': 'application/x-www-form-urlencoded',
                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                'cache-control': 'no-cache' } }
                                request(urlRequest, function (error, response, body) {
                                  // var user11 = ""+req.user._id;
                                  // var user22 = ""+result.advert_id.user_id;
                                  // var comparison = user11.localeCompare(user22);
                                  // if (comparison > 0) {
                                  //   chatId = user11 + user22 + result.advert_id._id;
                                  // } else {
                                  //   chatId = user22 + user11 + result.advert_id._id;
                                  // }
                                  // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" updated offer to "+Number(parseFloat(result.offered_price)).toFixed(2)+ " USD." ,advert_id:result.advert_id._id })
                                  // .save(function (error, resultchat) {
                                  res.status(200).send({message:"Offer updated successfully",result:result});
                                  //  })
                                });
                              }
                            })
                          }

                        }else if(result.status == 'counter'){
                          if(req.user.currency !='USD'){  //currency value of user is not USD
                            curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                result.status = 're-counter';
                                result.sort = 3;
                                result.updatedAt = Date.now();
                                result.readStatus = false;
                                result.offered_price = Number(parseFloat(params.offered_price)/parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                result.save(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    var messageNotification = "You have a counter offer, Please check your offer section.";
                                    var urlRequest = { method: 'POST',
                                    url: process.env.url+"/testnotification/" + result.advert_id.user_id + "/" + messageNotification,
                                    headers:
                                    { 'content-type': 'application/x-www-form-urlencoded',
                                    'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                    'cache-control': 'no-cache' } }
                                    request(urlRequest, function (error, response, body) {
                                      offer.findOne({_id:params.offer_id}).populate("user_id advert_id sail_id").exec(function(error,offeredResult){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          Advertisement.findOne({_id:offeredResult.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,resultFinal){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              resultFinal.price = parseFloat(resultFinal.price)*parseFloat(currencyResult.valueInUSD);
                                              offeredResult.advert_id = resultFinal;
                                              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                console.log("Response data  :",offeredResult);
                                              }
                                              // var user11 = ""+req.user._id;
                                              // var user22 = ""+resultFinal.user_id._id;
                                              // var comparison = user11.localeCompare(user22);
                                              // if (comparison > 0) {
                                              //   chatId = user11 + user22 + resultFinal._id;
                                              // } else {
                                              //   chatId = user22 + user11 + resultFinal._id;
                                              // }
                                              // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" created a re-counter offer of "+Number(parseFloat(result.offered_price)*parseFloat(currencyResult.valueInUSD)).toFixed(2)+ " "+req.user.currency  ,advert_id:resultFinal._id })
                                              // .save(function (error, resultchat) {
                                              offeredResult.offered_price = Number(parseFloat(params.offered_price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                              res.status(200).send({message:"Offer updated successfully",result:offeredResult});
                                              // })
                                            }
                                          })
                                        }
                                      })
                                    });
                                    //  res.status(200).send({message:"Offer updated successfully.",result:result});
                                  }
                                })
                              }
                            })
                          }else{ //user currency is equal to USD
                            result.status = 're-counter';
                            result.sort = 3;
                            result.updatedAt = Date.now();
                            result.readStatus = false;
                            result.offered_price = params.offered_price;
                            result.save(function(error,done){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                var messageNotification = "You have an updated offer, Please check.";
                                var urlRequest = { method: 'POST',
                                url: process.env.url+"/testnotification/" + result.advert_id.user_id + "/" + messageNotification,
                                headers:
                                { 'content-type': 'application/x-www-form-urlencoded',
                                'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                'cache-control': 'no-cache' } }
                                request(urlRequest, function (error, response, body) {
                                  offer.findOne({_id:params.offer_id}).populate("user_id sail_id").exec(function(error,offeredResult){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      Advertisement.findOne({_id:offeredResult.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,resultFinal){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          offeredResult.advert_id = resultFinal;
                                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                            console.log("Response data  :",offeredResult);
                                          }
                                          // var user11 = ""+req.user._id;
                                          // var user22 = ""+resultFinal.user_id._id;
                                          // var comparison = user11.localeCompare(user22);
                                          // if (comparison > 0) {
                                          //   chatId = user11 + user22 + resultFinal._id;
                                          // } else {
                                          //   chatId = user22 + user11 + resultFinal._id;
                                          // }
                                          // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" created a re-counter offer of "+Number(parseFloat(result.offered_price)).toFixed(2)+ " USD." ,advert_id:resultFinal._id })
                                          // .save(function (error, resultchat) {
                                          res.status(200).send({message:"Offer updated successfully",result:offeredResult});
                                          // })
                                        }
                                      })
                                    }
                                  })
                                });
                              }
                            })
                          }
                        }else{
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Here i am  ****** : ","Offer status is other than pending, so you cant update this offer");
                          }
                          res.status(403).send({message:"Offer status is other than pending, so you cant update this offer"});
                        }
                      }else{
                        res.status(404).send({message:"Offer not found"});
                      }
                    }
                  })
                }else{
                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("Here i am  ****** : ","offer_id required");
                  }
                  res.status(403).send({message:"offer_id required"});
                }
              }

              exports.totalAds = function(req,res){
                var userId = '';
                req.body.visible = true;
                var limit = 10;
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("Request: ",req.body);
                }
                if(req.body.web == true){
                  limit = 999
                  delete req.body.web;
                }else{
                  limit = 10;
                }
                if(req.body.user_id!=null && req.body.user_id!=undefined && req.body.user_id!=''){
                  userId = req.body.user_id;
                  delete req.body.user_id;
                }
                var skips = 0;
                if(req.body.skip !=null && req.body.skip !=undefined && req.body.skip !=''){
                  skips = parseInt(req.body.skip);
                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("value for variable skips :"+parseInt(skips)+"----",skips);
                  }
                  delete req.body.skip;
                }else{
                  skips = 0;
                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("value not updated at skips");
                  }
                }
                if(req.body.keyword!=null && req.body.keyword!=undefined && req.body.keyword!=''){
                  var ms ={};
                  var kw = req.body.keyword;
                  ms.DeviceName={ '$regex' : kw.toLowerCase(), '$options' : 'i' };
                  ms.description={ '$regex' : kw.toLowerCase(), '$options' : 'i' };
                  delete req.body.keyword;
                  mobile.find({$or:[
                    {DeviceName:{ '$regex' : kw.toLowerCase(), '$options' : 'i' }},
                    {description: { '$regex' : kw.toLowerCase(), '$options' : 'i' }}
                  ]
                }).exec(function(error,keyResult){
                  if(error){
                    console.log(error);
                    res.status(500).send({error:error});
                  }else{
                    //  console.log(keyResult.length);
                    var myArray = [];
                    if(keyResult.length>0){  // keyword result length  > 0
                      keyResult.forEach(function(k,kdx,y){
                        myArray[kdx] = k['_id'];
                        if(kdx == y.length-1){
                          var params = req.body;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log(myArray.length);
                          }
                          params['deviceDetails'] = { $in :myArray};
                          delete  req.body.keyword;

                          params.sold = false;
                          for (var i in params) {
                            if (params[i] == "") {
                              delete params[i];
                            }
                          }
                          params.payment = false;
                          if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                            params.$and = [
                              { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                              { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                            ];
                            delete params.lengthEnd;
                            delete params.lengthStart;
                            delete params.widthEnd;
                            delete params.widthStart;
                          }
                          // if(params.priceEnd!=null && params.priceEnd!=undefined  && params.priceStart!=null && params.priceStart!=undefined){
                          //   if(parseInt(params.priceEnd)<=0 || params.priceEnd=='0' || parseInt(params.priceEnd) <= 0){
                          //     params.price = {$gt: parseInt(params.priceStart) }
                          //   }else{
                          //     if(parseInt(params.priceStart) < parseInt(params.priceEnd)){
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceEnd), $gt: parseInt(params.priceStart) }
                          //       }
                          //     }else{
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceStart), $gt: parseInt(params.priceEnd) }
                          //       }
                          //
                          //     }
                          //     console.log("Price **********",params.price);
                          //   }
                          // }else if(params.priceStart==undefined || params.priceStart==null){
                          //   if(params.priceEnd!='0' && params.priceEnd!=0){
                          //   params.price = {  $lte: parseFloat(params.priceEnd) }
                          // }
                          //   //    console.log("Params.priceStart",params.priceStart,"params.priceEnd",params.priceEnd)
                          // }else if(params.priceEnd==undefined || params.priceEnd==null){
                          //   if(params.priceStart!='0' && params.priceStart!=0 ){
                          //   params.price = {  $gte: parseFloat(params.priceStart) }
                          // }
                          // }
                          if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!='' && params.priceStart!='0' && params.priceStart!=0 && !isNaN(params.priceStart)){
                            if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!='' && params.priceEnd!='0' && params.priceEnd!=0 && !isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd), $gte: parseFloat(params.priceStart) }
                            }else{ // price end null or undefined
                              params.price = { $gte: parseFloat(params.priceStart) }
                            }
                          }else{ // price start null or undefined
                            if(!isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd) }
                            }
                          }
                          delete params.priceEnd;
                          delete params.priceStart;
                          if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''){
                            if(parseInt(params.ageEnd) == parseInt(params.ageStart)){
                              params.age = parseInt(params.ageStart);
                            }else{
                              params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            }
                            // if(parseInt(params.ageEnd)<1 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                            //   params.age = {$gte: parseInt(params.ageStart) }
                            // }else{
                            //   if(parseInt(params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            //     params.ageStart = 0;
                            //   }
                            //   if(parseInt(params.ageEnd)>parseInt(params.ageStart)){
                            //     params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            //   }else{
                            //     params.age = { $lte: parseInt(params.ageStart), $gte: parseInt(params.ageEnd) }
                            //   }
                            // }
                          }else if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && (params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            params.age = { $lte: parseInt(params.ageEnd)}
                          }else if(params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''  && (params.ageEnd==null || params.ageEnd==undefined || params.ageEnd=='')){
                            params.age = { $gte: parseInt(params.ageStart)}
                          }else if(parseInt(params.ageStart) == parseInt(params.ageEnd)){
                            params.age = parseInt(params.ageStart);
                          }
                          // if(params.ageStart!=null && params.ageEnd!=undefined  && params.ageStart!=null && params.ageStart!=undefined){
                          //   if(parseFloat(params.ageEnd)<=0 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                          //     params.age = {$gt: parseFloat(params.ageStart) }
                          //   }else{
                          //     params.age = { $lt: parseFloat(params.ageEnd), $gt: parseFloat(params.ageStart) }
                          //   }
                          // }
                          delete params.ageStart;
                          delete params.ageEnd;
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            var colorArray = params.color.split(',');
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            var brandArray = params.brandName.split(',');
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            var storageArray = params.storage.split(',');
                          }
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            params.color = { $in: colorArray  };
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            params.brandName = { $in: brandArray };
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            params.storage = {  $in: storageArray };
                          }
                          if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                            distance = parseFloat(params.distance)/111;
                            params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                            // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                            // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                            delete params.distance;
                            delete params.lng;
                            delete params.lat;
                          }
                          delete params.lng;
                          delete params.lat;
                          delete params.distance;
                          //  console.log("Request :",params);
                          if(params.rectangle == true){
                            if(params.pointOneLat != null && params.pointOneLat != undefined && params.pointOneLat != ''){
                              if(params.pointTwoLat != null && params.pointTwoLat != undefined && params.pointTwoLat != ''){
                                if(params.pointThreeLat != null && params.pointThreeLat != undefined && params.pointThreeLat != ''){
                                  if(params.pointFourLat != null && params.pointFourLat != undefined && params.pointFourLat != ''){
                                    Advertisement.find({ $and: [ {
                                      "location.0":{
                                        '$lte': parseInt(params.pointOneLng)
                                      },
                                      "location.1":{
                                        '$lte': parseInt(params.pointOneLat)
                                      } },{
                                        "location.0":{
                                          '$gte': parseInt(params.pointFourLng)
                                        },
                                        "location.1":{
                                          '$gte': parseInt(params.pointFourLat)
                                        } } ] }).exec(function(error,result){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(result.length>0){
                                              var loc = [];
                                              delete params.pointOneLat;
                                              delete params.pointTwoLat;
                                              delete params.pointThreeLat;
                                              delete params.pointFourLat;
                                              delete params.pointOneLng;
                                              delete params.pointTwoLng;
                                              delete params.pointThreeLng;
                                              delete params.pointFourLng;
                                              //          console.log("locationresult true :",result.length);
                                              result.forEach(function(l,ldx,locationResult){
                                                loc[ldx] = l._id;
                                                if(ldx==locationResult.length-1){
                                                  params._id = loc;
                                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                                    console.log("Skips : ",parseInt(skips)*10);
                                                  }
                                                  delete params.rectangle;
                                                  Advertisement.find(params).exec(function(error,result){
                                                    if(error){
                                                      console.log("Error",error);
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      if(result.length>0){
                                                        if(userId!=''){
                                                          User.findOne({_id:userId}).exec(function(error,userResult){
                                                            if(error){
                                                              res.status(500).send({message:"find user error",error:error});
                                                            }else{
                                                              var fav = [];
                                                              if(userResult){
                                                                if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                                                }else{
                                                                  distanceLat = userResult.location[0];
                                                                }
                                                                var fav = userResult.favouriteAdds;
                                                              }
                                                              if(fav.length>0){
                                                                result.forEach(function(i,idx,x){
                                                                  fav.forEach(function(j,jdy,y){
                                                                    var z =""+i._id;
                                                                    var p = ""+j;
                                                                    if(z==p){
                                                                      i.isFavourite = true;
                                                                    }
                                                                    if(jdy==y.length-1){
                                                                      if(idx==x.length-1){
                                                                        res.status(200).send({result:result.length});
                                                                      }
                                                                    }
                                                                  })
                                                                })
                                                              }else{
                                                                res.status(200).send({result:result.length});
                                                              }
                                                            }
                                                          })
                                                        }else{
                                                          res.status(200).send({result:result.length});
                                                        }
                                                      }else{
                                                        res.status(404).send({message:"no advertisements found"});
                                                      }
                                                    }
                                                  })
                                                }
                                              })
                                            }else{
                                              res.status(404).send({result:result.length});
                                            }
                                          }
                                        })
                                      }else{
                                        res.status(403).send({message:"Point four required"});
                                      }
                                    }else{
                                      res.status(403).send({message:"Point Three required"});
                                    }
                                  }else{
                                    res.status(403).send({message:"Point two required"});
                                  }
                                }else{
                                  res.status(403).send({message:"Point one required"});
                                }
                              }else{
                                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                  console.log("Skips : ",parseInt(skips)*10);
                                }
                                delete params.rectangle;
                                Advertisement.find(params).exec(function(error,result){
                                  if(error){
                                    console.log("Error",error);
                                    res.status(500).send({error:error});
                                  }else{
                                    if(result.length>0){
                                      if(userId!=''){
                                        User.findOne({_id:userId}).exec(function(error,userResult){
                                          if(error){
                                            res.status(500).send({message:"find user error",error:error});
                                          }else{
                                            var fav = [];
                                            if(userResult){
                                              if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){
                                              }else{
                                                distanceLat = userResult.location[0];
                                              }
                                              var fav = userResult.favouriteAdds;
                                            }
                                            if(fav.length>0){
                                              result.forEach(function(i,idx,x){
                                                fav.forEach(function(j,jdy,y){
                                                  var z =""+i._id;
                                                  var p = ""+j;
                                                  if(z==p){
                                                    i.isFavourite = true;
                                                  }
                                                  if(jdy==y.length-1){
                                                    if(idx==x.length-1){
                                                      res.status(200).send({result:result.length});
                                                    }
                                                  }
                                                })
                                              })
                                            }else{
                                              res.status(200).send({result:result.length});
                                            }
                                          }
                                        })
                                      }else{
                                        res.status(200).send({result:result.length});
                                      }
                                    }else{
                                      res.status(404).send({message:"no advertisements found"});
                                    }
                                  }
                                })
                              }
                            }
                          })
                        }else{ // keyword result length == 0
                          delete req.body.keyword;
                          var params = req.body;
                          params.sold = false;
                          for (var i in params) {
                            if (params[i] == "") {
                              delete params[i];
                            }
                          }
                          params.payment = false;
                          var skips;
                          if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                            params.$and = [
                              { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                              { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                            ];
                            delete params.lengthEnd;
                            delete params.lengthStart;
                            delete params.widthEnd;
                            delete params.widthStart;
                          }
                          // if(params.priceEnd!=null && params.priceEnd!=undefined  && params.priceStart!=null && params.priceStart!=undefined){
                          //   if(parseInt(params.priceEnd)<=0 || params.priceEnd=='0' || parseInt(params.priceEnd) <= 0){
                          //     params.price = {$gt: parseInt(params.priceStart) }
                          //   }else{
                          //     if(parseInt(params.priceStart) < parseInt(params.priceEnd)){
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceEnd), $gt: parseInt(params.priceStart) }
                          //       }
                          //     }else{
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceStart), $gt: parseInt(params.priceEnd) }
                          //       }
                          //
                          //     }
                          //     console.log("Price **********",params.price);
                          //   }
                          // }else if(params.priceStart==undefined || params.priceStart==null){
                          //   if(params.priceEnd!='0' && params.priceEnd!=0){
                          //   params.price = {  $lte: parseFloat(params.priceEnd) }
                          // }
                          //   //    console.log("Params.priceStart",params.priceStart,"params.priceEnd",params.priceEnd)
                          // }else if(params.priceEnd==undefined || params.priceEnd==null){
                          //   if(params.priceStart!='0' && params.priceStart!=0 ){
                          //   params.price = {  $gte: parseFloat(params.priceStart) }
                          // }
                          // }
                          if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!='' && params.priceStart!='0' && params.priceStart!=0 && !isNaN(params.priceStart)){
                            if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!='' && params.priceEnd!='0' && params.priceEnd!=0 && !isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd), $gte: parseFloat(params.priceStart) }
                            }else{ // price end null or undefined
                              params.price = { $gte: parseFloat(params.priceStart) }
                            }
                          }else{ // price start null or undefined
                            if(!isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd) }
                            }
                          }
                          delete params.priceEnd;
                          delete params.priceStart;
                          if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''){
                            if(parseInt(params.ageEnd) == parseInt(params.ageStart)){
                              params.age = parseInt(params.ageStart);
                            }else{
                              params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            }
                            // if(parseInt(params.ageEnd)<1 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                            //   params.age = {$gte: parseInt(params.ageStart) }
                            // }else{
                            //   if(parseInt(params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            //     params.ageStart = 0;
                            //   }
                            //   if(parseInt(params.ageEnd)>parseInt(params.ageStart)){
                            //     params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            //   }else{
                            //     params.age = { $lte: parseInt(params.ageStart), $gte: parseInt(params.ageEnd) }
                            //   }
                            // }
                          }else if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && (params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            params.age = { $lte: parseInt(params.ageEnd)}
                          }else if(params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''  && (params.ageEnd==null || params.ageEnd==undefined || params.ageEnd=='')){
                            params.age = { $gte: parseInt(params.ageStart)}
                          }else if(parseInt(params.ageStart) == parseInt(params.ageEnd)){
                            params.age = parseInt(params.ageStart);
                          }
                          // if(params.ageStart!=null && params.ageEnd!=undefined  && params.ageStart!=null && params.ageStart!=undefined){
                          //   if(parseFloat(params.ageEnd)<=0 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                          //     params.age = {$gt: parseFloat(params.ageStart) }
                          //   }else{
                          //     params.age = { $lt: parseFloat(params.ageEnd), $gt: parseFloat(params.ageStart) }
                          //   }
                          // }
                          delete params.ageStart;
                          delete params.ageEnd;
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            var colorArray = params.color.split(',');
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            var brandArray = params.brandName.split(',');
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            var storageArray = params.storage.split(',');
                          }
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            params.color = { $in: colorArray  };
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            params.brandName = { $in: brandArray };
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            params.storage = {  $in: storageArray };
                          }
                          if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                            distance = parseFloat(params.distance)/111;
                            params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                            // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                            // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                            delete params.lng;
                            delete params.lat;
                          }
                          delete params.lng;
                          delete params.lat;
                          delete params.distance;
                          //  console.log("Request at length 01:",params);
                          delete params.pointOneLat;
                          delete params.pointTwoLat;
                          delete params.pointThreeLat;
                          delete params.pointFourLat;
                          delete params.pointOneLng;
                          delete params.pointTwoLng;
                          delete params.pointThreeLng;
                          delete params.pointFourLng;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Skips : ",parseInt(skips)*10)
                          }
                          delete params.rectangle;
                          Advertisement.find(params).exec(function(error,result){
                            if(error){
                              console.log("Error",error);
                              res.status(500).send({error:error});
                            }else{
                              if(result.length>0){
                                if(userId!=''){
                                  User.findOne({_id:userId}).exec(function(error,userResult){
                                    if(error){
                                      res.status(500).send({message:"find user error",error:error});
                                    }else{
                                      var fav = [];
                                      if(userResult){
                                        if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){
                                        }else{
                                          distanceLat = userResult.location[0];
                                        }
                                        var fav = userResult.favouriteAdds;
                                      }
                                      if(fav.length>0){
                                        result.forEach(function(i,idx,x){
                                          fav.forEach(function(j,jdy,y){
                                            var z =""+i._id;
                                            var p = ""+j;
                                            if(z==p){
                                              i.isFavourite = true;
                                            }
                                            if(jdy==y.length-1){
                                              if(idx==x.length-1){
                                                res.status(200).send({result:result.length});
                                              }
                                            }
                                          })
                                        })
                                      }else{
                                        res.status(200).send({result:result.length});
                                      }
                                    }
                                  })
                                }else{
                                  res.status(200).send({result:result.length});
                                }
                              }else{
                                res.status(404).send({message:"no advertisements found"});
                              }
                            }
                          })
                        }
                      }
                    })
                  }else{
                    // keyword is null or empty
                    delete req.body.keyword;
                    var params = req.body;
                    params.sold = false;
                    for (var i in params) {
                      if (params[i] == "") {
                        delete params[i];
                      }
                    }
                    if(params.rectangle == true || params.rectangle=="true"){ // rectangle true && keyword false
                      delete params.rectangle;
                      if(params.pointOneLat != null && params.pointOneLat != undefined && params.pointOneLat != ''){
                        if(params.pointTwoLat != null && params.pointTwoLat != undefined && params.pointTwoLat != ''){
                          if(params.pointThreeLat != null && params.pointThreeLat != undefined && params.pointThreeLat != ''){
                            if(params.pointFourLat != null && params.pointFourLat != undefined && params.pointFourLat != ''){
                              Advertisement.find({ $and: [ {
                                "location.0":{
                                  '$lte': parseInt(params.pointOneLng)
                                },
                                "location.1":{
                                  '$lte': parseInt(params.pointOneLat)
                                } },{
                                  "location.0":{
                                    '$gte': parseInt(params.pointFourLng)
                                  },
                                  "location.1":{
                                    '$gte': parseInt(params.pointFourLat)
                                  } } ] }).exec(function(error,result){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      if(result.length>0){
                                        var loc = [];
                                        delete params.pointOneLat;
                                        delete params.pointTwoLat;
                                        delete params.pointThreeLat;
                                        delete params.pointFourLat;
                                        delete params.pointOneLng;
                                        delete params.pointTwoLng;
                                        delete params.pointThreeLng;
                                        delete params.pointFourLng;
                                        result.forEach(function(l,ldx,locationResult){
                                          loc[ldx] = l._id;
                                          if(ldx==locationResult.length-1){
                                            params._id = loc;
                                            //     console.log("location search :",result.length);
                                            params.payment = false;

                                            if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                                              params.$and = [
                                                { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                                                { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                                              ];
                                              delete params.lengthEnd;
                                              delete params.lengthStart;
                                              delete params.widthEnd;
                                              delete params.widthStart;
                                            }
                                            if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!='' && params.priceStart!='0' && params.priceStart!=0 && !isNaN(params.priceStart)){
                                              if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!='' && params.priceEnd!='0' && params.priceEnd!=0 && !isNaN(params.priceEnd)){
                                                params.price = { $lte: parseFloat(params.priceEnd), $gte: parseFloat(params.priceStart) }
                                              }else{ // price end null or undefined
                                                params.price = { $gte: parseFloat(params.priceStart) }
                                              }
                                            }else{ // price start null or undefined
                                              if(!isNaN(params.priceEnd)){
                                                params.price = { $lte: parseFloat(params.priceEnd) }
                                              }
                                            }
                                            delete params.priceEnd;
                                            delete params.priceStart;
                                            if(params.color !=null && params.color !=undefined && params.color !=''){
                                              var colorArray = params.color.split(',');
                                            }
                                            if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                                              var brandArray = params.brandName.split(',');
                                            }
                                            if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                                              var storageArray = params.storage.split(',');
                                            }
                                            if(params.color !=null && params.color !=undefined && params.color !=''){
                                              params.color = { $in: colorArray  };
                                            }
                                            if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                                              params.brandName = { $in: brandArray };
                                            }
                                            if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                                              params.storage = {  $in: storageArray };
                                            }
                                            if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                                              distance = parseFloat(params.distance)/111;
                                              params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                                              // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                                              // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                                              delete params.lng;
                                              delete params.lat;
                                            }
                                            delete params.lng;
                                            delete params.lat;
                                            delete params.distance;
                                            //   console.log("Request at length 02:",params);
                                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                              console.log("Skips : ",parseInt(skips)*10);
                                            }
                                            delete params.rectangle;
                                            Advertisement.find(params).exec(function(error,result){
                                              if(error){
                                                console.log("Error",error);
                                                res.status(500).send({error:error});
                                              }else{
                                                if(result.length>0){
                                                  if(userId!=''){
                                                    User.findOne({_id:userId}).exec(function(error,userResult){
                                                      if(error){
                                                        res.status(500).send({message:"find user error",error:error});
                                                      }else{
                                                        var fav = [];
                                                        if(userResult){
                                                          if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                                          }else{
                                                            distanceLat = userResult.location[0];
                                                          }
                                                          var fav = userResult.favouriteAdds;
                                                        }
                                                        if(fav.length>0){
                                                          result.forEach(function(i,idx,x){
                                                            fav.forEach(function(j,jdy,y){
                                                              var z =""+i._id;
                                                              var p = ""+j;
                                                              if(z==p){
                                                                i.isFavourite = true;
                                                              }
                                                              if(jdy==y.length-1){
                                                                if(idx==x.length-1){
                                                                  res.status(200).send({result:result.length});
                                                                }
                                                              }
                                                            })
                                                          })
                                                        }else{
                                                          res.status(200).send({result:result.length});
                                                        }
                                                      }
                                                    })
                                                  }else{
                                                    res.status(200).send({result:result.length});
                                                  }
                                                }else{
                                                  res.status(404).send({message:"no advertisements found"});
                                                }
                                              }
                                            })
                                          }
                                        })
                                      }else{
                                        res.status(404).send({result:result.length});
                                      }
                                    }
                                  })
                                }else{
                                  res.status(403).send({message:"Point four required"});
                                }
                              }else{
                                res.status(403).send({message:"Point Three required"});
                              }
                            }else{
                              res.status(403).send({message:"Point two required"});
                            }
                          }else{
                            res.status(403).send({message:"Point one required"});
                          }
                        }else{ //rectangle false && keyword false
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check1");
                          }
                          delete params.rectangle;
                          params.payment = false;

                          if(params.lengthEnd!=null && params.lengthEnd!=undefined && params.widthEnd!=null && params.widthEnd!=undefined && params.lengthStart!=null && params.lengthStart!=undefined && params.widthStart!=null && params.widthStart!=undefined){
                            params.$and = [
                              { $or : [ { length : null }, { length : { $lt: params.lengthEnd, $gt: params.lengthStart } } ] },
                              { $or : [ { width : null }, { width : { $lt: params.widthEnd, $gt: params.widthStart } } ] }
                            ];
                            delete params.lengthEnd;
                            delete params.lengthStart;
                            delete params.widthEnd;
                            delete params.widthStart;
                          }
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check2");
                          }
                          // if(params.priceEnd!=null && params.priceEnd!=undefined  && params.priceStart!=null && params.priceStart!=undefined){
                          //   if(parseInt(params.priceEnd)<=0 || params.priceEnd=='0' || parseInt(params.priceEnd) <= 0){
                          //     params.price = {$gt: parseInt(params.priceStart) }
                          //   }else{
                          //     if(parseInt(params.priceStart) < parseInt(params.priceEnd)){
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceEnd), $gt: parseInt(params.priceStart) }
                          //       }
                          //     }else{
                          //       if(params.priceStart!='0' && params.priceStart!=0 && params.priceEnd!='0' && params.priceEnd!=0){
                          //       params.price = { $lt: parseInt(params.priceStart), $gt: parseInt(params.priceEnd) }
                          //       }
                          //
                          //     }
                          //     console.log("Price **********",params.price);
                          //   }
                          // }else if(params.priceStart==undefined || params.priceStart==null){
                          //   if(params.priceEnd!='0' && params.priceEnd!=0){
                          //   params.price = {  $lte: parseFloat(params.priceEnd) }
                          // }
                          //   //    console.log("Params.priceStart",params.priceStart,"params.priceEnd",params.priceEnd)
                          // }else if(params.priceEnd==undefined || params.priceEnd==null){
                          //   if(params.priceStart!='0' && params.priceStart!=0 ){
                          //   params.price = {  $gte: parseFloat(params.priceStart) }
                          // }
                          // }
                          if(params.priceStart!=null && params.priceStart!=undefined && params.priceStart!='' && params.priceStart!='0' && params.priceStart!=0 && !isNaN(params.priceStart)){
                            if(params.priceEnd!=null && params.priceEnd!=undefined && params.priceEnd!='' && params.priceEnd!='0' && params.priceEnd!=0 && !isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd), $gte: parseFloat(params.priceStart) }
                            }else{ // price end null or undefined
                              params.price = { $gte: parseFloat(params.priceStart) }
                            }
                          }else{ // price start null or undefined
                            if(!isNaN(params.priceEnd)){
                              params.price = { $lte: parseFloat(params.priceEnd) }
                            }
                          }
                          delete params.priceEnd;
                          delete params.priceStart;
                          if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''){
                            if(parseInt(params.ageEnd) == parseInt(params.ageStart)){
                              params.age = parseInt(params.ageStart);
                            }else{
                              params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            }
                            // if(parseInt(params.ageEnd)<1 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                            //   params.age = {$gte: parseInt(params.ageStart) }
                            // }else{
                            //   if(parseInt(params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            //     params.ageStart = 0;
                            //   }
                            //   if(parseInt(params.ageEnd)>parseInt(params.ageStart)){
                            //     params.age = { $lte: parseInt(params.ageEnd), $gte: parseInt(params.ageStart) }
                            //   }else{
                            //     params.age = { $lte: parseInt(params.ageStart), $gte: parseInt(params.ageEnd) }
                            //   }
                            // }
                          }else if(params.ageEnd!=null && params.ageEnd!=undefined && params.ageEnd!=''  && (params.ageStart==null || params.ageStart==undefined || params.ageStart=='')){
                            params.age = { $lte: parseInt(params.ageEnd)}
                          }else if(params.ageStart!=null && params.ageStart!=undefined && params.ageStart!=''  && (params.ageEnd==null || params.ageEnd==undefined || params.ageEnd=='')){
                            params.age = { $gte: parseInt(params.ageStart)}
                          }else if(parseInt(params.ageStart) == parseInt(params.ageEnd)){
                            params.age = parseInt(params.ageStart);
                          }
                          // if(params.ageStart!=null && params.ageEnd!=undefined  && params.ageStart!=null && params.ageStart!=undefined){
                          //   if(parseFloat(params.ageEnd)<=0 || params.ageEnd=='0' || parseInt(params.ageEnd) <= 0){
                          //     params.age = {$gt: parseFloat(params.ageStart) }
                          //   }else{
                          //     params.age = { $lt: parseFloat(params.ageEnd), $gt: parseFloat(params.ageStart) }
                          //   }
                          // }
                          delete params.ageStart;
                          delete params.ageEnd;
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            var colorArray = params.color.split(',');
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            var brandArray = params.brandName.split(',');
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            var storageArray = params.storage.split(',');
                          }
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("check3");
                          }
                          if(params.color !=null && params.color !=undefined && params.color !=''){
                            params.color = { $in: colorArray  };
                          }
                          if(params.brandName !=null && params.brandName !=undefined && params.brandName !=''){
                            params.brandName = { $in: brandArray };
                          }
                          if(params.storage !=null && params.storage !=undefined && params.storage !=''){
                            params.storage = {  $in: storageArray };
                          }
                          if(params.lng!=null && params.lng!=undefined && params.lng!='' && params.lat!='' && params.lat!=null && params.lat!=undefined && params.distance!=null && params.distance!=undefined && params.lat!='0.0' && params.lng != '0.0'){
                            distance = parseFloat(params.distance)/111;
                            console.log("Distance calculated :",distance);
                            params.$and = [{"location.0":{'$lte': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance}},{"location.1":{'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance}}];
                            // params.location[0] = {'$lt': parseFloat(params.lng)+distance, '$gte':parseFloat(params.lng)-distance};
                            // params.location[1]= {'$lte': parseFloat(params.lat)+distance, '$gte':parseFloat(params.lat)-distance};
                            delete params.lng;
                            delete params.lat;
                          }
                          delete params.lng;
                          delete params.lat;
                          delete params.distance;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Request at length 0:",params);
                          }
                          delete params.pointOneLat;
                          delete params.pointTwoLat;
                          delete params.pointThreeLat;
                          delete params.pointFourLat;
                          delete params.pointOneLng;
                          delete params.pointTwoLng;
                          delete params.pointThreeLng;
                          delete params.pointFourLng;
                          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                            console.log("Skips : ",parseInt(skips)*10);
                          }
                          delete params.rectangle;
                          Advertisement.find(params).exec(function(error,result){
                            if(error){
                              console.log("Error",error);
                              res.status(500).send({error:error});
                            }else{
                              if(result.length>0){
                                if(userId!=''){
                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                    console.log("check4");
                                  }
                                  User.findOne({_id:userId}).exec(function(error,userResult){
                                    if(error){
                                      res.status(500).send({message:"find user error",error:error});
                                    }else{
                                      var fav = [];
                                      if(userResult){
                                        if(distanceLat!=null && distanceLat!=undefined && distanceLat!=''){

                                        }else{
                                          distanceLat = userResult.location[0];
                                        }
                                        var fav = userResult.favouriteAdds;
                                      }
                                      if(fav.length>0){
                                        result.forEach(function(i,idx,x){
                                          fav.forEach(function(j,jdy,y){
                                            var z =""+i._id;
                                            var p = ""+j;
                                            if(z==p){
                                              i.isFavourite = true;
                                            }
                                            if(jdy==y.length-1){
                                              if(idx==x.length-1){
                                                res.status(200).send({result:result.length});
                                              }
                                            }
                                          })
                                        })
                                      }else{
                                        res.status(200).send({result:result.length});
                                      }
                                    }
                                  })
                                }else{
                                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                                    console.log("check5");
                                  }
                                  res.status(200).send({result:result.length});
                                }
                              }else{
                                res.status(404).send({message:"no advertisements found"});
                              }
                            }
                          })
                        }
                      }
                    }

                    exports.myPurchases = function(req,res){
                      sail.find({status:'received',buyer_id:req.user._id}).populate("advert_id buyer_id offer_id seller_id payment_id").exec(function(error,result){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          if(result.length>0){
                            if(req.user.currency!='USD'){
                              curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(result.length>0){
                                    result.forEach(function(i,idx,x){
                                      if(i.offer_id){
                                        result[idx].offer_id.offered_price = parseFloat(result[idx].offer_id.offered_price)*parseFloat(currencyResult.valueInUSD);
                                      }
                                      if(i.advert_id){
                                        result[idx].advert_id.price = parseFloat(result[idx].advert_id.price)*parseFloat(currencyResult.valueInUSD);
                                      }
                                      if(idx == x.length-1){
                                        res.status(200).send({result:result,length:result.length});
                                      }
                                    })
                                  }else{
                                    res.status(200).send({result:result,length:result.length});
                                  }
                                }
                              })
                            }else{ //user currency equal to USD
                              res.status(200).send({result:result,length:result.length});
                            }
                          }else{
                            res.status(404).send({message:"no purchases found.", result : [],length : 0})
                          }
                        }
                      })
                    }

                    exports.report = function(req,res){
                      var params = req.body;
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        if(params.type!=null && params.type!=undefined && params.type!=''){
                          Advertisement.findOne({_id:params.advert_id}).exec(function(error,userRe){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              report.create({user_id: req.user._id, advert_id: params.advert_id, type: params.type, advert_user: userRe.user_id})
                              .then(function(result){
                                res.status(200).send({result: result});
                              })
                            }
                          })
                        }else{
                          res.status(403).send({message:"Type required"});
                        }
                      }else{
                        res.status(403).send({message:"Advert ID required"});
                      }
                    }

                    exports.endBoost = function(req,res){
                      var params = req.body;
                      if(parmas.advert_id!=null && parmas.advert_id!=undefined && parmas.advert_id!=''){
                        Advertisement.findOne({_id:params.advert_id, user_id:req.user._id}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              result.boosts = 0;
                              result.save(function(error,done){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(req.user.currency!='USD'){
                                    curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        done.price = parseFloat(done.price)*parseFloat(currencyResult.valueInUSD);
                                        res.status(200).send({result:done,message:"Successfully disabled boost"});
                                      }
                                    })
                                  }else{ // user currency USD
                                    res.status(200).send({result:done,message:"Successfully disabled boost"});
                                  }
                                }
                              })
                            }else{
                              res.status(404).send({message:"advertisement not found"});
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"advert_id missing"});
                      }
                    }


                    exports.sendPushNotification = function (req, res) {

                      console.log("Log2", req.params.id);

                      if(process.env.DEBUG_LOGS == 'true' || process.env.DEBUG_LOGS == true){
                        console.log("*************Sending Push Notification**************");
                      }
                      var FCM = require('fcm-push');
                      var serverKey = process.env.firebase; //put your server key here
                      var fcm = new FCM(serverKey);
                      User.findOne({_id:req.params.id}).exec(function(error,result){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          if(result){

                            var message = {
                              to: result.fcmToken, // required fill with device token or topics
                              data: {
                                "message": req.params.message,
                                "ttl":3600
                              },
                              notification: {
                                title: 'CELX',
                                body: req.params.message,
                                sound:'default'
                              },
                              ttl:3600
                            };
                            //console.log("Message : ",message);
                            fcm.send(message, function(err, response){
                              if (err) {
                                console.log("Something has gone wrong in sending notification!");
                                res.status(200).send({success:false});
                              } else {
                                console.log("Successfully sent notification");
                                res.status(200).send({success:true});
                                return true;
                              }
                            });


                          }
                        }
                      })
                    }

                    exports.addImeiNumber = function(req,res){
                      var params = req.body;
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log("Request : ",params);
                        console.log("User currency : ",req.user.currency);
                      }
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        if(params.imei!=null && params.imei!=undefined && params.imei!=''){
                          if(typeof parseFloat(params.imei) == "number" && !isNaN(params.imei)){

                            Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                result.imei = params.imei;
                                result.save(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    Advertisement.findOne({_id:params.advert_id}).populate("user_id deviceDetails accessories physicalIssues condition").exec(function(error,finalResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        if(req.user.currency != 'USD'){
                                          curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              finalResult.price = Number(parseFloat(finalResult.price)*parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                              console.log("IMEI Log : ",finalResult)
                                              res.status(200).send({result:finalResult});
                                            }
                                          })
                                        }else{
                                          console.log("IMEI Log : ",finalResult)
                                          res.status(200).send({result:finalResult});
                                        }
                                      }
                                    })

                                  }
                                })
                              }
                            })

                          }else{
                            res.status(422).send({message:"imei number must be number value"});
                          }
                        }else{
                          res.status(403).send({message:'imei required'});
                        }
                      }else{
                        res.status(403).send({message:'advert_id required'});
                      }
                    }



                    exports.createCounterOffer = function(req,res){
                      var params = req.body;
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log("Request : ",params);
                      }
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        if(params.price!=null && params.price!=undefined && params.price!=''){
                          if(typeof parseFloat(params.price) == "number" && !isNaN(params.price)){
                            if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
                              offer.findOne({
                                user_id:req.body.user_id,
                                advert_id:params.advert_id,
                                status:'counter'
                              }).exec(function(error,resultCounter){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(resultCounter){
                                    res.status(403).send({message:"Already offered against this ad"});
                                  }else{
                                    if(req.user.currency == 'USD'){
                                      offer.create({
                                        user_id:req.body.user_id,
                                        offered_price:parseFloat(params.price),
                                        advert_id:params.advert_id,
                                        status:'counter',
                                        visible:true,
                                        sort : 2
                                      }).then(function(result){
                                        Advertisement.findOne({_id:params.advert_id}).exec(function(error,advertResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            advertResult.offers = [result._id].concat(advertResult.offers);
                                            advertResult.save(function(error,saved){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                Advertisement.findOne({_id:params.advert_id}).populate("user_id deviceDetails accessories physicalIssues").exec(function(error,adResult){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    offer.find({_id:adResult.offers}).populate("user_id advert_id").exec(function(error,offerResult){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        adResult.offers = offerResult;
                                                        var messageNotification = "You have received a counter offer, Please check your offer section.";
                                                        var urlRequest = { method: 'POST',
                                                        url: process.env.url+"/testnotification/" + req.body.user_id + "/" + messageNotification,
                                                        headers:
                                                        { 'content-type': 'application/x-www-form-urlencoded',
                                                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                        'cache-control': 'no-cache' } }

                                                        request(urlRequest, function (error, response, body) {
                                                          offer.update({advert_id:params.advert_id,status:{$nin:['accepted','rejected','counter','sold']},user_id:req.body.user_id},{status:'rejected',readStatus:true},{multi:true}).then(function(pendingResult){
                                                            if(error){
                                                              res.status(500).send({error:error});
                                                            }else{
                                                              offer.find({user_id:req.body.user_id,advert_id:params.advert_id}).populate("user_id advert_id").exec(function(error,fin){
                                                                if(error){
                                                                  res.status(500).send({error:error});
                                                                }else{
                                                                  // var user11 = ""+req.user._id;
                                                                  // var user22 = ""+req.body.user_id;
                                                                  // var comparison = user11.localeCompare(user22);
                                                                  // if (comparison > 0) {
                                                                  //   chatId = user11 + user22 + params.advert_id;
                                                                  // } else {
                                                                  //   chatId = user22 + user11 + params.advert_id;
                                                                  // }
                                                                  // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" created counter offer of "+Number(parseFloat(result.offered_price)).toFixed(2)+ " USD." ,advert_id:params.advert_id })
                                                                  // .save(function (error, resultchat) {
                                                                  res.status(200).send({message:"counter offer created successfully",result:fin});
                                                                  //  })
                                                                }
                                                              })
                                                            }
                                                          })
                                                        });
                                                      }
                                                    })
                                                  }
                                                })
                                              }
                                            })
                                          }
                                        })
                                      })
                                    }else{  //user currency not usd
                                      console.log("User Currency :",req.user.currency);
                                      curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          params.price = parseFloat(params.price)/parseFloat(currencyResult.valueInUSD);
                                          offer.create({
                                            user_id:req.body.user_id,
                                            offered_price:parseFloat(params.price),
                                            advert_id:params.advert_id,
                                            status:'counter',
                                            visible:true,
                                            sort : 2
                                          }).then(function(result){
                                            Advertisement.findOne({_id:params.advert_id}).exec(function(error,advertResult){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                advertResult.offers = [result._id].concat(advertResult.offers);
                                                advertResult.save(function(error,saved){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    Advertisement.findOne({_id:params.advert_id}).populate("offers user_id deviceDetails accessories physicalIssues").exec(function(error,adResult){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        offer.find({_id:adResult.offers}).populate("user_id advert_id").exec(function(error,offerResult){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            adResult.offers = offerResult;
                                                            var messageNotification = "You have received a counter offer, Please check your offer section.";
                                                            var urlRequest = { method: 'POST',
                                                            url: process.env.url+"/testnotification/" + req.body.user_id + "/" + messageNotification,
                                                            headers:
                                                            { 'content-type': 'application/x-www-form-urlencoded',
                                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                            'cache-control': 'no-cache' } }
                                                            request(urlRequest, function (error, response, body) {
                                                              offer.update({advert_id:params.advert_id,status:{$nin:['accepted','rejected','counter']},user_id:req.body.user_id},{status:'rejected',readStatus:true},{multi:true}).then(function(pendingResult){
                                                                if(error){
                                                                  res.status(500).send({error:error});
                                                                }else{
                                                                  offer.find({user_id:req.body.user_id,advert_id:params.advert_id}).populate("user_id advert_id").exec(function(error,fin){
                                                                    if(error){
                                                                      res.status(500).send({error:error});
                                                                    }else{
                                                                      // var user11 = ""+req.user._id;
                                                                      // var user22 = ""+req.body.user_id;
                                                                      // var comparison = user11.localeCompare(user22);
                                                                      // if (comparison > 0) {
                                                                      //   chatId = user11 + user22 + params.advert_id;
                                                                      // } else {
                                                                      //   chatId = user22 + user11 + params.advert_id;
                                                                      // }
                                                                      // new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:req.user.name+" created counter offer of "+Number(parseFloat(result.offered_price)*parseFloat(currencyResult.valueInUSD)).toFixed(2)+ " "+req.user.currency  ,advert_id:params.advert_id })
                                                                      // .save(function (error, resultchat) {
                                                                      fin.forEach(function(i,idx,x){
                                                                        fin[idx].offered_price = parseFloat(fin[idx].offered_price)*parseFloat(currencyResult.valueInUSD);
                                                                        fin[idx].advert_id.price = parseFloat(fin[idx].advert_id.price)*parseFloat(currencyResult.valueInUSD);
                                                                        if(idx == x.length-1){
                                                                          res.status(200).send({message:"counter offer created successfully",result:fin});
                                                                        }
                                                                      })
                                                                      //})
                                                                    }
                                                                  })
                                                                }
                                                              })
                                                            });
                                                          }
                                                        })
                                                      }
                                                    })
                                                  }
                                                })
                                              }
                                            })
                                          })
                                        }
                                      })
                                    }
                                  }
                                }
                              })
                            }else{
                              res.status(403).send({message:"user_id required"});
                            }
                          }else{
                            res.status(422).send({message:"invalid perameters"});
                          }
                        }else{
                          res.status(403).send({message:"price required"});
                        }
                      }else{
                        res.status(403).send({message:"advert_id required"});
                      }
                    }

                    exports.readUnreadOffers = function(req,res){
                      var params = req.body;
                      if(process.env.DEBUG_LOGS == 'true' || process.env.DEBUG_LOGS == true){
                        console.log("Request : ",params);
                      }
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        if(params.type!=null && params.type!=undefined && params.type!=''){
                          if(params.type == 'sent'){
                            offer.update({advert_id:params.advert_id,status:['counter','rejected']},{readStatus:true},{multi:true}).then(function(done){
                              res.status(200).send({message:"updated successfully"});
                            })
                          }else{
                            offer.update({advert_id:params.advert_id,status:['pending','re-counter','rejected']},{readStatus:true},{multi:true}).then(function(done){
                              res.status(200).send({message:"updated successfully"});
                            })
                          }
                        }else{
                          res.status(403).send({message:"type required"});
                        }
                      }else{
                        res.status(403).send({message:"advert_id required"});
                      }
                    }


                    exports.addView = function(req,res){
                      if(req.body.advert_id!=null && req.body.advert_id!=undefined && req.body.advert_id!=''){
                        Advertisement.findOne({_id:req.body.advert_id}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              if(req.user){
                                if(result.user_id != req.user._id ){
                                  result.views = parseInt(result.views)+1;
                                  result.save(function(error,done){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      res.status(200).send({message:"done"});
                                    }
                                  })
                                }else{
                                  res.status(200).send({message:"done"});
                                }
                              }else{
                                result.views = parseInt(result.views)+1;
                                result.save(function(error,done){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    res.status(200).send({message:"done"});
                                  }
                                })
                              }

                            }else{
                              res.status(404).send({message:"advertisement not found"});
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"advert_id required"});
                      }
                    }


                    exports.deleteAdvertisement = function(req,res){
                      var params = req.body.params;
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        Advertisement.findOne({_id:params.advert_id,user_id:req.user._id}).exec(function(error,resultAdvert){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              resultAdvert.isDeleted = true;
                              resultAdvert.save(function(error,done){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  Advertisement.find({user_id:req.user._id,isVerified:true,isDeleted:false}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").sort({createdAt:-1}).exec(function(error,result){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      console.log("User Currency : ",req.user.currency);
                                      if(req.user.currency !='USD'){  //currency value of user is not USD
                                        curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(result.length>0){
                                              result.forEach(function(j,jdy,y){
                                                result[jdy]['price'] = Number(parseFloat(currencyResult.valueInUSD)*parseFloat(result[jdy].price)).toFixed(2);
                                                offer.find({_id:result[jdy]['offers']}).populate("user_id advert_id sail_id").exec(function(error,don){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    result[jdy]['offers'] = don;
                                                    if(jdy == y.length-1){
                                                      res.status(200).send({result:result});
                                                    }
                                                  }
                                                })
                                              })
                                            }else{
                                              res.status(200).send({result:result});
                                            }
                                          }
                                        })
                                      }else{ //user currency is not equal to USD\
                                        if(result.length>0){
                                          result.forEach(function(j,jdy,y){
                                            offer.find({_id:result[jdy]['offers']}).populate("user_id advert_id sail_id").exec(function(error,don){
                                              if(error){
                                                res.status(500).send({error:error});
                                              }else{
                                                result[jdy]['offers'] = don;
                                                if(jdy == y.length-1){
                                                  res.status(200).send({result:result});
                                                }
                                              }
                                            })
                                          })
                                        }else{
                                          res.status(200).send({result:result});
                                        }
                                      }
                                      //res.status(200).send({result:result});
                                    }
                                  })
                                }
                              })
                            }else{
                              res.status(404).send({message:"Advertisement not found or might not belong to you"});
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"advert_id required"});
                      }
                    }

                    exports.cancelDeal = function(req,res){
                      var params = req.body;
                      if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
                        sail.findOne({_id:params.sail_id , status :{$in:['address pending','payment pending']}}).populate("advert_id").exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              offer.findOne({sail_id:params.sail_id}).exec(function(error,offerResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  result.status = 'canceled';
                                  result.save(function(error,sialResult){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      offerResult.status = 'rejected';
                                      offerResult.sort = 5;
                                      offerResult.sail_id = undefined;
                                      offerResult.save(function(error,offerSaved){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          var urlRequest = "";
                                          var messageNotification = req.user.name+" has cancelled the deal against "+result.advert_id.title;
                                          if(result.buyer_id+"" == req.user._id+""){
                                            urlRequest = { method: 'POST',
                                            url: process.env.url+"/testnotification/" + result.seller_id + "/" + messageNotification,
                                            headers:
                                            { 'content-type': 'application/x-www-form-urlencoded',
                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                            'cache-control': 'no-cache' } }
                                          }else{
                                            urlRequest ={ method: 'POST',
                                            url: process.env.url+"/testnotification/" + result.buyer_id + "/" + messageNotification,
                                            headers:
                                            { 'content-type': 'application/x-www-form-urlencoded',
                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                            'cache-control': 'no-cache' } }
                                          }
                                          request(urlRequest, function (error, response, body) {
                                            Advertisement.update({_id:result.advert_id._id,boosts : {$gt:0}},{boosted:true}).then(function(done){
                                              var user11 = ""+result.seller_id;
                                              var user22 = ""+result.buyer_id;
                                              var chatId = "12345"
                                              var comparison = user11.localeCompare(user22);
                                              if (comparison > 0) {
                                                chatId = user11 + user22 + result.advert_id._id;
                                              } else {
                                                chatId = user22 + user11 + result.advert_id._id;
                                              }
                                              new chat({ chat_id: chatId, user1: user11, user2: user22, messageFrom: user11,dateTime:Date.now(),message:messageNotification,advert_id:result.advert_id._id })
                                              .save(function (error, resultchat) {
                                                if (error) {
                                                  res.status(500).send({error:error});
                                                } else {
                                                  res.status(200).send({message:"Deal cancelled successfully"});
                                                }
                                              })
                                            })
                                          });
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }else{
                              res.status(404).send({message:"sale not found, or payment is done"})
                            }
                          }
                        })
                      }else{
                        res.status(500).send({message:"sale_id required"});
                      }
                    }

                    exports.getSingleAdsOffers = function(req,res){
                      var params = req.body;
                      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                        offer.find({advert_id:params.advert_id}).populate("advert_id user_id sail_id").sort({sort:1}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              if(req.user.currency != 'USD'){
                                curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    result.forEach(function(i,idx,x){
                                      result[idx].offered_price = parseFloat(result[idx].offered_price)*parseFloat(currencyResult.valueInUSD);
                                      result[idx].advert_id.price = parseFloat(result[idx].advert_id.price)*parseFloat(currencyResult.valueInUSD);
                                      if(idx == x.length-1){
                                        res.status(200).send({result:result});
                                      }
                                    })
                                  }
                                })
                              }else{
                                res.status(200).send({result:result});
                              }
                            }else{
                              res.status(404).send({message:"advertisement not found"});
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"advert_id required"});
                      }
                    }


                    exports.repostAdvertisement = function(req,res){
                      console.log("Request: ",req.body);
                      if(req.body.advert_id!=null && req.body.advert_id!=undefined && req.body.advert_id!=''){
                        Advertisement.findOne({_id:req.body.advert_id,user_id:req.user._id}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(result){
                              console.log("advert found");
                              sail.findOne({advert_id:req.body.advert_id,status:'received',payment_id:null}).exec(function(error,sailResultFound){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(sailResultFound){
                                    //                sail.remove({_id:req.sailResultFound._id}).then(function(done){

                                    sail.remove({_id:sailResultFound._id}, function(err, done) {
                                      if(err){
                                        res.status(500).send({error:error});
                                      }else{
                                        result.sold = false;
                                        result.visible = true;
                                        var index = result.pictures.indexOf(process.env.SOLD_IMAGE);
                                        if (index > -1) {
                                          result.pictures.splice(index, 1);
                                        }
                                        offers.findOne({advert_id:req.body.advert_id,status:'sold'}).exec(function(error,offerResult){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            if(offerResult){
                                              console.log("offer found ",offerResult.status);
                                              //  offerResult.sail_id = undefined;
                                              offerResult.status = 'rejected';
                                              offerResult.save(function(error,savedOffer){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  result.save(function(error,savedAdvert){
                                                    if(error){
                                                      res.stauts(500).send({error:error});
                                                    }else{
                                                      Advertisement.findOne({_id:req.body.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,savedFinal){
                                                        if(error){
                                                          res.status(500).send({error:error});
                                                        }else{
                                                          res.status(200).send({message:"Advertisment reposted successfully",result:savedFinal});
                                                        }
                                                      })
                                                    }
                                                  })
                                                }
                                              })
                                            }else{
                                              console.log("offer not found");
                                              result.save(function(error,savedAdvert){
                                                if(error){
                                                  res.stauts(500).send({error:error});
                                                }else{
                                                  Advertisement.findOne({_id:req.body.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,savedFinal){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      res.status(200).send({message:"Advertisment reposted successfully",result:savedFinal});
                                                    }
                                                  })
                                                }
                                              })
                                            }
                                          }
                                        })
                                      }
                                    })
                                  }else{
                                    console.log("sail not found");
                                    result.sold = false;
                                    result.visible = true;
                                    var index = result.pictures.indexOf(process.env.SOLD_IMAGE);
                                    if (index > -1) {
                                      result.pictures.splice(index, 1);
                                    }
                                    offers.findOne({advert_id:req.body.advert_id,status:'sold'}).exec(function(error,offerResult){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        if(offerResult){
                                          //  offerResult.sail_id = undefined;
                                          offerResult.status = 'rejected';
                                          offerResult.save(function(error,savedOffer){
                                            if(error){
                                              res.status(500).send({error:error});
                                            }else{
                                              result.save(function(error,savedAdvert){
                                                if(error){
                                                  res.stauts(500).send({error:error});
                                                }else{
                                                  Advertisement.findOne({_id:req.body.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,savedFinal){
                                                    if(error){
                                                      res.status(500).send({error:error});
                                                    }else{
                                                      res.status(200).send({message:"Advertisment reposted successfully",result:savedFinal});
                                                    }
                                                  })
                                                }
                                              })
                                            }
                                          })
                                        }else{
                                          result.save(function(error,savedAdvert){
                                            if(error){
                                              res.stauts(500).send({error:error});
                                            }else{
                                              Advertisement.findOne({_id:req.body.advert_id}).populate("user_id deviceDetails physicalIssues accessories condition offers").exec(function(error,savedFinal){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  res.status(200).send({message:"Advertisment reposted successfully",result:savedFinal});
                                                }
                                              })
                                            }
                                          })
                                        }
                                      }
                                    })
                                    //                                    res.status(403).send({message:"failed to repost advertisement"});
                                  }
                                }
                              })
                            }else{

                              res.status(404).send({message:"Advertisement not found"});
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"advertisement id required"});
                      }
                    }


                    exports.getAllReports = function(req,res){
                      if(req.user.isAdmin){
                        report.find({}).populate("user_id advert_id advert_user").sort({date:-1}).exec(function(error,result){
                          console.log("this result is", result);
                          
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            res.status(200).send({result:result});
                          }
                        })
                      }else{
                        res.status(401).send({message:"You are not authorised to make this call."});
                      }
                    }

                    exports.getAlPendinglReports = function(req,res){
                      if(req.user.isAdmin){
                        report.find({status:'pending'}).populate("user_id advert_id advert_user").sort({date:-1}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            res.status(200).send({result:result});
                          }
                        })
                      }else{
                        res.status(401).send({message:"You are not authorised to make this call."});
                      }
                    }

                    exports.viewAllAdvertisements = function(req,res){
                      if(req.user.isAdmin){
                        Advertisement.find({}).populate("user_id deviceDetails accessories physicalIssues condition offers").sort({createdAt:-1}).exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            res.status(200).send({result:result});
                          }
                        })
                      }else{
                        res.status(401).send({message:"You are not authorised to make this call."});
                      }
                    }

                    exports.enableDisableAddAdmin = function(req,res){
                      if(req.user.isAdmin){
                        Advertisement.findOne({_id:req.body.advert_id}).populate("user_id deviceDetails accessories physicalIssues condition offers").exec(function(error,result){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            if(req.body.enable == true || req.body.enable == 'true'){
                              result.visible = true;
                              result.reason = "";
                            }else{
                              result.visible = false;
                              if(req.body.reason!=null && req.body.reason!=undefined && req.body.reason!=''){
                                result.reason = req.body.reason;
                              }else{
                                result.reason = 'This advertisement is disabled by Admin';
                              }
                            }
                            result.save(function(error,done){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                res.status(200).send({result:result});
                              }
                            })
                          }
                        })
                      }else{
                        res.status(401).send({message:"You are not authorised to make this call."});
                      }
                    }

                    exports.adminActionReport = function(req,res){
                      var params = req.body;
                      if(process.env.DEBUG_LOGS == 'true' || process.env.DEBUG_LOGS == true){
                        console.log("Request : ",req.body);
                      }
                      if(req.user.isAdmin){
                        if(params.report_id!=null && params.report_id!=undefined && params.report_id!=''){
                          if(params.action!=null && params.action!=undefined && params.action!=''){
                            if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
                              report.findOne({_id:params.report_id}).exec(function(error,reportResult){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  if(reportResult){
                                    Advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        if(result){
                                          if(params.action == 'dismiss'){
                                            reportResult.status = 'dismissed';
                                            reportResult.save(function(error,saved){
                                              if(error){
                                                res.status(500).send({error:error,message:"error in dismissing report"});
                                              }else{
                                                report.findOne({_id:saved._id}).populate("user_id advert_id advert_user").sort({date:-1}).exec(function(error,result1){
                                                  if(error){
                                                    res.status(500).send({error:error});
                                                  }else{
                                                    res.status(200).send({message:"report updated successfully",result:result1});
                                                  }
                                                })
                                              }
                                            })
                                          }else if(params.action == 'delete'){
                                            if(params.reason!=null && params.reason!=undefined && params.reason!=''){
                                              result.enable = false;
                                              result.isDeleted = true;
                                              result.visible = false;
                                              result.reason = params.reason;
                                              result.save(function(error,saved){
                                                if(error){
                                                  res.status(500).send({error:error,message:"error in deleting ad"});
                                                }else{
                                                  var messageNotification = "Your Ad for "+result.title+" has been deleted by admin.";
                                                  var urlRequest = { method: 'POST',
                                                  url: process.env.url+"/testnotification/" + result.user_id + "/" + messageNotification,
                                                  headers:
                                                  { 'content-type': 'application/x-www-form-urlencoded',
                                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                  'cache-control': 'no-cache' } }
                                                  request(urlRequest, function (error, response, body) {
                                                    reportResult.status = 'read';
                                                    reportResult.save(function(error,savedReport){
                                                      if(error){
                                                        res.status(500).send({error:error});
                                                      }else{
                                                        report.findOne({_id:savedReport._id}).populate("user_id advert_id advert_user").sort({date:-1}).exec(function(error,result1){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            res.status(200).send({message:"ad deleted successfully",result:result1});
                                                          }
                                                        })
                                                      }
                                                    })
                                                  })
                                                }
                                              })
                                            }else{
                                              res.status(403).send({message:"reason required"});
                                            }
                                          }else if(params.action == 'suspend'){
                                            if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
                                              User.findOne({_id:result.user_id}).exec(function(error,userResult){
                                                if(error){
                                                  res.status(500).send({error:error});
                                                }else{
                                                  if(userResult){
                                                    if(userResult.reason!='' && userResult.reason!=null && userResult.reason!=undefined){
                                                      res.status(200).send({message:"user already suspended"});
                                                    }else{
                                                      userResult.isDeleted = true;
                                                      if(params.reason!=null && params.reason!=undefined && params.reason!=''){
                                                        userResult.reason = params.reason;
                                                        userResult.save(function(error,saved){
                                                          if(error){
                                                            res.status(500).send({error:error});
                                                          }else{
                                                            var messageNotification = "Your account has been suspended by admin.";
                                                            var urlRequest = { method: 'POST',
                                                            url: process.env.url+"/testnotification/" + params.user_id + "/" + messageNotification,
                                                            headers:
                                                            { 'content-type': 'application/x-www-form-urlencoded',
                                                            'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                                            'cache-control': 'no-cache' } }
                                                            request(urlRequest, function (error, response, body) {
                                                              reportResult.status = 'read';
                                                              reportResult.save(function(error,savedReport){
                                                                if(error){
                                                                  res.status(500).send({error:error});
                                                                }else{
                                                                  report.findOne({_id:saved._id}).populate("user_id advert_id advert_user").sort({date:-1}).exec(function(error,result1){
                                                                    if(error){
                                                                      res.status(500).send({error:error});
                                                                    }else{
                                                                        res.status(200).send({message:"user suspended successfully",result:result1});
                                                                    }
                                                                  })
                                                                }
                                                              })
                                                            })
                                                          }
                                                        })
                                                      }else{
                                                        res.status(403).send({message:"reason required"});
                                                      }
                                                    }
                                                  }else{
                                                    res.status(404).send({message:"user not found"});
                                                  }
                                                }
                                              })
                                            }else{
                                              res.status(403).send({message:"user_id required"});
                                            }
                                          }else{
                                            res.status(403).send({message:"invalid action"});
                                          }
                                        }else{
                                          res.status(404).send({message:"ad not found"});
                                        }
                                      }
                                    })
                                  }else{
                                    res.status(404).send({message:"report not found"});
                                  }
                                }
                              })
                            }else{
                              res.status(403).send({message:"advert_id required"});
                            }
                          }else{
                            res.status(403).send({message:"action required"});
                          }
                        }else{
                          res.status(403).send({message:"report_id required"});
                        }
                      }else{
                        res.status(401).send({message:"You are not authorised to make this call."});
                      }
                    }

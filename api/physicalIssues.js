const physicalIssues = require('../models/physicalIssues.js');
const advertisement = require('../models/advertisement.js');
var curr = require('../models/currency.js');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var User = require('../models/user.js');
var cloudinary = require('cloudinary');
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

exports.phoneIssues = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request :",params);
  }
  if(req.body.advert_id !=null && req.body.advert_id !=""){
    physicalIssues.findOne({advert_id:req.body.advert_id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          result.touchDiscoloration = params.touchDiscoloration
          ? params.touchDiscoloration
          : result.touchDiscoloration;
          result.touchDiscoloration = params.touchDiscoloration
          ? params.touchDiscoloration
          : result.touchDiscoloration;
          result.frontCameraWorking = params.frontCameraWorking
          ? params.frontCameraWorking
          : result.frontCameraWorking;
          result.backCameraWorking = params.backCameraWorking
          ? params.backCameraWorking
          : result.backCameraWorking;
          result.backCameraFault = params.backCameraFault
          ? params.backCameraFault
          : result.backCameraFault;
          result.volumeButtonDefect = params.volumeButtonDefect
          ? params.volumeButtonDefect
          : result.volumeButtonDefect;
          result.wifiWorking = params.wifiWorking
          ? params.wifiWorking
          : result.wifiWorking;
          result.gpsWorking = params.gpsWorking
          ? params.gpsWorking
          : result.gpsWorking;
          result.chargingDefect = params.chargingDefect
          ? params.chargingDefect
          : result.chargingDefect;
          result.powerButtonWorking = params.powerButtonWorking
          ? params.powerButtonWorking
          : result.powerButtonWorking;
          result.powerButtonDefect = params.powerButtonDefect
          ? params.powerButtonDefect
          : result.powerButtonDefect;
          result.bateryFault = params.bateryFault
          ? params.bateryFault
          : result.bateryFault;
          result.speakerWorking = params.speakerWorking
          ? params.speakerWorking
          : result.speakerWorking;
          result.lcdReplaced = params.lcdReplaced
          ? params.lcdReplaced
          : result.lcdReplaced;
          result.screenGlassBroken = params.screenGlassBroken
          ? params.screenGlassBroken
          : result.screenGlassBroken;
          result.microphoneWorking = params.microphoneWorking
          ? params.microphoneWorking
          : result.microphoneWorking;
          result.save(function(error,done){
            if(error){
              res.status(500).send({error:error});
            }else{
              res.status(200).send({result:done});
            }
          })
        }else{
          physicalIssues.create(req.body).then(function(final){
            advertisement.findOne({_id:params.advert_id}).exec(function(error,advert){
              if(error){
                res.status(500).send({error:error});
              }else{
                advert.physicalIssues_id = final._id;
                advert.visible = true;
                advert.save(function(error,savedAdvert){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    res.status(202).send({result:final});
                  }
                })
              }
            })
          })
        }
      }
    })
  }else{
    res.status(403).send({message:"Advertisement ID not found"});
  }
}


exports.uploadImageWeb = function(req,res){
  if(req.params.id!="" && req.params.id!=null){
    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
      console.log("Request Body : ",req.body);
      console.log("req.file : ",req.file);
      console.log("req.files : ",req.files);
    }
    upload(req, res, function (err) {
      if(req.file){
        cloudinary.v2.uploader.upload(req.file.path,
          {resource_type: "auto"}, function(error, cloudinarResult){
            advertisement.findOne({_id:req.params.id}).populate("user_id").populate("deviceDetails").populate("physicalIssues").populate("accessories").populate("condition").populate("offers").exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                if(result){

                  if(result['pictures'][0] == "https://res.cloudinary.com/hbayka3em/image/upload/v1536758431/defaultimg.png"){
                    result['pictures'].splice(0, 1, cloudinarResult.url);
                  }else{
                    result.pictures = result.pictures.concat([cloudinarResult.url]);
                  }
                  result.save(function(error,final){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      fs.unlink("../uploads/" + req.file.filename, (err) => {
                        if (err) {
                        } else {
                        }
                      });
                      res.status(200).send({result:final});
                    }
                  })
                }else{
                  res.status(404).send({message:"Advertisement not found."});
                }
              }
            })
          })
        }else{
          res.status(403).send({message:"File not uploaded properly. Please try again."});
        }
      })
    }else{
      res.status(403).send({message:"Parameters missing"});
    }
  }


  exports.uploadUserImageWeb = function(req,res){
    if(req.params.id!="" && req.params.id!=null){
      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
        console.log("Request Body : ",req.body);
        console.log("req.file : ",req.file);
        console.log("req.files : ",req.files);
      }
      upload(req, res, function (err) {
        if(req.file){
          cloudinary.v2.uploader.upload(req.file.path,
            {resource_type: "auto"}, function(error, cloudinarResult){
              User.findOne({_id:req.params.id}).exec(function(error,result){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(result){
                    result.profilePicture = cloudinarResult.url;
                    result.save(function(error,final){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        fs.unlink("../uploads/" + req.file.filename, (err) => {
                          if (err) {
                          } else {
                          }
                        });
                        res.status(200).send({result:final});
                      }
                    })
                  }else{
                    res.status(404).send({message:"User not found."});
                  }
                }
              })
            })
          }else{
            res.status(403).send({message:"File not uploaded properly. Please try again."});
          }
        })
      }else{
        res.status(403).send({message:"Parameters missing"});
      }
    }

    exports.uploadImageAdvert = function(req,res){
      if(req.params.id!="" && req.params.id!=null){
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log("Request Body : ",req.body);
          console.log("req.file : ",req.file);
          console.log("req.files : ",req.files);
        }
        upload(req, res, function (err) {
          if(req.file){
            cloudinary.v2.uploader.upload(req.file.path,
              {resource_type: "auto"}, function(error, cloudinarResult){
                advertisement.findOne({_id:req.params.id}).exec(function(error,result){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(result){
                      if(result['pictures'][0] == "https://res.cloudinary.com/hbayka3em/image/upload/v1536758431/defaultimg.png"){
                        result['pictures'].splice(0, 1, cloudinarResult.url);
                      }else{
                        result.pictures = result.pictures.concat([cloudinarResult.url]);
                      }

                      result.save(function(error,final){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          fs.unlink("../uploads/" + req.file.filename, (err) => {
                            if (err) {
                            } else {
                            }
                          });
                          if(req.user.currency !='USD'){  //currency value of user is not USD
                            curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                final.price = Number(parseFloat(final.price) * parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                res.status(200).send({result:final});
                              }
                            })
                          }else{
                            res.status(200).send({result:final});
                          }

                        }
                      })
                    }else{
                      res.status(404).send({message:"Advertisement not found."});
                    }
                  }
                })
              })
            }else{
              res.status(403).send({message:"File not uploaded properly. Please try again."});
            }
          })
        }else{
          res.status(403).send({message:"Parameters missing"});
        }
      }

      exports.uploadImage = function(req,res){
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log(req.file);
        }
        upload(req, res, function (err) {

          if(req.file){
            cloudinary.uploader.upload(req.file.path, function (cloudinarResult) {
              res.status(200).send({image:cloudinarResult.url});
            });
          }else{
            res.status(403).send({message:"file not found"});
          }
        })
      }

      exports.createPhysicalCondition = function(req,res){
        var params = req.body;
        physicalIssues.create({
          title:params.title,
          image:params.image,
          description: params.description,
          type:params.type
        }).then(function(result){
          res.status(200).send({result:result});
        })
      }

      exports.getAllPhysicalIssues = function(req,res){
        physicalIssues.find({type:req.params.id}).exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            res.status(200).send({result:result});
          }
        })
      }

      exports.addIssuesAccessories = function(req,res){
        var params = req.body;
        console.log("Request  :",req.body)
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log("Request :",params);
        }
        var id = params.ids;
        var x =  id.split(",");
        if(id == ''){
          x = []
        }
        if(params.advert_id!=null && params.advert_id!=undefined && params.type!=null && params.type!=undefined){
          advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
            if(error){
              res.status(500).send({error:error});
            }else{
              if(result){
                if(params.type=="issues"){
                  if(x.length>0){
                    result.physicalIssues = [];
                      result.physicalIssues = x;
                  }else{
                    result.physicalIssues = x;
                  }
                }else if(params.type="accessories"){
                  if(x.length>0){

                    result.accessories = x;
                  }else{
                    result.accessories = x;
                  }
                }else{
                  res.status(404).send({message:"Type must be defined"});
                }
                result.save(function(error,done){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    advertisement.findOne({_id:params.advert_id}).populate("physicalIssues").populate("accessories").populate("deviceDetails").exec(function(error,final){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(result){
                          if(req.user.currency !='USD'){  //currency value of user is not USD
                            curr.findOne({currency:req.user.currency}).exec(function(error,currencyResult){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                final.price = Number(parseFloat(final.price) * parseFloat(currencyResult.valueInUSD)).toFixed(2);
                                res.status(200).send({result:final});
                              }
                            })
                          }else{
                            res.status(200).send({result:final});
                          }
                        }else{
                          res.status(404).send({message:"Advertisement not found."});
                        }
                      }
                    })
                  }
                })
              }else{
                res.status(404).send({message:"Advertisement not found."});
              }
            }
          })
        }else{
          res.status(403).send({message:"Parameters missing"});
        }
      }

const package = require('../models/package.js');
const User = require('../models/user.js');
exports.getAllPackages = function(req,res){
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  package.find({}).sort({sort:1}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      User.findOne({_id:req.user._id}).exec(function(error,pack){
        if(error){
          res.status(500).send({error:error});
        }else{
          for(var i = 0;i<result.length;i++){
            if(result[i]._id == pack.package.toString()){
              result[i].active = true;
              res.status(200).send({result:result});
            }
          }
        }
      })
    }
  })
}

exports.updateUserPackage = function(req,res){
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request :",req.body);
  }
  if(req.body.package_id!=null && req.body.package_id!=undefined && req.body.package_id!=''){
    package.findOne({_id:req.body.package_id}).exec(function(error,result){
      if(error){
        res.status(500).send({message:"error in finding package",error:error});
      }else{
        if(result){
          User.findOne({_id:req.user._id}).exec(function(error,done){
            if(error){
              res.status(500).send({message:"error in finding user",error:error});
            }else{
              if(done){
                done.package = result._id;
                done.boostCount = parseInt(done.boostCount)+parseInt(result.boosts);
                done.addsCount = parseInt(done.addsCount)+parseInt(result.addCount);
                done.save(function(error,final){
                  if(error){
                    res.status(500).send({message:"error in saving user",error:error});
                  }else{
                    User.findOne({_id:req.user._id}).populate('package').exec(function(error,done1){
                      if(error){
                        res.status(500).send({message:"error in finding user after saving",error:error});
                      }else{
                        res.status(200).send({message:"package updated successfully",user:done1});
                      }
                    })
                  }
                })
              }else{
                res.status(401).send({message:"User not found"});
              }
            }
          })
        }else{
          res.status(403).send({message:"Invalid package ID"});
        }
      }
    })
  }else{
    res.status(403).send({message:"package id required"});
  }
}

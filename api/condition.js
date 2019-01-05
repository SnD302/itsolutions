const condition = require('../models/condition.js');
const advertisement = require('../models/advertisement.js');
var curr = require('../models/currency.js');
exports.createContition = function(req,res){
  var params = req.body;
  var cond = params.condition;
  var x =  cond.split(",");
  condition.create({
    title:params.title,
    condition:x
  }).then(function(result){
    res.status(200).send({result:result});
  })
}

exports.getAllConditions = function(req,res){
  condition.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      res.status(200).send({result:result});
    }
  })
}

exports.addCondition = function(req,res){
  var params = req.body;
  console.log("Request : ",req.body);
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.advert_id!=null && params.advert_id!=undefined && params.condition!=null && params.condition!=undefined){
    advertisement.findOne({_id:params.advert_id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){

          result.condition = params.condition;
          result.save(function(error,final){
            if(error){
              res.status(500).send({error:error});
            }else{
              advertisement.findOne({_id:params.advert_id}).populate("condition").populate("accessories").populate("physicalIssues").populate("deviceDetails").exec(function(error,done){
                if(req.user.currency!='USD'){ //user currency is not USD
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

              })
            }
          })
        }else{
          res.status(404).send({message:"Advertisement not found."})
        }
      }
    })
  }else{
    res.status(403).send({message:"Parameters missing"});
  }
}

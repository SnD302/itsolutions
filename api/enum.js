const enums = require('../models/enum.js');
const store = require('../models/store.js');
var User = require('../models/user.js');
var curr = require('../models/currency.js');
exports.getEnums = function(req,res){
  var params = req.body;
  console.log("Request : ",req.body);
  if(params.user_id!=null && params.user_id!=undefined && params.user_id!=''){
    User.findOne({_id:params.user_id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          enums.findOne({}).exec(function(error,resultEnum){
            if(error){
              res.status(500).send({error:error});
            }else{
              curr.findOne({currency:result.currency}).exec(function(error,currencyResult){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(result.currency!='USD'){
                    resultEnum.price.forEach(function(i,idx,x){
                      if(parseFloat(currencyResult.valueInUSD)<10){
                        resultEnum.price[idx] = i*1;
                      //  console.log("value of I ::::::1:",i , "::::" , resultEnum.price[idx]);
                      }else if(parseFloat(currencyResult.valueInUSD)>9 &&parseFloat(currencyResult.valueInUSD)<100){
                        resultEnum.price[idx] = i*10;
                      //  console.log("value of I ::::::2:",i , "::::" , resultEnum.price[idx]);
                      }else{
                        resultEnum.price[idx] = i*100;
                      //  console.log("value of I ::::::3:",i , "::::" , resultEnum.price[idx]);
                      }
                      if(idx == x.length-1){
                        store.find({}).exec(function(error,stor){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            console.log(resultEnum.price);
                              res.status(200).send({result:resultEnum,store:stor});
                          }
                        })
                      }
                    })
                  }else{
                    store.find({}).exec(function(error,stor){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                          res.status(200).send({result:resultEnum,store:stor});
                      }
                    })
                  }
                }
              })
            }
          })
        }else{
          res.status(404).send({message:"user not found"});
        }
      }
    })
  }else{
    enums.find({}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        store.find({}).exec(function(error,stor){
          if(error){
            res.status(500).send({error:error});
          }else{
              res.status(200).send({result:result[0],store:stor});
          }
        })
      }
    })
  }
}

var chat = require('../models/chat.js');
var user = require('../models/user.js');
var offer = require('../models/offer.js');
var curr = require('../models/currency.js');
var Advertisement = require('../models/advertisement.js');
exports.getAllChats = function(req,res){
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  chat.find({ $or: [ { user1:req.user._id }, { user2:req.user._id } ],blocked:false,deletedBy:{$nin:[req.user._id]}}).sort({dateTime:-1}).exec(function(error,chatResult){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(chatResult.length>0){
        if(req.user.currency !='USD'){
          curr.findOne({currency:req.user.currency}).exec(function(error,resultCurrency){
            if(error){
              res.status(500).send({error:error});
            }else{
              var chat_id = chatResult[0].chat_id;
              var result =[];
              var seenNames = {};
              if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                console.log("chatResult Length : ",chatResult.length);
              }
              result = chatResult.filter(function (currentObject) {
                if (currentObject.chat_id in seenNames) {
                  return false;
                } else {
                  //  currentObject.messageFrom = currentObject.user2;
                  if(currentObject.messageFrom+"" == req.user._id+"" && currentObject.user2+"" == req.user._id+""){
                    currentObject.messageFrom = currentObject.user1;
                  }
                  if(currentObject.messageFrom+"" == req.user._id+"" && currentObject.user1+"" == req.user._id+""){
                    currentObject.messageFrom = currentObject.user2;
                    currentObject.readStatus = true;
                  }
                  seenNames[currentObject.chat_id] = true;
                  chat_id = currentObject.chat_id;
                  return true;
                }
              });
              chat.populate(result, 'messageFrom', function (err) {
                if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                  console.log("Chat: ",result);
                }
                if(result.length>0){
                  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                    console.log("populated chat Length : ",result.length);
                  }
                  result.forEach(function(i,idx,x){
                    Advertisement.findOne({_id:i.advert_id}).populate("user_id offers deviceDetails accessories condition").exec(function(error,advertResult){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                          if(advertResult){
                            console.log('*******************',advertResult.user_id, advertResult.offers);
                          }else{
                            console.log("Advertisement not found ",i.advert_id );
                          }
                        }
                        if(advertResult){
                          advertResult.price = Number(parseFloat(advertResult.price)*parseFloat(resultCurrency.valueInUSD)).toFixed(2);
                          if(advertResult.offers.length>0){
                            advertResult.offers.forEach(function(p,pk,k){
                              advertResult.offers[pk].offered_price = Number(parseFloat(advertResult.offers[pk].offered_price)*parseFloat(resultCurrency.valueInUSD)).toFixed(2);
                              if(pk == k.length-1){
                                result[idx].advert_id = advertResult;
                                if(idx == x.length-1){
                                  setTimeout(function() {
                                    res.status(200).send({result:result});
                                  }, 2500);
                                }
                              }
                            })
                          }else{
                            if(idx == x.length-1){
                              setTimeout(function() {
                                res.status(200).send({result:result});
                              }, 2500);
                            }
                          }
                        }else{
                          if(idx == x.length-1){
                            setTimeout(function() {
                              res.status(200).send({result:result});
                            }, 2500);
                          }
                        }
                      }
                    })
                  })
                }else{
                  res.status(200).send({result:result});
                }
              });
            }
          })
        }else{
          var chat_id = chatResult[0].chat_id;
          var result =[];
          var seenNames = {};
          result = chatResult.filter(function (currentObject) {
            if (currentObject.chat_id in seenNames) {
              return false;
            } else {
              //  currentObject.messageFrom = currentObject.user2;
              if(currentObject.messageFrom+"" == req.user._id+"" && currentObject.user2+"" == req.user._id+""){
                currentObject.messageFrom = currentObject.user1;
              }
              if(currentObject.messageFrom+"" == req.user._id+"" && currentObject.user1+"" == req.user._id+""){
                currentObject.messageFrom = currentObject.user2;
                currentObject.readStatus = true;

              }
              seenNames[currentObject.chat_id] = true;
              chat_id = currentObject.chat_id;
              return true;
            }
          });
          chat.populate(result, 'messageFrom', function (err) {
            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
              console.log("Chat: ",result);
            }
            if(result.length>0){
              result.forEach(function(i,idx,x){
                Advertisement.findOne({_id:i.advert_id}).populate("user_id offers deviceDetails accessories condition").exec(function(error,advertResult){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      if(advertResult){
                        console.log(advertResult.user_id, advertResult.offers);
                      }else{
                        console.log("Advertisement not found ",i.advert_id );
                      }
                    }
                    if(advertResult){
                      if(advertResult.offers.length>0){

                      }
                      result[idx].advert_id = advertResult;
                    }
                  }
                })
                if(idx == x.length-1){
                  setTimeout(function() {
                    res.status(200).send({result:result});
                  }, 2500);
                }
              })
            }else{
              res.status(200).send({result:result});
            }
          });
        }
      }else{
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log("no results : ",chatResult);
        }
        res.status(200).send({result:chatResult});
      }
    }
  })
}

exports.getAllMessages = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request :",params);
  }
  var chatId = "12345";
  var comparison = params.myId.localeCompare(params.hisId);
  //  console.log("message from user :",msg);
  if(params.myId!=null && params.myId!=undefined && params.myId!=''){
    if(params.hisId!=null && params.hisId!=undefined && params.hisId!=''){
      if(params.advert_id!=null && params.advert_id!=undefined && params.advert_id!=''){
        if (comparison > 0) {
          chatId = params.myId + params.hisId + params.advert_id;
        } else {
          chatId = params.hisId + params.myId + params.advert_id;
        }
        chat.find({chat_id:chatId}).populate("advert_id").exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            chat.update({chat_id:chatId,messageFrom:{$ne:req.user._id}},{readStatus:true},{multi:true}).then(function(doneit){
              res.status(200).send({result:result});
            })
          }
        })
      }else{
        res.status(403).send({message:"advert_id required"});
      }
    }else{
      res.status(403).send({message:"hisId required"});
    }
  }else{
    res.status(403).send({message:"myId required"});
  }
}

exports.getUnread = function(req,res){
  user.findOne({_id:req.user._id}).exec(function(error,userResult){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(userResult.blockReason.length>0){
          res.status(401).send({message:"Your account is suspended by admin."});
      }else{
        Advertisement.find({user_id:req.user._id}).exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            if(result.length>0){
              var advertid = [];
              result.forEach(function(i,idx,x){
                advertid[idx] = i._id;
                if(idx == x.length-1){
                  offer.find({advert_id:advertid,readStatus:false,status:['pending','re-counter']}).exec(function(error,offerResult){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      chat.find({$or:[{user1:req.user._id},{user2:req.user._id}],messageFrom:{$ne:req.user._id},readStatus:false}).exec(function(error,chatResult){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          res.status(200).send({chat : chatResult.length,offer : offerResult.length});
                        }
                      })
                    }
                  })
                }
              })
            }else{
              chat.find({$or:[{user1:req.user._id},{user2:req.user._id}],messageFrom:{$ne:req.user._id},readStatus:false}).exec(function(error,chatResult){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(200).send({chat : chatResult.length,offer : 0});
                }
              })
            }
          }
        })
      }
    }
  })
}

exports.deleteChat = function(req,res){
  var params = req.body;
  console.log("Request : ",req.body);
  if(params.chat_id!=null && params.chat_id!=undefined && params.chat_id!=''){
    chat.findOne({chat_id:params.chat_id,deletedBy:{$nin:[req.user._id]}}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          chat.update({chat_id:params.chat_id},{deletedBy:result.deletedBy.concat([req.user._id]),readStatus:true},{multi:true}).then(function(done){
            res.status(200).send({message:"successfully deleted"});
          })
        }else{
          res.status(404).send({message:"chat not found"});
        }
      }
    })
  }else{
    res.status(500).send({message:"chat_id required"});
  }
}

const payment = require('../models/payment.js');
const Cryptr = require('cryptr');
var User = require('../models/user.js');
var stripe = require('stripe')(process.env.stripeSecretKey);
var sail = require('../models/sail.js');
var Paypal = require('paypal-adaptive');
var advertisement = require('../models/advertisement.js');
var cardType = require("credit-card-type");
var card = require("../models/card.js");
var basic = require('basic-authorization-header');
var offer = require('../models/offer.js');
var request = require('request');
var chat = require('../models/chat.js');
exports.addNewUserDetails = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.name!=null && params.name!=undefined && params.name!=''){
    if(params.email!=null && params.email!=undefined && params.email!=''){
      if(params.cardNumber!=null && params.cardNumber!=undefined && params.cardNumber!=''){
        if(params.address!=null && params.address!=undefined && params.address!=''){
          User.findOne({_id:req.user._id}).select('+password').exec(function(error,result){
            if(error){
              res.status(500).send({error:error,message:"error in getting user"});
            }else{
              if(result){
                console.log("password: ",result.password);
                payment.findOne({user_id:req.user._id}).exec(function(error,pUser){
                  if(error){
                    res.status(500).send({error:error,message:"error in finding user from payment data"});
                  }else{
                    if(pUser){
                      res.status(409).send({message:"user deatils already exists",result:result});
                    }else{
                      const cryptr = new Cryptr(result.password);
                      var name = cryptr.encrypt(params.name);
                      var email = cryptr.encrypt(params.email);
                      var address = cryptr.encrypt(params.address);
                      var cardNumber = cryptr.encrypt(params.cardNumber);
                      payment.create({
                        user_id:req.user._id,
                        email:email,
                        address:address,
                        cardNumber:cardNumber,
                        name:name
                      }).then(function(paymentUser){
                        res.status(200).send({message:"user details added successfully",result:{
                          name:cryptr.decrypt(paymentUser.name),
                          email:cryptr.decrypt(paymentUser.email),
                          address:cryptr.decrypt(paymentUser.address),
                          cardNumber:cryptr.decrypt(paymentUser.cardNumber)
                        }});
                      })
                    }
                  }
                })
              }else{
                res.status(401).send({message:"user not logged in"});
              }
            }
          })
        }else{
          res.status(403).send({message:"customer address required"});
        }
      }else{
        res.status(403).send({message:"card number required"});
      }
    }else{
      res.status(403).send({message:"email required"});
    }
  }else{
    res.status(403).send({message:"name required"});
  }
}

exports.addUserCard = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request :",params);
    console.log("Number Int :",parseInt(params.number));
  }
  if(params.exp_month!=null && params.exp_month!=undefined && params.exp_month!=''){
    if(params.exp_year!=null && params.exp_year!=undefined && params.exp_year!=''){
      if(params.number!=null && params.number!=undefined && params.number!=''){
        if(params.csv!=null && params.csv!=undefined && params.csv!=''){
          if(params.country!=null && params.country!=undefined && params.country!=''){
            if(params.address_country!=null && params.address_country!=undefined && params.address_country!=''){
              if(params.address_zip!=null && params.address_zip!=undefined && params.address_zip!=''){
                User.findOne({_id:req.user._id}).exec(function(error,result){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(result){
                      stripe.customers.createSource(
                        result.stripeID,
                        { source: {
                          object: 'card',
                          name:req.body.name,
                          exp_month: parseInt(params.exp_month) ,
                          exp_year: parseInt(params.exp_year) ,
                          // country: req.body.country,
                          address_country:req.body.address_country,
                          address_zip:req.body.address_zip,
                          number: parseInt(params.number) ,
                          cvc: parseInt(params.csv)
                        }},
                        function(err, card) {
                          console.log({error:err,Card:card});
                          if(card){
                            User.findOne({_id:req.user._id}).exec(function(error,result){
                              if(error){
                                res.status(500).send({error:error});
                              }else{
                                if(result.defaultCard !=null && result.defaultCard !=undefined && result.defaultCard !=''){
                                  res.status(200).send({error:err,Card:card});
                                }else{
                                  result.defaultCard = card.id;
                                  result.save(function(error,done){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      res.status(200).send({error:err,Card:card});
                                    }
                                  })
                                }
                              }
                            })
                          }else{
                            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                              console.log("Response : ",error,card);
                            }
                            res.status(200).send({error:err,Card:card});
                          }
                        }
                      );
                    }else{
                      res.status(401).send({message:"user not found"});
                    }
                  }
                })
              }else{
                res.status(403).send({message:'address_zip required'});
              }
            }else{
              res.status(403).send({message:'address_country required'});
            }
          }else{
            res.status(403).send({message:'country required'});
          }

        }else{
          res.status(403).send({message:'CSV required'});
        }
      }else{
        res.status(403).send({message:'card number required'});
      }
    }else{
      res.status(403).send({message:'expiry year required'});
    }
  }else{
    res.status(403).send({message:'expiry date required'});
  }
}

exports.retreiveCustomerCards = function(req,res){
  User.findOne({_id:req.user._id}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(result){
        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
          console.log(result.stripeID);
        }
        stripe.customers.listCards(result.stripeID, function(err, customer) {
          if(err){
            console.log(err);
            res.status(500).send({error:err,message:"Stripe get user error"});
          }else{
            var cards = customer.data;
            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
              console.log(cards);
            }
            if(cards.length>0){
              card.find({}).exec(function(error,cardResult){
                if(error){
                  res.status({error:error});
                }else{
                  cards.forEach(function(i,idx,x){
                    var xx = i.brand;
                    if(cardResult.length>0){
                      if(cardResult[0]!=undefined && cardResult[0]!=null){
                        if(cardResult[0][xx.toLowerCase()]!=undefined && cardResult[0][xx.toLowerCase()]!=null){
                          cards[idx]['image'] = cardResult[0][xx.toLowerCase()];
                        }
                      }
                    }

                    if(req.user.defaultCard == i.id){
                      cards[idx]['default'] = true;
                    }else{
                      cards[idx]['default'] = false;
                    }
                    if(idx == x.length-1){
                      res.status(200).send({result:cards});
                    }
                  })
                }
              })

            }else{
              res.status(200).send({result:customer});
            }
          }
        });
      }else{
        res.status(401).send({message:"user not found"});
      }
    }
  })
}

exports.makePaymentWithCard = function(req,res){
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if(req.body.advert_id!=null && req.body.advert_id!=undefined && req.body.advert_id!=''){
    User.findOne({_id:req.user._id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        stripe.charges.create({
          amount: parseFloat(req.body.amount)*100,
          currency: (req.body.currency).toLowerCase(),
          customer:result.stripeID,
          source:req.body.card_id
        }).then(function(fine){
          console.log("****************fine ",fine);
          advertisement.findOne({_id:req.body.advert_id}).exec(function(error,done){
            if(error){
              res.status(500).send({error:error});
            }else{
              if(fine.id!=null){
                done.payment = true;
                payment.create({
                  paymentID: fine.id,
                  amount: fine.amount,
                  created : fine.created,
                  currency : fine.currency,
                  paid:fine.paid,
                  status:fine.status,
                  balance_transaction : fine.balance_transaction,
                  object : fine.object,
                  captured:fine.captured,
                  card_id : fine.source.id,
                  user_id:req.user._id
                }).then(function(completed){
                  if(done.payment_id.length==0){
                    done.payment_id = completed._id;
                  }else{
                    done.payment_id = done.payment_id.concat([completed._id]);
                  }
                  done.save(function(error,semiComplete){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      advertisement.findOne({_id:req.body.advert_id}).populate('payment_id').exec(function(error,done1){
                        if(error){
                          res.status(500).send({error:error,message:"error in populating payment"});
                        }else{
                          sail.findOne({advert_id:req.body.advert_id,buyer_id:req.user._id}).exec(function(error,comp){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              if(comp){
                                comp.status = 'departer pending';
                                comp.payment_id = completed._id ;
                                comp.save(function(error,paymentCompleted){
                                  if(error){
                                    res.status(500).send({message:"error in saving payment to sail",error:error});
                                  }else{
                                    sail.findOne({_id:paymentCompleted._id}).populate("buyer_id seller_id advert_id payment_id").exec(function(error,sailsPopulated){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        res.status(200).send({result:done1,message:"Payment successfull",sail:sailsPopulated});
                                      }
                                    })
                                  }
                                })
                              }else{
                                res.status(404).send({message:"sail does not found"});
                              }
                            }
                          })
                        }
                      })
                    }
                  })
                })
              }else{
                res.status(402).send({message:"Payment unsuccessfull, Please try again"});
              }
            }
          })
          //res.status(200).send({final:fine});
        },(error)=>{console.log("Got error in payment here ");
        res.status(402).send({message : error.message});
      });
    }
  })
}else{
  res.status(403).send({message:"Advertisement ID required"});
}
}

exports.enterAddress = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
    if(params.address!=null && params.address!=undefined && params.address!=''){
      sail.findOne({_id:params.sail_id}).exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          if(result){
            result.status = 'payment pending';
            result.address = params.address;
            result.save(function(error,done){
              if(error){
                res.status(500).send({message:"error in saving sail",error:error});
              }else{
                sail.findOne({_id:params.sail_id}).populate("advert_id buyer_id seller_id payment_id").exec(function(error,final){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                      console.log("Response : ",final);
                    }
                    res.status(200).send({sail:final});
                  }
                })
              }
            })
          }else{
            res.status(404).send({message:"sail not found"});
          }
        }
      })
    }else{
      res.status(403).send({message:"address required"});
    }
  }else{
    res.status(403).send({message:"sail_id required"});
  }
}

exports.addCourierInfo = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
    if(params.tracking_id!=null && params.tracking_id!=undefined && params.tracking_id!=''){
      if(params.courierServiceName!=null && params.courierServiceName!=undefined && params.courierServiceName!=''){
        sail.findOne({_id:params.sail_id}).exec(function(error,result){
          if(error){
            res.status(500).send({error:error});
          }else{
            if(result){
              result.status = 'departed';
              result.tracking_id = params.tracking_id;
              result.courierServiceName = params.courierServiceName;
              result.save(function(error,done){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  sail.findOne({_id:params.sail_id}).populate("advert_id buyer_id seller_id payment_id").exec(function(error,final){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(final){
                        if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                          console.log("Response : ",final);
                        }
                        res.status(200).send({sail:final});
                      }else{
                        res.status(404).send({message:"sail not found"});
                      }
                    }
                  })
                }
              })
            }else{
              res.status(404).send({message:"sail not found"});
            }
          }
        })
      }else{
        res.status(403).send({message:"courierServiceName required"});
      }
    }else{
      res.status(403).send({message:"tracking_id required"});
    }
  }else{
    res.status(403).send({message:"sail_id required"});
  }
}

exports.courierReceived = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
    if(params.status!=null && params.status!=undefined && params.status!=''){
      sail.findOne({_id:params.sail_id,status:{$ne:'canceled'}}).populate("buyer_id seller_id").exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          if(result){
            var sailStatus = result.status;
            result.status = 'received';
            if(params.managePersonally!=null && params.managePersonally!=undefined && params.managePersonally!='' && params.managePersonally==true){
              result.managePersonally = true;
            }
            result.save(function(error,done){
              if(error){
                res.status(500).send({error:error});
              }else{
                offer.update({advert_id:result.advert_id,_id:{$ne:result.offer_id}},{visible:false,status:'rejected'},{multi:true}).then(function(compl){
                  sail.findOne({_id:params.sail_id}).populate("advert_id buyer_id seller_id payment_id").exec(function(error,final){
                    if(error){
                      res.status(500).send({error:error});
                    }else{
                      if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
                        console.log("Response : ",final);
                      }
                      advertisement.findOne({_id:result.advert_id}).exec(function(error,resultAdvert){
                        if(error){
                          res.status(500).send({rror:error})
                        }else{
                          resultAdvert.sold = true;
                          resultAdvert.pictures = [process.env.SOLD_IMAGE].concat(resultAdvert.pictures);
                          resultAdvert.visible = false;
                          resultAdvert.save(function(error,completed){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              var messageNotification = result.buyer_id.name+" will proceed with the payment personally.";
                              offer.update({_id:result.offer_id},{status:'sold',visible:true}).then(function(don){
                                if(sailStatus == 'payment pending'){
                                  var user11 = ""+result.seller_id._id;
                                  var user22 = ""+result.buyer_id._id;
                                  var chatId = "12345"

                                  var comparison = user11.localeCompare(user22);
                                  if (comparison > 0) {
                                    chatId = user11 + user22 + result.advert_id;
                                  } else {
                                    chatId = user22 + user11 + result.advert_id;
                                  }
                                  new chat({ chat_id: chatId, user1: user22, user2: user11, messageFrom: user22,dateTime:Date.now(),message:messageNotification,advert_id:result.advert_id })
                                  .save(function (error, resultchat) {
                                    if (error) {
                                      res.status(500).send({error:error});
                                    } else {
                                      urlRequest ={ method: 'POST',
                                      url: process.env.url+"/testnotification/" + result.buyer_id._id + "/" + messageNotification,
                                      headers:
                                      { 'content-type': 'application/x-www-form-urlencoded',
                                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                      'cache-control': 'no-cache' } }
                                      request(urlRequest, function (error, response, body) {
                                        res.status(200).send({message:"Thanks for shopping with us!",sail:final});
                                      })
                                    }
                                  })
                                }else{
                                  urlRequest ={ method: 'POST',
                                  url: process.env.url+"/testnotification/" + result.seller_id._id + "/" + messageNotification,
                                  headers:
                                  { 'content-type': 'application/x-www-form-urlencoded',
                                  'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                  'cache-control': 'no-cache' } }

                                  request(urlRequest, function (error, response, body) {
                                    var user11 = ""+result.seller_id._id;
                                    var user22 = ""+result.buyer_id._id;
                                    var chatId = "12345"
                                    messageNotification = result.buyer_id.name+" will proceed with the payment personally.";
                                    var comparison = user11.localeCompare(user22);
                                    if (comparison > 0) {
                                      chatId = user11 + user22 + result.advert_id;
                                    } else {
                                      chatId = user22 + user11 + result.advert_id;
                                    }
                                    new chat({ chat_id: chatId, user1: user22, user2: user11, messageFrom: user22,dateTime:Date.now(),message:messageNotification,advert_id:result.advert_id })
                                    .save(function (error, resultchat) {
                                      if (error) {
                                        res.status(500).send({error:error});
                                      } else {
                                        urlRequest ={ method: 'POST',
                                        url: process.env.url+"/testnotification/" + result.buyer_id._id + "/" + messageNotification,
                                        headers:
                                        { 'content-type': 'application/x-www-form-urlencoded',
                                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                                        'cache-control': 'no-cache' } }
                                        request(urlRequest, function (error, response, body) {
                                          res.status(200).send({message:"Thanks for shopping with us!",sail:final});
                                        })
                                      }
                                    })
                                  })
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
          }else{
            res.status(404).send({message:"sail might not found or already processed"});
          }
        }
      })
    }else{
      res.status(403).send({message:"status required"});
    }
  }else{
    res.status(403).send({message:"sail_id required"});
  }
}

exports.deleteCard = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log(params);
  }
  if(params.card_id!=null && params.card_id!=undefined && params.card_id!=''){
    stripe.customers.deleteCard(
      req.user.stripeID,
      params.card_id,
      function(err, confirmation) {
        if(err){
          console.log("error :",err);
          res.status(500).send({error:err});
        }else{
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log("Response :",confirmation);
          }
          res.status(200).send({result:confirmation});
        }
      }
    );
  }else{
    res.status(403).send({message:"Card ID required"});
  }

}

exports.updateDefaultCard = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.card_id!=null && params.card_id!=undefined && params.card_id!=''){
    User.findOne({_id:req.user._id}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        result.defaultCard  = params.card_id;
        result.save(function(error,done){
          if(error){
            res.status(500).send({error:error});
          }else{
            if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
              console.log("Response : ",done);
            }
            res.status(200).send({message:"default card updated successfully",user:done});
          }
        })
      }
    })
  }else{
    res.status(403).send({message:"card_id required"});
  }
}

exports.getSail = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
    sail.findOne({_id:params.sail_id}).populate("seller_id buyer_id advert_id offer_id payment_id").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log("Response : ",result);
          }
          res.status(200).send({sail:result});
        }else{
          res.status(404).send({message:"sail not found",sail:result});
        }
      }
    })
  }else{
    res.status(403).send({message:"sail_id required"});
  }
}

exports.paypalwebhook = function(req,res){
  console.log("********************************************************")
  console.log("Request in Params : ",req.params);
  console.log("Request in Body : ",req.body);
  console.log("********************************************************")
  console.log("******WebHook******",req.url);
  var params = req.params;
  console.log("Params : ",params);
  if(params.status == 'success'){
    User.findOne({_id:req.params.id}).populate("package offers").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        //  res.status(200).send({result:result});
        console.log("User Name : ",result.name);
        advertisement.findOne({_id:params.advert_id}).exec(function(error,done){
          if(error){
            res.status(500).send({error:error});
          }else{
            console.log("Advertisement : ",done.title);
            var paypalSdk = new Paypal({
              userId:    process.env.PAYPAL_USER_ID,
              password:  process.env.PAYPAL_PASSWORD,
              signature: process.env.PAYPAL_SIGNATURE,
              appId:   process.env.PAYPAL_APP_ID, //defaults to false
              sandbox : true
            });

            console.log("Paypal SDK : ",paypalSdk);

            sail.findOne({_id:params.sail_id}).exec(function(error,resultSail){
              if(error){
                res.status(500).send({error:error});
              }else{
                if(resultSail){
                  var pay_key = resultSail.payKey;
                  var params = {
                    payKey: pay_key
                  };
                  console.log("Sail PayKey : ",resultSail.payKey)
                  paypalSdk.paymentDetails(params, function (err, response) {
                    if (err) {
                      console.log(err);
                      res.status(500).send({error:error,message:"error in finding payment info"});
                    } else {
                      payment.create({
                        time:response.responseEnvelope.timestamp,
                        status:response.responseEnvelope.ack,
                        currency:response.currencyCode,
                        description : response.memo,
                        paymentInfoList : response.paymentInfoList,
                        payKey:response.payKey,
                        actionType:response.actionType,
                        feesPayer:response.feesPayer,
                        user_id:params.id
                      }).then(function(completed){
                        if(done.payment_id.length==0){
                          done.payment_id = [completed._id];
                        }else{
                          done.payment_id = done.payment_id.concat([completed._id]);
                        }
                        done.sold = true;
                        done.payment=true;
                        done1.visible = false;
                        done1.boosted = false;
                        done.pictures = [process.env.SOLD_IMAGE].concat(done.pictures);
                        done.save(function(error,semiComplete){
                          if(error){
                            res.status(500).send({error:error,message:"error in saving payment in advertisement"});
                          }else{
                            advertisement.findOne({_id:params.advert_id}).populate('payment_id').exec(function(error,done1){
                              if(error){
                                res.status(500).send({error:error,message:"error in populating payment"});
                              }else{
                                console.log("Sail ID",resultSail._id);
                                resultSail.status = 'departer pending';
                                resultSail.payment_id = completed._id ;
                                resultSail.save(function(error,paymentCompleted){
                                  if(error){
                                    res.status(500).send({message:"error in saving payment to sail",error:error});
                                  }else{
                                    sail.findOne({_id:paymentCompleted._id}).populate("buyer_id seller_id advert_id payment_id").exec(function(error,sailsPopulated){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        //res.status(200).send({result:done1,message:"Payment successfull",sail:sailsPopulated});
                                        res.status(200).send({user:result});
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
                  });
                }else{
                  res.status(404).send({message:"sail not found"})
                }
              }
            })
          }
        })
      }
    })
  }else{
    //payment unsuccessful
    console.log("Payment unsuccessful");
    user.findOne({_id:params.id}).populate("package favouriteAdds").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        res.status(200).send({user:result});
      }
    })
  }
}


exports.paypaloauth = function(req,res){
  // console.log("********************************************************")
  // console.log("Request in Params : ",req.params);
  // console.log("URL in Params : ",req.url);
  // console.log("code in Params : ",req.params.code);
  // console.log("Request in Body : ",req.body);
  console.log("********************************************************")
  // header for call 1
  var code = req.url.replace('/paypal-oauth?code=','');
  var codeUrl = code.split('&');
  var userId = "";
  var options = { method: 'POST',
  url: process.env.PAYPAL_URL,
  qs:
  { grant_type: 'authorization_code',
  code: codeUrl[0],
  return_url: process.env.url+'/paypal-oauth' },
  headers:
  {   'Authorization': process.env.PAYPAL_BASIC1,
  'Cache-Control' : "no-cache" } };
  console.log("Options Request  :",options);
  codeUrl.forEach(function(i,idx,x){
    if(i.indexOf("state=")>-1){
      userId = i.replace("state=","");
    }
    if(idx == x.length-1){
      //  console.log('*************************Request#1',options)
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var body1 = JSON.parse(body);
        //  console.log("********* JSON : ",body1);
        if(body1.access_token){
          options = { method: 'GET',
          url: process.env.PAYPAL_TOKEN_INFO,
          qs: { schema: 'openid' },
          headers:
          { 'cache-control': 'no-cache',
          authorization: 'Bearer '+body1.access_token,
          'content-type': 'application/json' } };
          //  console.log("Options ==================",options);
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var finalJson = JSON.parse(body);
            console.log("+++++++++++++++++++Response =====",body);
            User.findOne({_id:userId}).populate("package favouriteAdds").exec(function(error,result){
              if(error){
                res.status(500).send({error:error});
              }else{
                var exists=false;
                if(result){
                  console.log(result);
                  if(result.connections.length>0){
                    result.connections.forEach(function(j,jdy,y){
                      if(j.type == 'paypal'){
                        exists = true;
                      }
                      if(jdy == y.length-1){
                        if(exists == true){
                          res.status(200).send({result:result })
                        }else{
                          finalJson.type= 'paypal';
                          result.connections = result.connections.concat([finalJson]);
                          result.save(function(error,done){
                            if(error){
                              res.status(500).send({error:error});
                            }else{
                              User.findOne({_id:userId}).populate("package favouriteAdds").exec(function(error,userR){
                                if(error){
                                  res.status(500).send({error:error});
                                }else{
                                  res.status(202).send({user:userR});
                                }
                              })
                            }
                          })
                        }
                      }
                    })
                  }else{
                    finalJson.type= 'paypal';
                    result.connections = result.connections.concat([finalJson]);
                    result.save(function(error,done){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        User.findOne({_id:userId}).populate("package favouriteAdds").exec(function(error,userR){
                          if(error){
                            res.status(500).send({error:error});
                          }else{
                            res.status(202).send({user:userR});
                          }
                        })
                      }
                    })
                  }

                }else{
                  res.status(404).send({user:{} })
                }
              }
            })
          });
        }else{
          res.status(403).send({message: "access token not found regarding user"});
        }
      });
    }
  })
}

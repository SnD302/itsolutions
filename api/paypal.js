var Paypal = require('paypal-adaptive');
var sail = require('../models/sail.js');
var User = require('../models/user.js');
var payment = require('../models/payment.js');
var offer = require('../models/offer.js');
var curr = require('../models/currency.js');
var request = require('request');
//step#2
exports.paypalPay = function(req,res){
  var paypalSdk = new Paypal({
    userId:    process.env.PAYPAL_USER_ID,
    password:  process.env.PAYPAL_PASSWORD,
    signature: process.env.PAYPAL_SIGNATURE,
    appId:   process.env.PAYPAL_APP_ID, //defaults to false
    sandbox : true
  });

  console.log("1",paypalSdk);
  var params = {
    payKey: 'AP-59775118DF763994X'
  };


  paypalSdk.paymentDetails(params, function (err, response) {
    if (err) {
      console.log(err);
    } else {
      // payments details for this payKey, transactionId or trackingId
      console.log(response);
      res.status(200).send({result:response})
    }
  });

}


//step #1
exports.paypalCreatePayment = function(req,res){
  var params = req.body;

  console.log("Request  :",params);



  if(params.sail_id!=null && params.sail_id!=undefined && params.sail_id!=''){
    offer.findOne({sail_id:params.sail_id}).exec(function(error,offeredResult){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(offeredResult){
          var paypalSdk = new Paypal({
            userId:    process.env.PAYPAL_USER_ID,
            password:  process.env.PAYPAL_PASSWORD,
            signature: process.env.PAYPAL_SIGNATURE,
            appId:   process.env.PAYPAL_APP_ID, //defaults to false
            sandbox : true
          });
          var commissionPercentage = parseFloat(process.env.PAYPAL_COMMISSION);
          var price = 0;
          var commission = 0;



          sail.findOne({_id:params.sail_id}).populate("offer_id seller_id advert_id").exec(function(error,result){
            if(error){
              res.status(500).send({error:error});
            }else{
              if(result){
                if(process.env.PAYPAL_MULTIPLY){
                  //commission will be in percentage
                  if(result.seller_id.currency != 'USD'){
                    curr.findOne({currency:result.seller_id.currency}).exec(function(error,currResult){
                      if(error){
                        res.status(500).send({error:error});
                      }else{
                        pricePrimary = (Number(parseFloat(currResult.valueInUSD)*parseFloat(offeredResult.offered_price)).toFixed(2))*(parseFloat(process.env.PAYPAL_COMMISSION)/100);
                        price=(Number(parseFloat(currResult.valueInUSD)*parseFloat(offeredResult.offered_price)).toFixed(2))-pricePrimary;
                        var secondaryEmail = "";
                        if(result.seller_id.connections.length>0){
                          result.seller_id.connections.forEach(function(i,idx,x){
                            if(i.type == 'paypal'){
                              secondaryEmail = i.email;
                            }
                            if(idx == x.length-1){
                              if(secondaryEmail == ""){
                                res.status(403).send({message:"Buyer have not configured paypal yet"});
                              }else{
                                var payload = {
                                  requestEnvelope: {
                                    errorLanguage:  'en_US'
                                  },
                                  actionType:     'PAY',
                                  currencyCode:   result.seller_id.currency,
                                  feesPayer:      'EACHRECEIVER',
                                  memo:           result.advert_id.title,
                                  //:id/:advert_id/:sail_id/:pay_key
                                  //process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/",
                                  cancelUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/failure",
                                  returnUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/success",
                                  receiverList: {
                                    receiver: [
                                      {
                                         email:  secondaryEmail,
                                        //email:'aqib@sofittech.com',
                                        amount: Number(price).toFixed(2),
                                        primary:'true'
                                      },
                                      {
                                        //email:  'sherry@sofittech.com',
                                        email:  process.env.PAYPAL_PRIMARY_EMAIL,
                                        amount: Number(pricePrimary).toFixed(2),
                                        primary:'false'
                                      }
                                    ]
                                  }
                                };

                                console.log('PayLoad1', payload)

                                paypalSdk.pay(payload, function (err, response) {
                                  if (err) {
                                    console.log(err);
                                    res.status(500).send({error:err});
                                  } else {

                                    //////response.payKey
                                    // Response will have the original Paypal API response
                                    console.log(response);
                                    // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
                                    console.log('Redirect to %s', response.paymentApprovalUrl);
                                    result.payKey = response.payKey;
                                    result.save(function(error,savedSail){
                                      if(error){
                                        res.status(500).send({error:error});
                                      }else{
                                        result.payKey = response.payKey;
                                        result.save(function(error,savedSail){
                                          if(error){
                                            res.status(500).send({error:error});
                                          }else{
                                            res.send({result : response.paymentApprovalUrl});
                                          }
                                        })
                                      }
                                    })
                                  }
                                });
                              }
                            }
                          })
                        }else{
                          res.status(403).send({message:"Seller dont have paypal"})
                        }
                      }
                    })
                  }else{
                    //currency not USD
                    console.log(result)
                    pricePrimary = (Number(parseFloat(offeredResult.offered_price)).toFixed(2))*(parseFloat(process.env.PAYPAL_COMMISSION)/100);
                    price=(Number(parseFloat(offeredResult.offered_price)).toFixed(2))-pricePrimary;
                    var secondaryEmail = "";
                    if(result.seller_id.connections.length>0){
                      result.seller_id.connections.forEach(function(i,idx,x){
                        if(i.type == 'paypal'){
                          secondaryEmail = i.email;
                        }
                        if(idx == x.length-1){
                          if(secondaryEmail == ""){
                            res.status(403).send({message:"Buyer have not configured paypal yet"});
                          }else{
                            var payload = {
                              requestEnvelope: {
                                errorLanguage:  'en_US'
                              },
                              actionType:     'PAY',
                              currencyCode:   result.seller_id.currency,
                              feesPayer:      'EACHRECEIVER',
                              memo:           result.advert_id.title,
                              cancelUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/failure",
                              returnUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/success",
                              receiverList: {
                                receiver: [
                                  {
                                     email:  secondaryEmail,
                                    //email:'aqib@sofittech.com',
                                    amount: Number(price).toFixed(2),
                                    primary:'true'
                                  },
                                  {
                                    //email:  'sherry@sofittech.com',
                                    email:  process.env.PAYPAL_PRIMARY_EMAIL,
                                    amount: Number(pricePrimary).toFixed(2),
                                    primary:'false'
                                  }
                                ]
                              }
                            };

                            console.log('PayLoad2', JSON.stringify(payload))
                            paypalSdk.pay(payload, function (err, response) {
                              if (err) {
                                console.log(err);
                                res.status(500).send({error:err});
                              } else {

                                //////response.payKey
                                // Response will have the original Paypal API response
                                console.log(response);
                                // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
                                console.log('Redirect to %s', response.paymentApprovalUrl);
                                result.payKey = response.payKey;
                                result.save(function(error,savedSail){
                                  if(error){
                                    res.status(500).send({error:error});
                                  }else{
                                    res.send({result : response.paymentApprovalUrl});
                                  }
                                })
                              }
                            });
                          }
                        }
                      })
                    }else{
                      res.status(403).send({message:"Seller dont have paypal"})
                    }
                  }
                }else{
                  //            payment commission is straight

                  if(result.seller_id.currency != 'USD'){
                    if(process.env.PAYPAL_COMMISSION>Number(parseFloat(currResult.valueInUSD)*parseFloat(offeredResult.offered_price)).toFixed(2)){
                      console.log("price is less than commission");
                      //******************************************************************check what to do with it
                    }else{
                      curr.findOne({currency:result.seller_id.currency}).exec(function(error,currResult){
                        if(error){
                          res.status(500).send({error:error});
                        }else{
                          pricePrimary = parseFloat(process.env.PAYPAL_COMMISSION);
                          price=(Number(parseFloat(currResult.valueInUSD)*parseFloat(offeredResult.offered_price)).toFixed(2))-pricePrimary;
                          var secondaryEmail = "";
                          if(result.seller_id.connections.length>0){
                            result.seller_id.connections.forEach(function(i,idx,x){
                              if(i.type == 'paypal'){
                                secondaryEmail = i.email;
                              }
                              if(idx == x.length-1){
                                if(secondaryEmail == ""){
                                  res.status(403).send({message:"Buyer have not configured paypal yet"});
                                }else{
                                  var payload = {
                                    requestEnvelope: {
                                      errorLanguage:  'en_US'
                                    },
                                    actionType:     'PAY',
                                    currencyCode:   result.seller_id.currency,
                                    feesPayer:      'EACHRECEIVER',
                                    memo:           result.advert_id.title,
                                    cancelUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/failure",
                                    returnUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/success",
                                    receiverList: {
                                      receiver: [
                                        {
                                           email:  secondaryEmail,
                                          //email:'aqib@sofittech.com',
                                          amount: Number(price).toFixed(2),
                                          primary:'true'
                                        },
                                        {
                                          //email:  'sherry@sofittech.com',
                                          email:  process.env.PAYPAL_PRIMARY_EMAIL,
                                          amount: Number(pricePrimary).toFixed(2),
                                          primary:'false'
                                        }
                                      ]
                                    }
                                  };
                                  paypalSdk.pay(payload, function (err, response) {
                                    if (err) {
                                      console.log(err);
                                      res.status(500).send({error:err});
                                    } else {

                                      //////response.payKey
                                      // Response will have the original Paypal API response
                                      console.log(response);
                                      // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
                                      console.log('Redirect to %s', response.paymentApprovalUrl);
                                      result.payKey = response.payKey;
                                      result.save(function(error,savedSail){
                                        if(error){
                                          res.status(500).send({error:error});
                                        }else{
                                          res.send({result : response.paymentApprovalUrl});
                                        }
                                      })
                                    }
                                  });
                                }
                              }
                            })
                          }else{
                            res.status(403).send({message:"Seller dont have paypal"})
                          }
                        }
                      })
                    }

                  }else{
                    //currency not USD
                    if(process.env.PAYPAL_COMMISSION>parseFloat(offeredResult.offered_price)){
                      console.log("price is less than commission");
                      //******************************************************************check what to do with it
                    }else{
                      pricePrimary = parseFloat(process.env.PAYPAL_COMMISSION);
                      price=(Number(parseFloat(offeredResult.offered_price)).toFixed(2))-pricePrimary;
                      var secondaryEmail = "";
                      if(result.seller_id.connections.length>0){
                        result.seller_id.connections.forEach(function(i,idx,x){
                          if(i.type == 'paypal'){
                            secondaryEmail = i.email;
                          }
                          if(idx == x.length-1){
                            if(secondaryEmail == ""){
                              res.status(403).send({message:"Buyer have not configured paypal yet"});
                            }else{
                              var payload = {
                                requestEnvelope: {
                                  errorLanguage:  'en_US'
                                },
                                actionType:     'PAY',
                                currencyCode:   result.seller_id.currency,
                                feesPayer:      'EACHRECEIVER',
                                memo:           result.advert_id.title,
                                cancelUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/failure",
                                returnUrl:      process.env.url+'/paypal-webhook/'+req.user._id+"/"+result.advert_id._id+"/"+result._id+"/success",                                receiverList: {
                                  receiver: [
                                    {
                                       email:  secondaryEmail,
                                      //email:'aqib@sofittech.com',
                                      amount: Number(price).toFixed(2),
                                      primary:'true'
                                    },
                                    {
                                      //email:  'sherry@sofittech.com',
                                      email:  process.env.PAYPAL_PRIMARY_EMAIL,
                                      amount: Number(pricePrimary).toFixed(2),
                                      primary:'false'
                                    }
                                  ]
                                }
                              };
                              paypalSdk.pay(payload, function (err, response) {
                                if (err) {
                                  console.log(err);
                                  res.status(500).send({error:err});
                                } else {

                                  //////response.payKey
                                  // Response will have the original Paypal API response
                                  console.log(response);
                                  // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily
                                  console.log('Redirect to %s', response.paymentApprovalUrl);
                                  result.payKey = response.payKey;
                                  result.save(function(error,savedSail){
                                    if(error){
                                      res.status(500).send({error:error});
                                    }else{
                                      res.send({result : response.paymentApprovalUrl});
                                    }
                                  })
                                }
                              });
                            }
                          }
                        })
                      }else{
                        res.status(403).send({message:"Seller dont have paypal"})
                      }
                    }
                  }
                }
              }
            }
          })
        }else{
          res.status(404).send({message:"sail not found"});
        }
      }
    })

  }else{
    res.status(403).send({message:"sail_id required"});
  }
}

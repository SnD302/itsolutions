const mobile = require('../models/mobile.js');
const mobileBrand = require('../models/mobileBrand.js');
var httpreq = require('httpreq');
var groupBy = require('group-by');
var enums = require('../models/enum.js');
var store = require('../models/store.js');
var mongoose = require('mongoose');
var devic = require('../models/device.js');
var xcheck = 30;
exports.createNewBrand = function(req,res){
  var params = req.body;

  if(params.brandName!=null && params.brandName !=""){
    mobileBrand.findOne({brandName:params.brandName}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          res.status(203).send({message:"Brand already exists."});
        }else{
          var url = 'https://fonoapi.freshpixl.com/v1/getdevice';
          var options = {
            parameters: {device: params.brandName, token: '77d6aac1d3110fb09899d9bd34c200df6c156b337e31c29b'},
            timeout: 9000
          };
          httpreq.post(url, options, function (err, respon) {
            if (err) {
              res.status(500).send({error:err});
            } else {
              try{
                mobileBrand.create({
                  brandName:req.body.brandName,
                  picture:req.body.picture
                }).then(function(resultCreated){
                  var val = JSON.parse(respon.body);
                  for(var i=0;i<val.length;i++){
                    val[i].Brand = resultCreated._id;
                    if(i==val.length-1){
                      mobile.insertMany(val ,{ordered : false}, (err, docs) => {
                        if(err){
                          if(err.code == 11000){
                            res.status(200).send({result:JSON.parse(respon.body)});
                          }
                        }else{
                          res.status(200).send({result:JSON.parse(respon.body)});
                        }
                      })
                    }
                  }
                })
              } catch(error){
                //console.log("error catch")
              }
            }
          });
        }
      }
    })
  }else{
    res.status(403).send({message:"Mobile name is required"});
  }
}

exports.getMobileSpecs = function(req,res){
  console.log(req.body);
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",req.body);
  }
  if(req.body.brand_id!=null && req.body.brand_id!=undefined){
    var searchObject = {};

    searchObject.Brand = req.body.brand_id;
    if(req.body.type == 'mobile' || req.body.type == null || req.body.type == undefined || req.body.type == ''){
      searchObject = { $gt: 1.0,$lt: parseFloat(process.env.screenSize) };
    }else if(req.body.type == 'tablet'){
      searchObject = { $gte: parseFloat(process.env.screenSize) };
    }
    mobile.find({Brand:req.body.brand_id,screenDiagonal:searchObject}).populate("Brand").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        if(result){
          enums.find({}).exec(function(error,done){
            if(error){
              res.status(500).send({error:error});
            }else{
              store.find({}).exec(function(error,stor){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(200).send({result:result,enums:done[0],store:stor});
                }
              })

            }
          })
        }else{enums.find({}).exec(function(error,done){
          if(error){
            res.status(500).send({error:error});
          }else{
            var sizeA = 0;
            if(req.body.DeviceName!=null && req.body.DeviceName!=""){
              if(req.body.type == 'mobile'){
                sizeA = 5;
              }else{
                sizeA = 8;
              }
              mobile.create({
                DeviceName:req.body.DeviceName,
                Brand : req.body.brand_id,
                screenDiagonal : sizeA
              }).then(function(doneit){
                store.find({}).exec(function(error,stor){
                  if(error){
                    res.status(500).send({error:error});
                  }else{
                    res.status(202).send({message:"New device created successfully",result:doneit,store:stor});
                  }
                })

              })
            }else{
              store.find({}).exec(function(error,stor){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(404).send({message:"no data found",enums:done[0],store:stor});
                }
              })

            }
          }
        })
      }
    }
  })
}else if(req.body.device_id!=null && req.body.device_id!=undefined){
  mobile.findOne({_id:req.body.device_id}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      enums.find({}).exec(function(error,done){
        if(error){
          res.status(500).send({error:error});
        }else{
          store.find({}).exec(function(error,stor){
            if(error){
              res.status(500).send({error:error});
            }else{
              res.status(200).send({result:result,enums:done[0],store:stor});
            }
          })
        }
      })
    }
  })
}
else{
  res.status(403).send({ message : "Brand ID is required" });
}
}

exports.getMobileBrands = function(req,res){
  mobileBrand.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      res.status(200).send({result:result});
    }
  })
}

exports.createBrand = function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params);
  }
  if(params.brandName !=null && params.brandName!=""){
    mobileBrand.create({
      picture :params.picture,
      brandName:params.brandName
    }).then(function(result){
      res.status(200).send({result:result});
    })
  }else{
    res.status(403).send({message:"brandName required"});
  }
}

exports.createMobileBrand =function(req,res){
  var params = req.body;
  if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
    console.log("Request : ",params)
  }
  if (params.phoneModelName != null && params.phoneModelName != ""
  && params.brand != null && params.brand != ""
)
{
  var size = 0;
  if(params.type =='mobile'){
    size = 5;
  }else{
    size = 8;
  }
  mobile.findOne( { DeviceName: params.phoneModelName, Brand: params.brand } ).exec(function(error, result){

    if(error){
      res.status(500).send({error:error});
    }else{

      if(result){
        res.status(203).send({message:"Phone Model already exists",result:result});
      }
      else {
        mobile.create(
          {DeviceName: params.phoneModelName, Brand: params.brand,screenDiagonal:size}
        ).then(function(done){
          res.status(200).send({result:done});
        })
      }

    }

  })
}
else if(params.brandName!=null && params.brandName!=""){
  mobileBrand.findOne({brandName:params.brandName}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(result){
        res.status(203).send({message:"Brand Name already exists",result:result});
      }else{
        mobileBrand.create({
          brandName:params.brandName
        }).then(function(done){
          res.status(200).send({result:done});
        })
      }
    }
  })
}else{
  res.status(403).send({message:"Parameters missing"});
}
}


exports.getMobilesArray = function(req,res){
  var params = req.body;
  if(params.mobiles!=null && params.mobiles!=undefined && params.mobiles!=''){
      var dd =  params.mobiles.split(",");
      dd.splice(dd.length-1,1);
      mobile.find({_id:dd}).populate("Brand").exec(function(error,result){
        if(error){
          res.status(500).send({error:error});
        }else{
          res.status(200).send({result:result});
        }
      })
  }else{
    res.status(403).send({message:"mobiles required"})
  }
}


exports.createNewDevices = function(req,res){
  var data  = ["iPhone", "iPhone 3G", "iPhone 3GS", "iPhone 4", "iPhone 4 CDMA", "iPad Wi-Fi + 3G", "iPad Wi-Fi", "Test", "iPad 2 Wi-Fi", "iPad 2 Wi-Fi + 3G", "iPad 2 CDMA", "iPad 3 Wi-Fi + Cellular", "iPad 3 Wi-Fi", "iPhone 5", "iPad mini Wi-Fi + Cellular", "iPad mini Wi-Fi", "iPad 4 Wi-Fi + Cellular", "iPad 4 Wi-Fi", "iPhone 5s", "iPhone 5c", "iPad mini 2", "iPad Air", "iPhone 6", "iPhone 6 Plus", "iPad mini 3", "iPad mini 4", "iPad Pro", "Watch Sport 38mm", "Watch Sport 42mm", "Watch 38mm", "Watch 42mm", "Watch Edition 38mm", "Watch Edition 42mm", "iPad Pro 9.7", "Watch Series 1 Sport 42mm", "Watch Series 1 Sport 38mm", "Watch Edition Series 2 38mm", "Watch Edition Series 2 42mm", "Watch Series 2 38mm", "Watch Series 2 42mm", "Watch Series 2 Sport 42mm", "Watch Series 2 Sport 38mm", "iPhone 8 Plus", "iPhone 7 Plus", "iPad 9.7 (2017)", "iPad Pro 10.5 (2017)", "iPad Pro 12.9 (2017)", "iPhone X", "Watch Series 3 Aluminum", "Watch Series 3", "Watch Edition Series 3", "iPad 9.7 (2018)", "SGH-250", "SGH-500", "SGH-600", "SGH-800", "SGH-2100", "SGH-810", "SGH-2200", "SGH-2400", "A100", "A110", "M100", "N100", "Q100", "A200", "N300", "A300", "A400", "N400", "R200", "R210", "R220", "N105", "Q105", "Q200", "T100", "N620", "A500", "Q300", "S100", "V100", "N500", "A800", "T400", "T700", "S300", "P400", "T500", "T200", "V200", "Watch Phone", "E400", "X400", "P500", "X410", "D700", "i500", "i700", "C100", "S200", "P100", "E105", "E715", "D100", "X100", "X600", "S500", "E100", "P705", "Z100", "D410", "E700", "X430", "E600", "E410", "X450", "i505", "Z105", "P510", "P730", "E800", "P710", "E810", "E300", "D710", "X900", "X910", "C110", "E610", "X120", "X610", "i250", "E500", "E310", "E330", "X460", "D500", "C200", "E630", "E850", "D488", "D428", "Z107", "E720", "X480", "X640", "Galaxy S9", "Honor 9 lite", "One m7", "SCH-B100", "E350", "Z300", "Z500", "Z130", "Nokia 3210", "Nokia 5110", "Nokia 6110", "Nokia 6130", "Nokia 6150", "Nokia 8110", "Nokia 6210", "Nokia 6250", "Nokia 7110", "Nokia 9000 Communicator", "Nokia 9110i Communicator", "Nokia 8210", "Nokia 8810", "Nokia 8850", "Nokia 8890", "Nokia 3110", "Nokia 2110", "Nokia 3310", "Nokia 9210 Communicator", "Nokia 8250", "Nokia 3330", "Nokia 6310", "Nokia 8310", "Nokia 5210", "Nokia 6510", "Nokia 5510", "Nokia 7650", "Nokia 3350", "Nokia 6500", "Nokia 8910", "Nokia 3410", "Nokia 3510", "Nokia 6310i", "Nokia 7210", "Nokia 9210i Communicator", "Nokia 6610", "Nokia 3610", "Nokia 3510i", "Nokia 3650", "Nokia 6650", "Nokia 3530", "Nokia 2100", "Nokia 6800", "Nokia 5100", "Nokia 8910i", "Nokia 7250", "Nokia 6100", "Nokia N-Gage", "Nokia 3300", "Nokia 6220", "Nokia 6108", "Nokia 7250i", "Nokia 3100", "Nokia 6600", "Nokia 1100", "Nokia 2300", "Nokia 3200", "Nokia 7600", "Nokia 3660", "Nokia 6810", "Nokia 6820", "Nokia 6230", "Nokia 7200", "Nokia 7700", "Nokia 3108", "Nokia 5140", "Nokia 9500", "Nokia 7610", "Nokia 6620", "Nokia 6610i", "Nokia 3120", "Nokia N-Gage QD", "Nokia 3220", "Nokia 6260", "Nokia 6630", "Nokia 2650", "Nokia 6170", "Nokia 2600", "Nokia 9300", "Nokia 7260", "Nokia 7270", "Nokia 7280", "Nokia 6670", "Nokia 6020", "Nokia 3230", "Nokia 7710", "Nokia 3128", "Nokia 6822", "Nokia 6101", "Nokia 6680", "Nokia 6681", "Nokia 6030", "Nokia 6230i", "Nokia 6021", "Nokia 8800", "Nokia 5140i", "Nokia N70", "Nokia N91", "Nokia N90", "Nokia 1110", "BLU Vivo 4.3", "Asus VivoTab RT TF600T", "BLU Vivo 4.65 HD", "BLU Vivo 4.8 HD", "BLU Vivo IV", "vivo X5Max", "vivo X5", "vivo Y27", "vivo Y28", "BLU Vivo Air", "vivo X5Max+", "vivo Y11", "vivo X5Pro", "vivo Y35", "vivo Y37", "vivo V1 Max", "vivo V1", "BLU Vivo Air LTE", "vivo Y31", "vivo X6", "vivo X6Plus", "vivo Y51", "BLU Vivo XL", "vivo Xplay5", "vivo Xplay5 Elite", "vivo X6S", "vivo X6S Plus", "vivo V3Max", "vivo V3", "BLU Vivo 5R", "vivo X7 Plus", "vivo X7", "vivo Y67", "BLU Vivo 6", "vivo V5", "vivo X9", "vivo X9 Plus", "vivo Xplay6", "vivo V5 Plus", "vivo V5 Lite", "BLU Vivo XL2", "vivo Y55s", "vivo Y25", "vivo V5s", "vivo X9s Plus", "vivo X9s", "vivo Y53", "vivo Y69", "BLU Vivo 8", "vivo X20", "vivo V7+", "vivo X20 Plus", "vivo Xplay7", "vivo V7", "vivo X20 Plus UD", "BLU Vivo One", "BLU Vivo X", "vivo Y65", "vivo V9", "BLU Vivo X Link", "vivo X21", "BLU Vivo XL3 Plus", "vivo Y71", "BLU Vivo One Plus", "BLU Vivo XL3", "vivo V9 Youth", "vivo Y83", "QMobile Noir X800", "QMobile Noir X950", "QMobile Noir X900", "QMobile Noir X700", "QMobile Noir X600", "QMobile Noir X550", "QMobile Noir X500", "QMobile Noir X450", "QMobile Noir X400", "QMobile Noir X90", "QMobile Noir X350", "QMobile Noir X80", "QMobile Noir X60", "QMobile Noir X35", "QMobile W1", "QMobile T200 Bolt", "QMobile Noir M90", "QMobile Noir M300", "QMobile Noir LT600", "QMobile Noir LT150", "QMobile Noir i5", "QMobile Noir i5i", "QMobile Noir i8", "QMobile Noir i12", "QMobile Linq L10", "QMobile Linq X100", "QMobile Explorer 3G", "QMobile Noir Z3", "QMobile Noir Z4", "QMobile Noir Z5", "QMobile Noir Z7", "QMobile Noir V4", "QMobile Noir A75", "QMobile T50 Bolt", "QMobile Noir i7", "QMobile Noir i10", "QMobile Noir A8i", "QMobile Noir S1", "QMobile Noir A115 ATV", "QMobile Linq X300", "QMobile A1", "QMobile Linq X70", "QMobile QTab X50", "QMobile QTab V10", "QMobile Noir A950", "QMobile Noir A750", "QMobile Noir A550", "QMobile Noir A500", "QMobile Power3", "QMobile Noir A120", "QMobile Noir A110", "QMobile B800", "QMobile Noir A15 3D", "QMobile E990 Sirocco Edition", "QMobile B100TV", "QMobile M800", "QMobile Noir Z9", "QMobile Linq L15", "QMobile Noir E8", "QMobile Noir Z12", "QMobile Noir Z9 Plus", "QMobile Noir Z12 Pro", "QMobile Noir Z14", "QMobile Noir LT750", "QMobile Noir i6 Metal HD", "QMobile Noir E2", "QMobile Noir A1", "QMobile J7 Pro", "QMobile M6", "QMobile M6 Lite", "QMobile Energy X2", "QMobile King Kong Max", "QMobile M350 Pro", "QMobile E1", "QMobile Noir S6 Plus", "QMobile Noir J7", "Sony CM-DX 1000", "Sony CM-DX 2000", "Sony CMD Z1", "Sony CMD Z1 plus", "Sony CMD C1", "Sony CMD CD5", "Sony CMD Z5", "Sony CMD J5", "Sony CMD MZ5", "Sony CMD J6", "Sony CMD J7", "Sony CMD J70", "Sony CMD Z7", "Sony Ericsson T68i", "Sony Ericsson Z700", "Sony Ericsson P800", "Sony Ericsson T200", "Sony Ericsson T300", "Sony Ericsson T600", "Sony Ericsson T100", "Sony Ericsson T610", "Sony Ericsson T230", "Sony Ericsson T105", "Sony Ericsson Z200", "Sony Ericsson Z600", "Sony Ericsson P900", "Sony Ericsson T630", "Sony Ericsson K700", "Sony Ericsson S700", "Sony Ericsson Z500", "Sony Ericsson F500i", "Sony Ericsson K500", "Sony Ericsson P910", "Sony Ericsson S710", "Sony Ericsson V800", "Sony Ericsson J200", "Sony Ericsson T290", "Sony Ericsson K300", "Sony Ericsson Z800", "Sony Ericsson K600", "Sony Ericsson W800", "Sony Ericsson K750", "Sony Ericsson J300", "Sony Ericsson D750", "Sony Ericsson V600", "Sony Ericsson K508", "Sony Ericsson K608", "Sony Ericsson J210", "Sony Ericsson Z520", "Sony Ericsson W600", "Sony Ericsson W550", "Sony Ericsson P990", "Sony Ericsson Z300", "Sony Ericsson J220", "Sony Ericsson J230", "Sony Ericsson W810", "Sony Ericsson M600", "Sony Ericsson J100", "Sony Ericsson W950", "Sony Ericsson K790", "Sony Ericsson K800", "Sony Ericsson Z530", "Sony Ericsson K510", "Sony Ericsson K310", "Sony Ericsson Z525", "Sony Ericsson W700", "Sony Ericsson Z710", "Sony Ericsson W710", "Sony Ericsson W850", "Sony Ericsson Z550", "Sony Ericsson M608", "Sony Ericsson V630", "Sony Ericsson W830", "Sony Ericsson K320", "Sony Ericsson Z558", "Sony Ericsson Z310", "Sony Ericsson W200", "Sony Ericsson W880", "Sony Ericsson K220", "Sony Ericsson K200", "Sony Ericsson K550", "Sony Ericsson J120", "Sony Ericsson J110", "Sony Ericsson K550im", "Sony Ericsson W888", "Sony Ericsson W660", "Sony Ericsson P1", "Sony Ericsson S500", "Sony Ericsson T650", "Sony Ericsson T250", "Ericsson GH 218", "Ericsson GO 118", "Ericsson GS 18", "Ericsson GH 337", "Ericsson GF 337", "Ericsson GS 337", "Ericsson GH 388", "Ericsson GF 388", "Ericsson GA 628", "Ericsson GH 688", "Ericsson GF 768", "Ericsson PF 768", "Ericsson GF 788", "Ericsson GF 788e", "Ericsson S 868", "Ericsson SH 888", "Ericsson I 888", "Ericsson A1018s", "Ericsson T10s", "Ericsson T18s", "Ericsson T28s", "Ericsson T28 World", "Ericsson R250s PRO", "Ericsson T36", "Ericsson A2618", "Ericsson R320", "Ericsson R380", "Ericsson R310s", "Ericsson R520m", "Ericsson T20s", "Ericsson T29s", "Ericsson A2628", "Ericsson T20e", "Ericsson T39", "Ericsson T68", "Ericsson A3618", "Ericsson T65", "Ericsson T66", "Ericsson R600", "LG LG-200", "LG LG-500", "LG LG-600", "LG W3000", "LG W5200", "LG G3000", "LG G5200", "LG W7000", "LG G7000", "LG W7020", "LG G8000", "LG G7020", "LG G5300", "LG G5400", "LG G7030", "LG G7100", "LG G7070", "LG G7050", "LG LG 510w", "LG B1200", "LG U8100", "LG U8150", "LG G5310", "LG G5500", "LG G7120", "LG G1500", "LG T5100", "LG G7200", "LG G1600", "LG U8110", "LG L1100", "LG L3100", "LG C3100", "LG C1200", "LG C1100", "LG C1400", "LG U8120", "LG G3100", "LG F2100", "LG C2200", "LG L5100", "LG A7150", "LG F7250", "LG G1800", "LG G1700", "LG F2300", "LG G1610", "LG M4300", "LG C3300", "LG C3310", "LG C3400", "LG U8200", "LG U8210", "LG U8138", "LG F1200", "LG B2000", "LG B2100", "LG C3320", "LG C2100", "LG U8180", "LG F2400", "LG L341i", "LG M4410", "LG L342i", "LG M4330", "LG F2410", "LG B2250", "LG P7200", "LG U8380", "LG U8360", "LG U8330", "LG U880", "LG F2250", "LG S5200", "LG S5100", "New Model", "Model", "Infinity A1", "A2 Exclusive", "Ghhhhbhhhh", "No model", "LG F3000", "LG C1150", "LG B2050", "LG M6100", "LG KG920", "LG KU730", "LG V9000", "LG U8550", "LG U890", "LG S5300", "LG KG320", "LG KE600", "LG KG800", "LG KG225", "LG KG220", "LG U900", "LG KG210", "LG KG810", "LG KG245", "LG U400", "LG U300", "LG CU500", "LG KG240", "LG C2500", "LG KG190", "Motorola M3888", "Motorola M3788", "Motorola M3688", "Motorola M3588", "Motorola M3288", "Motorola M3188", "Motorola cd920", "Motorola cd930", "Motorola StarTAC 130", "Motorola StarTAC 85", "Motorola StarTAC 75+", "Motorola StarTAC 75", "Motorola StarTAC Rainbow", "Motorola SlimLite", "Motorola V3688", "Motorola Timeport L7089", "Motorola Timeport P7389", "Motorola Talkabout T2288", "Motorola d520", "Motorola A6188", "Motorola V3690", "Motorola V2288", "Motorola T180", "Motorola V50", "Motorola V.box(V100)", "Motorola Accompli 009", "Motorola Timeport 280", "Motorola V66", "Motorola Timeport 250", "Motorola Talkabout T191", "Motorola V60", "Motorola Talkabout T192", "Motorola Timeport 260", "Motorola Accompli 008", "Motorola Accompli 388", "Motorola V70", "Motorola V60i", "Motorola E360", "Motorola T720", "Motorola C331", "Motorola C332", "Motorola C333", "Motorola V600", "Motorola C350", "Motorola A760", "Motorola C230", "Motorola E390", "Motorola A388c", "Motorola T720i", "Motorola V66i", "Motorola T190", "Motorola C300", "Motorola v8088", "Motorola V500", "Motorola V300", "Motorola E365", "Motorola C200", "Motorola MPx200", "Motorola V690", "Motorola A920", "Motorola A835", "Motorola A830", "Motorola E380", "Motorola T725", "Motorola V750", "Motorola C450", "Motorola C336", "Motorola C550", "Motorola V150", "Motorola V525", "Motorola V290", "Motorola V295", "Motorola C250", "Motorola V878", "Motorola A925", "Motorola V80", "Motorola V303", "Motorola V180", "Motorola V220", "Motorola V400p", "Motorola A1000", "Motorola E1000", "Motorola V1000", "Motorola C380/C385", "Motorola A630", "Motorola C205", "Motorola A768i", "Motorola MPx220", "Motorola MPx", "Motorola MPx100", "Motorola E680", "Motorola E398", "Motorola C650", "Motorola A840", "Motorola V291", "Motorola C975", "Motorola V501", "Motorola V872", "Motorola RAZR V3", "Motorola V555", "Huawei T201", "Huawei T330", "Huawei T161L", "Huawei T211", "Huawei T261L", "Huawei T208", "Huawei T158", "Huawei T156", "Huawei U1000", "Huawei U1100", "Huawei U1310", "Huawei U3300", "Huawei U120", "Huawei U121", "Huawei U7310", "Huawei G6600 Passport", "Huawei U7510", "Huawei U1250", "Huawei U9150", "Huawei T552", "Huawei U8220", "Huawei U8100", "Huawei U8110", "Huawei U8300", "Huawei U8230", "Huawei U9130 Compass", "Huawei G7002", "Huawei U8150 IDEOS", "Huawei IDEOS S7", "Huawei U1270", "Huawei IDEOS S7 Slim", "Huawei U8510 IDEOS X3", "Huawei U7520", "Huawei IDEOS S7 Slim CDMA", "Huawei G6150", "Huawei U5900s", "Huawei G7010", "Huawei U3100", "Huawei G6608", "Huawei Ascend II", "Huawei C3200", "Huawei U8850 Vision", "Huawei Impulse 4G", "Huawei G5500", "Huawei G7206", "Huawei U8860 Honor", "Huawei U8180 IDEOS X1", "Huawei U8650 Sonic", "Huawei G6620", "Huawei U8350 Boulder", "Huawei U8520 Duplex", "Huawei MediaPad", "Huawei MediaPad S7-301w", "Huawei Pillar", "Huawei G7005", "Huawei G7300", "Huawei M886 Mercury", "Huawei Ascend P1s", "Huawei Ascend P1", "Huawei U5510", "Huawei Ascend D quad", "Huawei Ascend D quad XL", "Huawei Ascend D1", "Huawei MediaPad 10 FHD", "Huawei Ascend G300", "Huawei D51 Discovery", "Huawei T8300", "Huawei Fusion U8652", "Huawei G6609", "Huawei Ascend Q M5660", "Huawei Activa 4G", "Huawei Ascend Y100", "Huawei G5000", "Huawei G6310", "Huawei MediaPad 7 Lite", "Huawei Ascend G600", "Huawei Ascend G330", "Huawei Ascend D1 XL U9500E", "Huawei Ascend P1 XL U9200E", "Huawei Fusion 2 U8665", "Huawei Ascend P1 LTE", "Huawei Ascend W1", "Huawei Summit", "Huawei Ascend Y", "Huawei Honor 2", "Huawei G5520", "Huawei G6800", "Huawei Ascend Y201 Pro", "Huawei Ascend W3", "Huawei Ascend G500", "Huawei Ascend D2", "Huawei Ascend Mate", "Huawei Ascend G615", "Huawei Ascend P2", "Lenovo IdeaPad S2", "Lenovo LePhone S2", "Lenovo LePad S2005", "Lenovo LePad S2007", "Lenovo LePad S2010", "Lenovo IdeaPad A1", "Lenovo IdeaPad K1", "Lenovo ThinkPad", "Lenovo K800", "Lenovo A60", "Lenovo E156", "Lenovo A336", "Lenovo Q330", "Lenovo Q350", "Lenovo S800", "Lenovo A335", "Lenovo A185", "Lenovo A65", "Lenovo P700i", "Lenovo K860", "Lenovo A660", "Lenovo S560", "Lenovo P770", "Lenovo K900", "Lenovo S890", "Lenovo S720", "Lenovo A800", "Lenovo A690", "Lenovo IdeaTab A2107", "Lenovo A789", "Lenovo IdeaTab S6000H", "Lenovo IdeaTab A3000", "Lenovo IdeaTab A1000", "Lenovo S920", "Lenovo A390", "Lenovo A820", "Lenovo A830", "Lenovo S820", "Lenovo P780", "Lenovo A706", "Lenovo S5000", "Lenovo Vibe X S960", "Lenovo A630", "Lenovo Yoga Tablet 8", "Lenovo Yoga Tablet 10", "Lenovo Vibe Z K910", "Lenovo A269i", "Lenovo A369i", "Lenovo A516", "Lenovo S650", "Lenovo S930", "Lenovo A859", "Lenovo A880", "Lenovo S660", "Lenovo S850", "Lenovo S860", "Lenovo Yoga Tablet 10 HD+", "Lenovo IdeaTab S6000F", "Lenovo IdeaTab S6000L", "Lenovo IdeaTab S6000", "Lenovo A7-30 A3300", "Lenovo A7-50 A3500", "Lenovo A8-50 A5500", "Lenovo A10-70 A7600", "Lenovo A526", "Lenovo Golden Warrior S8", "Lenovo A680", "Lenovo A889", "Lenovo S939", "Lenovo Vibe Z2 Pro", "Lenovo Golden Warrior A8", "Lenovo A850+", "Lenovo Vibe X2", "Lenovo S750", "Lenovo A536", "Lenovo Tab S8", "Lenovo A328", "Lenovo Yoga Tablet 2 8.0 ", "Lenovo Yoga Tablet 2 10.1", "Lenovo S90 Sisley", "Lenovo A606", "Lenovo Golden Warrior Note 8", "Lenovo K3", "Lenovo Yoga Tablet 2 Pro", "Lenovo A916", "Lenovo Vibe X2 Pro", "Lenovo P90", "Lenovo Tab 2 A7-10", "Lenovo Tab 2 A7-30", "Lenovo Vibe Z3 Pro", "HTC MTeoR", "HTC TyTN", "HTC P3300", "HTC P3600", "HTC S310", "HTC S620", "HTC P4350", "HTC P3350", "HTC P3400", "HTC Advantage X7500", "HTC S710", "HTC Shift", "HTC P6300", "HTC Touch", "HTC TyTN II", "HTC S630", "HTC S730", "HTC P3600i", "HTC Touch Dual", "HTC P6500", "HTC Touch Cruise", "HTC P3470", "HTC Advantage X7510", "HTC Touch Diamond", "HTC Touch Pro", "HTC S740", "HTC Touch HD", "HTC Touch 3G", "HTC Touch Viva", "HTC MAX 4G", "HTC Touch Cruise 09", "HTC Dream", "HTC Touch Diamond2", "HTC Magic", "HTC Snap", "HTC Hero", "HTC Ozone", "HTC Tattoo", "HTC Pure", "HTC Google Nexus One", "HTC Desire", "HTC Touch Diamond2 CDMA", "HTC 7 Trophy", "HTC Touch HD T8285", "HTC Droid Incredible", "HTC Wildfire", "HTC HD7", "HTC Aria", "HTC Desire Z", "HTC Evo 4G", "HTC DROID ERIS", "HTC Paradise", "HTC Desire HD", "HTC Schubert", "HTC Touch Pro2 CDMA", "HTC Hero CDMA", "HTC Touch Pro CDMA", "HTC Touch Diamond CDMA", "HTC Arrive", "HTC 7 Surround", "HTC 7 Pro", "HTC Wildfire CDMA", "HTC Gratia", "HTC EVO Shift 4G", "HTC ThunderBolt 4G", "HTC Freestyle", "HTC Merge", "HTC Desire HD2", "HTC Desire S", "HTC Wildfire S", "HTC Salsa", "HTC ChaCha", "HTC Incredible S", "HTC Flyer", "HTC Sensation", "HTC Ignite", "HTC Prime", "HTC HD7S", "HTC EVO 3D CDMA", "HTC EVO View 4G", "HTC EVO 3D", "HTC Sensation 4G", "HTC DROID Incredible 2", "HTC Rider", "HTC Glacier", "HTC Flyer Wi-Fi", "HTC Lead", "HTC Raider 4G", "HTC Trophy", "HTC Status", "Asus V80", "Asus V75", "Asus V66", "Asus V55", "Asus M310", "Asus M307", "Asus M303", "Asus P525", "Asus P505", "Asus P535", "Asus Z810", "Asus P735", "Asus P526", "Asus J501", "Asus M530w", "Asus J502", "Asus V88i", "Asus Z801", "Asus P527", "Asus P750", "Asus P550", "Asus M930", "Asus P320", "Asus P552w", "Asus P565", "Garmin-Asus nuvifone M20", "Garmin-Asus nuvifone G60", "Asus P835", "Garmin-Asus nuvifone M10", "Garmin-Asus nuvifone A50", "Garmin-Asus A10", "Asus E600", "Asus Transformer TF101", "Asus PadFone", "Asus Transformer Prime TF201", "Asus Transformer Prime TF700T", "Asus Memo", "Asus Transformer Pad TF300T", "Asus Transformer Pad Infinity 700 3G", "Asus Transformer Pad Infinity 700 LTE", "Asus Transformer Pad Infinity 700", "Asus Google Nexus 7", "Asus PadFone 2", "Asus Google Nexus 7 Cellular", "Asus Memo Pad ME172V", "Asus Fonepad", "Asus PadFone Infinity", "Asus Memo Pad Smart 10", "Asus Transformer Pad TF300TG", "Asus Memo Pad HD7 16 GB", "Asus Transformer Pad TF701T", "Asus Fonepad Note FHD6", "Asus Memo Pad FHD10", "Asus Google Nexus 7 (2013)", "Asus Memo Pad 8 ME180A", "Asus Memo Pad 10", "Asus Transformer Book Trio", "Asus Memo Pad HD7 8 GB", "Asus Zenfone 4", "Asus PadFone mini (Intel)", "Asus Transformer Pad TF303CL", "Asus Transformer Pad TF103C", "Asus Fonepad 7 FE375CG", "Asus Fonepad 8 FE380CG", "Asus Memo Pad 7 ME176C", "Asus Memo Pad 8 ME181C", "Asus Memo Pad 8 ME581CL", "Asus Zenfone 4 A450CG", "Asus Zenfone 5 A500KL", "Asus PadFone X", "Asus Memo Pad 7 ME572C", "Asus Memo Pad 7 ME572CL", "Asus PadFone X mini", "Asus Fonepad 7 FE375CXG", "Asus Memo Pad 10 ME103K", "Asus Pegasus", "Asus Zenfone 2 ZE551ML", "Asus Zenfone Zoom ZX550", "Asus Zenfone C ZC451CG", "Asus Zenfone 2 ZE500CL", "Asus Zenfone 2 ZE550ML", "Posh Pegasus Plus C351", "Asus ZenPad 8.0 Z380KL", "Find 5", "U705T Ulike 2", "R601", "R811 Real", "T29", "R817 Real", "U701 Ulike", "Find", "R819", "N1", "R821T FInd Muse", "R815T Clover", "R1 R829T", "Neo", "Find 7", "Find 7a", "R1S", "N1 mini", "R3", "Neo 5", "R1001 Joy", "R2001 Yoyo", "Neo 3", "N3", "R5", "U3", "Find 5 Mini", "A31", "Mirror 3", "Joy Plus", "R7", "R7 Plus", "Neo 5s", "Neo 5 (2015)", "Joy 3", "Mirror 5s", "Mirror 5", "R5s", "R7 lite", "R7s", "A33", "A53", "F1", " ", "F1 Plus", "R9 Plus", "F1s", "A37", "A59", "R9s", "R9s Plus", "A57", "F3 Plus", "F3", "A77 (Mediatek)", "A77", "A71", "F5", "A39", "F5 Youth", "A83", "A71 (2018)", "R15", "R15 Pro", "F7", "A1", "A3", "HP iPAQ Voice Messenger", "HP Slate6 VoiceTab", "HP Slate7 VoiceTab", "HP 7 VoiceTab", "HP Slate6 VoiceTab II", "HP Slate7 VoiceTab Ultra", "Amazon Kindle Fire", "Amazon Kindle Fire HD", "Amazon Kindle Fire HD 8.9", "Amazon Kindle Fire HD 8.9 LTE", "Amazon Kindle Fire HD (2013)", "Amazon Kindle Fire HDX 8.9", "Amazon Kindle Fire HDX", "Amazon Fire Phone", "Amazon Fire HD 6", "Amazon Fire HD 7", "Amazon Fire HDX 8.9 (2014)", "Amazon Fire 7", "Amazon Fire HD 8", "Amazon Fire HD 10", "Amazon Fire 7 (2017)", "Amazon Fire HD 8 (2017)", "Amazon Fire HD 10 (2017)", "Google Nexus S 4G", "Google Nexus S I9020A", "Google Nexus 10 P8110", "Google Pixel C", "Google Pixel", "Google Pixel XL", "Google Pixel 2 XL", "Google Pixel 2", "Lava Iris 550Q", "Lava Iris 406Q", "Lava Iris 450 Colour", "Lava Iris Pro 20", "Lava Iris 401e", "Lava Iris Pro 30", "Lava Iris 349S", "Lava Iris 503e", "Lava Iris 349+", "Lava Iris 404e", "Lava Iris 506Q", "Lava Iris 505", "Lava Iris 504q", "Lava 3G 402+", "Lava 3G 402", "Lava Iris 405+", "Lava Iris 503", "Lava Iris 504q+", "Lava Iris 356", "Lava 3G 354", "Lava 3G 415", "Lava Iris X1", "Lava Iris 402e", "Lava Iris 350m", "Lava 3G 412", "Lava Iris X5", "Lava Iris 460", "Lava Iris 360 Music", "Lava Iris 310 Style", "Lava Iris Fuel 50", "Lava Iris 410", "Lava Iris 352 Flair", "Lava Iris 404 Flair", "Lava Iris 400Q", "Lava Iris 400s", "Lava Iris 250", "Lava Iris Win1", "Lava Iris Fuel 60", "Lava Iris 350", "Lava Iris 325 Style", "Lava Iris X8", "Lava Iris 401", "Lava Iris 348", "Lava Iris 465", "Lava Iris 470", "Lava Iris X1 mini", "Lava Iris X1 Grand", "Lava Iris Alfa", "Lava Icon", "Lava Flair P1i", "Lava Iris X1 Atom S", "Lava Pixel V1", "Lava Flair Z1", "Lava Iris Atom 2", "Lava Pixel V2", "Lava Flair E2", "Lava Iris Fuel F1 Mini", "Lava Iris Atom X", "Lava Iris Atom 2X", "Lava X10", "Lava Iris Atom 3", "Lava Iris Atom", "Lava X3", "Lava V5", "Lava P7", "Lava A71", "Lava Iris Fuel F2", "Lava A97", "Lava X28", "Lava P7+", "Lava A48", "Lava X38", "Lava A32", "Lava A68", "Lava X50", "Lava X17", "Lava X81", "Lava X46", "Lava A89", "Lava A82", "Lava A79", "Lava A59", "Lava A67", "Lava A76", "Lava A72", "Lava X11", "Lava A88", "Lava V2 3GB", "Lava V2 s", "Lava A76+", "Lava A51", "Lava X41 Plus", "Lava X50 Plus", "Lava A50", "Lava A55", "Lava X19", "Lava A73", "Lava X28 Plus", "Orange San Francisco", "Orange Stockholm", "Orange Barcelona", "Orange Rio II", "Orange Atlanta", "Orange San Francisco II", "Orange Malibu", "Orange Tahiti", "Orange San Diego", "Orange Dallas", "Orange Miami", "Orange Sydney", "Orange Rio", "Orange Monte Carlo", "Orange Hiro", "Orange Gova", "Orange Reyo", "Orange Rono", "Alcatel Orange Klif", "T-Mobile Sidekick Slide", "T-Mobile G1", "T-Mobile Shadow", "T-Mobile Sidekick", "T-Mobile Sidekick LX", "T-Mobile Sidekick 3", "T-Mobile Wing", "T-Mobile Dash", "T-Mobile MDA Vario IV", "T-Mobile MDA Compact IV", "T-Mobile MDA Basic", "T-Mobile Shadow 2", "T-Mobile Sidekick LX 2009", "T-Mobile MDA Compact V", "T-Mobile MDA Vario V", "T-Mobile myTouch 3G", "T-Mobile Vairy Touch", "T-Mobile Dash 3G", "T-Mobile G2 Touch", "T-Mobile Pulse", "T-Mobile Tap", "T-Mobile Pulse Mini", "T-Mobile Vairy Touch II", "T-Mobile Vairy Text", "T-Mobile HD2", "T-Mobile myTouch 3G Slide", "T-Mobile Garminfone", "T-Mobile myTouch 3G 1.2", "T-Mobile G2", "T-Mobile myTouch 4G", "T-Mobile Comet", "T-Mobile Vibe E200", "Galaxy Tab T-Mobile T849", "T-Mobile Sidekick 4G", "T-Mobile G2x", "T-Mobile G-Slate", "T-Mobile Move", "T-Mobile myTouch 4G Slide", "T-Mobile Vairy Text II", "T-Mobile myTouch", "T-Mobile SpringBoard", "T-Mobile Vivacity", "Nokia Lumia 710 T-Mobile", "T-Mobile Move Balance", "T-Mobile Arizona", "T-Mobile Energy", "T-Mobile Prism", "T-Mobile myTouch qwerty", "T-Mobile myTouch 2", "T-Mobile myTouch Q 2", "T-Mobile Concord", "T-Mobile Prism II", "T-Mobile Revvl", "BlackBerry 6230", "BlackBerry 6720", "BlackBerry 7230", "BlackBerry 7730", "BlackBerry 7100t", "BlackBerry 7100v", "BlackBerry 7100x", "BlackBerry 7290", "BlackBerry 8700c", "BlackBerry 8707v", "BlackBerry 7130v", "BlackBerry 7130g", "BlackBerry 7130c", "BlackBerry Pearl 8100", "BlackBerry 8800", "BlackBerry 8830 World Edition", "BlackBerry Curve 8300", "BlackBerry 8820", "BlackBerry Curve 8310", "BlackBerry Curve 8320", "BlackBerry Pearl 8120", "BlackBerry Pearl 8110", "BlackBerry Bold 9000", "BlackBerry Pearl Flip 8220", "BlackBerry Storm 9500", "BlackBerry Storm 9530", "BlackBerry Curve 8900", "BlackBerry Tour 9630", "BlackBerry Curve 8520", "BlackBerry Storm2 9520", "BlackBerry Bold 9700", "BlackBerry Storm2 9550", "BlackBerry Pearl 3G 9100", "BlackBerry Bold 9650", "BlackBerry Pearl 3G 9105", "BlackBerry Style 9670", "BlackBerry Curve 3G 9300", "BlackBerry Bold 9780", "BlackBerry Storm3", "BlackBerry Curve 3G 9330", "BlackBerry Pearl Flip 8230", "BlackBerry Curve 8530", "BlackBerry Curve 8330", "BlackBerry Curve 8980", "BlackBerry Curve 9360", "BlackBerry Volt", "BlackBerry Bold Touch 9930", "BlackBerry Curve Touch CDMA", "BlackBerry Curve 9350", "BlackBerry PlayBook", "BlackBerry 4G LTE PlayBook", "BlackBerry PlayBook WiMax", "BlackBerry 4G PlayBook HSPA+", "BlackBerry Torch 9860", "BlackBerry Pearl 8130", "BlackBerry Curve Touch", "BlackBerry Torch 9850", "BlackBerry Curve 9370", "BlackBerry Curve 9320", "BlackBerry Curve 9220", "BlackBerry PlayBook 2012", "BlackBerry Z10", "BlackBerry Q10", "BlackBerry Q5", "BlackBerry A10", "BlackBerry 9720", "BlackBerry Z30", "BlackBerry Z3", "BlackBerry Passport", "BlackBerry Z20", "BlackBerry Leap", "BlackBerry DTEK50", "BlackBerry DTEK60", "BlackBerry Keyone", "BlackBerry Aurora", "BlackBerry Motion", "OnePlus One", "OnePlus 2", "OnePlus X", "OnePlus 3", "OnePlus 3T", "OnePlus 5", "OnePlus 5T", "OnePlus 6", "Xiaomi Mi 2", "Xiaomi Mi 1S", "Xiaomi Mi 2S", "Xiaomi Redmi", "Xiaomi Mi 2A", "Xiaomi Mi 3", "Xiaomi Redmi Note", "Xiaomi Mi Pad 7.9", "Xiaomi Redmi 1S", "Xiaomi Mi 4", "Xiaomi Redmi Note 4G", "Xiaomi Mi 4 LTE", "Xiaomi Redmi 2", "Xiaomi Mi Note", "Xiaomi Mi 5", "Xiaomi Redmi Note 2", "Xiaomi Redmi 2A", "Xiaomi Mi 4i", "Xiaomi Mi 5 Plus", "Xiaomi Redmi 2 Prime", "Xiaomi Mi 4c", "Xiaomi Redmi 2 Pro", "Xiaomi Mi Pad 2", "Xiaomi Redmi Note Prime", "Xiaomi Mi Note 2", "Xiaomi Redmi 4 Prime", "Xiaomi Redmi 3s Prime", "Xiaomi Redmi 3x", "Xiaomi Redmi 3s", "Xiaomi Mi Max", "Xiaomi Mi 5s Plus", "Xiaomi Mi Mix", "Xiaomi Mi 5c", "Xiaomi Mi Pad 3", "Xiaomi Mi Mix 2", "Xiaomi Redmi Pro 2", "Xiaomi Mi Max 2", "Xiaomi Redmi 4 (4X)", "Xiaomi Mi 6 Plus", "Xiaomi Redmi Y1 (Note 5A)", "Xiaomi Mi 6c", "Xiaomi Redmi Y1 Lite", "Xiaomi Mi Max 3", "Xiaomi Mi 7", "Xiaomi Mi Mix 2s", "Xiaomi Black Shark", "ZTE F103", "ZTE F100", "ZTE F101", "ZTE F600", "ZTE F870", "ZTE F928", "ZTE F952", "ZTE F233", "ZTE F912", "ZTE Xiang", "ZTE Raise", "ZTE E811", "ZTE X760", "ZTE Bingo", "ZTE Coral200 Sollar", "ZTE A261", "ZTE S302", "ZTE X990", "ZTE Blade", "ZTE Racer", "ZTE E N72", "ZTE F951", "ZTE Salute F350", "ZTE S213", "ZTE N280", "ZTE N290", "ZTE X990D", "ZTE R221", "ZTE F107", "ZTE Sage", "ZTE Skate", "ZTE Amigo", "ZTE Libra", "ZTE U900", "ZTE V9+", "ZTE V9", "ZTE V821", "ZTE Rio", "ZTE R220", "ZTE R230", "ZTE Avail", "ZTE Racer II", "ZTE Tania", "ZTE Memo", "ZTE Score", "ZTE Warp", "ZTE R228 Dual SIM", "ZTE R228", "ZTE Chorus", "ZTE FTV Phone", "ZTE Light Tab V9C", "ZTE Light Tab 2 V9A", "ZTE Optik", "ZTE N910", "ZTE PF200", "ZTE Era", "ZTE PF112 HD", "ZTE Skate Acqua", "ZTE Orbit", "ZTE Kis V788", "ZTE PF 100", "ZTE T98", "ZTE Light Tab 3 V9S", "ZTE V96", "ZTE Light Tab 300", "ZTE Grand X V970", "ZTE V880E", "ZTE Nova 3.5", "ZTE Nova 4 V8000", "ZTE Nova Messenger", "ZTE Style Q", "ZTE Style Messanger", "ZTE V875", "ZTE Blade II V880+", "ZTE Score M", "ZTE N721", "ZTE U880E", "ZTE Grand X LTE T82", "ZTE N880E", "ZTE Flash", "ZTE Grand X IN", "ZTE Blade III", "ZTE Grand Era U895", "ZTE Anthem 4G", "ZTE Warp Sequent", "ZTE Groove X501", "ZTE V887", "ZTE Kis III V790", "ZTE V889M", "ZTE Avid 4G", "ZTE Grand S", "ZTE V81", "ZTE Blade C V807", "ZTE Open", "ZTE Grand Memo V9815", "ZTE Grand X Quad V987", "ZTE Geek V975", "ZTE Blade III Pro", "ZTE Grand X2 In", "ZTE Director", "Prestigio MultiPhone 3540 Duo", "Prestigio MultiPhone 4040 Duo", "Prestigio MultiPhone 4044 Duo", "Prestigio MultiPhone 4055 Duo", "Prestigio MultiPhone 4300 Duo", "Prestigio MultiPhone 4500 Duo", "Prestigio MultiPhone 4505 Duo", "Prestigio MultiPhone 4322 Duo", "Prestigio MultiPhone 5000 Duo", "Prestigio MultiPhone 5044 Duo", "Prestigio MultiPhone 5300 Duo", "Prestigio MultiPhone 5430 Duo", "Prestigio MultiPhone 5400 Duo", "Prestigio MultiPhone 3400 Duo", "Prestigio MultiPhone 5450 Duo", "Prestigio MultiPhone 5451 Duo", "Prestigio MultiPhone 5500 Duo", "Prestigio MultiPhone 5501 Duo", "Prestigio MultiPhone 7500", "Prestigio MultiPhone 7600 Duo", "Prestigio MultiPhone 8500 Duo", "Prestigio MultiPhone 8400 Duo", "Prestigio MultiPhone 5503 Duo", "Prestigio MultiPhone 5504 Duo", "Prestigio MultiPhone 5508 Duo", "BLU Vivo Selfie", "BLU Vivo 5 Mini", "Asus PadFone Infinity 2", "Asus PadFone mini", "Asus Zenfone 5 A500CG", "Asus PadFone E", "Asus PadFone Infinity Lite", "Asus PadFone S", "Asus Fonepad 7 (2014)", "Asus Zenfone 5 Lite A502CG", "Asus Fonepad 7 FE375CL", "Asus Zenfone 5 A501CG", "vivo X3S", "vivo Y22", "vivo X5Max Platinum Edition", "vivo Y15S", "QMobile Noir Z8 Plus", "QMobile Noir Z8", "QMobile Noir Z6", "QMobile Noir LT680", "QMobile Noir LT700 Pro", "QMobile Noir A6", "Sony Ericsson W900", "Sony Ericsson K610", "Sony Ericsson W300", "Sony Ericsson W580", "iPhone 4s", "iPad Air 2", "iPhone 6s", "iPhone 6s Plus", "iPhone SE", "iPhone 7", "iPhone 8", "vivo Xplay3S", "vivo Xshot", "vivo Y15", "BLU Vivo 5", "vivo X21 UD", "QMobile Noir LT250", "QMobile Noir i6", "QMobile Noir i9", "QMobile Noir S5", "QMobile Noir S2", "QMobile Noir Z10", "QMobile Noir S9", "QMobile Noir S4", "Sony Ericsson Z1010", "Sony Ericsson K618", "Sony Ericsson Z610", "Sony Ericsson K810", "Sony Ericsson W610", "Sony Ericsson Z750", "Huawei U8500 IDEOS X2", "Huawei U9000 IDEOS X6", "Huawei U8800 IDEOS X5", "Huawei U8800 Pro", "Huawei Ascend Y200", "Huawei Ascend G510", "Lenovo S880", "Lenovo A60+", "Lenovo A850", "Lenovo A316i", "Lenovo Vibe Z2", "Lenovo S580", "Lenovo S856", "Lenovo A319", "Lenovo A6000", "Lenovo Vibe Shot", "HTC Touch Pro2", "HTC Touch2", "HTC HD2", "HTC Tilt2", "HTC Smart", "HTC Legend", "HTC HD mini", "HTC 7 Mozart", "HTC Inspire 4G", "HTC Titan", "Asus Fonepad 7", "Asus Zenfone 6 A600CG", "Asus Zenfone 6 A601CG", "Asus Fonepad 7 FE171CG", "Asus PadFone mini 4G (Intel)", "Posh Pegasus 4G S400", "R1x", "Neo 7", "R11", "R11 Plus", "R11s", "R11s Plus", "Google Nexus S", "Google Nexus S I9023", "Lava Iris Pro 30+", "Lava Fuel F1", "T-Mobile myTouch 3G Fender Edition", "T-Mobile myTouch Q", "BlackBerry Bold Touch 9900", "BlackBerry Torch 9800", "BlackBerry Torch 9810", "BlackBerry Curve 9380", "BlackBerry Bold 9790", "BlackBerry Classic", "BlackBerry Classic Non Camera", "Xiaomi Redmi Note 3 (MediaTek)", "Xiaomi Redmi Note 3", "Xiaomi Redmi 3", "Xiaomi Mi 4s", "Xiaomi Redmi 3 Pro", "Xiaomi Redmi Note 4 (MediaTek)", "Xiaomi Redmi Pro", "Xiaomi Redmi 4 (China)", "Xiaomi Redmi 4a", "Xiaomi Mi 6", "Xiaomi Redmi Note 4", "Xiaomi Redmi Note 4X", "Xiaomi Mi Note 3", "Xiaomi Redmi 5", "Xiaomi Mi A1", "Xiaomi Redmi Note 5 Pro", "Xiaomi Redmi 5A", "Xiaomi Redmi Note 5 (Redmi 5 Plus)", "Xiaomi Redmi Note 5 (China)", "Xiaomi Mi A2 (Mi 6X)"]
  var url = 'https://fonoapi.freshpixl.com/v1/getdevice';
  // for(var i = xcheck-30;i<xcheck;i++){
    var options = {
      parameters: {device: 'Nokia X', token: 'aa35b78fcae4e4f68cf3469c4106b5ce55ebea32fe7f99ef'},
      timeout: 90000
    };
    var det = [];
    httpreq.post(url, options, function (err, respon) {
      if (err) {
        console.log("error",err);
      } else {
        if(respon.body){
          var data = JSON.parse(respon.body);
         // res.status(200).send({result:data});
            data.forEach(function(x){
              x['DeviceName'] = x['DeviceName'].replace(x['Brand']+" ","");
              if(x['size']!=undefined && x['size']!=null){
                var spl = x['size'].split(" ");
                x['screenDiagonal'] = parseFloat(spl[0]);
              }
              x['Brand'] = "5b2b85a73a49153b16326cdf";
                mobile.create(x).then(function(result){
                  console.log("created");
                })
            })
// //          res.status(200).send({result:JSON.parse(respon.body)})
//           var data = JSON.parse(respon.body);
//           console.log(data.length,xcheck);
//           if(data.length>0){
//             data.forEach(function(x){
//               devic.create(x);
//             })
//           }else{
//             console.log("notheing matched");
//           }
        }
      }
    })
  // }
  //xcheck = xcheck + 30;
}

const express = require('express');
var app = express();
var router = express.Router();
var user = require('../api/user.js');
var payment = require('../api/payment.js');
var enums = require('../api/enum.js');
var physicalIssues = require('../api/physicalIssues.js');
var paypal = require('../api/paypal.js');
router.post('/register', user.register);
router.post('/authenticate', user.authenticate);
router.post('/fb/register',user.registerWithFacebook);
var advert = require('../api/advertisement.js');
var condition = require('../api/condition.js');
//router.get('/',advert.testCall);
router.post('/checkParams',advert.checkParams);
router.post('/searchMobile',advert.searchMobile);

//router.post('/placeAdd',advert.placeAdd);

//router.get('/testnotification/:id/:message/:filterID',user.sendPushNotification);
var mobile = require('../api/mobile.js');
router.post('/getMobileSpecs',mobile.getMobileSpecs);
router.post('/createBrand',mobile.createBrand);
router.get('/getAddsWithGroup',advert.getAddsWithGroup);
router.post('/createPhysicalCondition',physicalIssues.createPhysicalCondition);
router.post('/uploadImageCreate',physicalIssues.uploadImage);
router.post('/createContition',condition.createContition);
router.post('/getMobile',user.getMobile);
router.post('/changePassword',user.changePassword);
router.post('/adminAuthenticate',user.adminAuthenticate);
//router.post('/uploadImage',physicalIssues.uploadImageAdvert);
router.get('/changeResolution',user.changeResolution);
router.post('/getEnums',enums.getEnums);
router.post('/searchFilter',advert.searchFilters);
router.post('/getMobileBrands',mobile.getMobileBrands);
router.post('/getAdvertismentDetatils',advert.getAdvertisementDetails);
router.get('/testFind',advert.testFind);
router.post('/rectangleLocationSearch',advert.rectangleLocationSearch);
router.post('/uploadImageWeb/:id',physicalIssues.uploadImageWeb);
router.post('/uploadUserImageWeb/:id',physicalIssues.uploadUserImageWeb);
router.post('/totalAds',advert.totalAds);
router.post('/getMobilesArray',mobile.getMobilesArray);
router.post('/createNewDevices',mobile.createNewDevices);
router.post('/testnotification/:id/:message',advert.sendPushNotification);
router.post('/sendPushNotification/:id/:message',advert.sendPushNotification);
router.post('/addView',advert.addView);
// router.get('/paypal-webhook/:id/:advert_id/:sail_id/:status',payment.paypalwebhook);
// router.post('/paypal-webhook/:id',payment.paypalwebhook);
// router.get('/paypal-oauth',payment.paypaloauth);
// router.post('/paypal-oauth',payment.paypaloauth);
// router.get('/paypalPay',paypal.paypalPay);



module.exports = router;

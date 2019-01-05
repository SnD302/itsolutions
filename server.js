// =============================================import external moduels=============================
require('dotenv').config();
var app = require('express')();
var express = require('express');
const mongoose = require('mongoose');
global.Promise = require('bluebird');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cluster = require('cluster');
var httpCluser = require('http');
const numCPUs = require('os').cpus().length;
var http = require('http').Server(app);
var io = require('socket.io')(http);
const passport = require('passport');
var user = require('./models/user.js');
var chat = require('./models/chat.js');
const ForexDataClient = require("forex-quotes");
let client = new ForexDataClient(process.env.CURRENCY_CONVERTER_API_KEY);
var multer = require('multer');
var cron = require('node-cron');
var fs = require('fs');
var request = require('request');
var ejs = require('ejs');
var curr = require('./models/currency.js');
var User = require('./models/user.js');
var currencyConversions = require('./models/currencyConversions.js');
var mobile = require('./models/mobile.js');
var Advertisement = require('./models/advertisement.js');
var path = require('path'); // node path module
var port = process.env.PORT || 1338;
var cookieParser = require('cookie-parser')
var cors = require('cors');
app.use(cors());
app.set('socketio', io);
app.use(cookieParser());
app.get('/privacy',function(req,res){
    res.render('privacy',{
      data:{
        day:'01',
        month:'Sep',
        year:'2018'
      }
    });
  })

  app.get('/terms',function(req,res){
      res.render('terms',{
        data:{
          day:'01',
          month:'Sep',
          year:'2018'
        }
      });
    })

  var payment = require('./api/payment.js');
  var paypal = require('./api/paypal.js');
  app.get('/paypal-webhook/:id/:advert_id/:sail_id/:status',payment.paypalwebhook);
  app.post('/paypal-webhook/:id',payment.paypalwebhook);
  app.get('/paypal-oauth',payment.paypaloauth);
  app.post('/paypal-oauth',payment.paypaloauth);
  app.get('/paypalPay',paypal.paypalPay);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));




  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(cors({origin: 'http://localhost:4200'}));
// app.use(cors({origin:"https://celx-dev-angular.herokuapp.com"}));
// app.use(cors({origin:"http://localhost:5000"}));
// ============================================initialize variables==================================
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise; // fix for "DeprecationWarning: Mongoose: mpromise replacement"
// set envrioment variables if production is false
if (process.env.NODE_ENV !== 'production') {
  process.env.url = 'http://localhost:3000/'; //  Development
  process.env.MONGODB_URI = process.env.dbConnect1; // Development
  process.env.jwtsecret = process.env.jwtsecret1;
  process.env.CLOUDINARY_URL = process.env.CLOUDINARY_URL1;
}
// ==========================================database connection===================================
mongoose.connect(process.env.MONGODB_URI,
  {
    useMongoClient: true ,
    poolSize: 20,
    keepAlive: 300000,
  }); // database conneciton to azure pro database
  mongoose
  .connection
  .once('connected', () => console.log('Connected to database'));
  // =======================================configure middlewear======================================
  app.use(morgan('dev'));
  // json manipulation on server side
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));
  app.use(bodyParser.json({limit: '50mb'}));
  // =======================================passport initializtion routes======================================
  app.use(passport.initialize());
  app.use(passport.session());

  io.on('connect', function (socket) {

    console.log("hey you are connected to soket messaging service of CELX");
    io.to(socket.id).emit('hey you are connected to soket messaging service of zafaafh');
    //console.log("Socket Request :",socket.request._query);
    if(socket.request._query.user_id !=null && socket.request._query.user_id !="" ){
      user.findOne({ _id: socket.request._query.user_id }).then(function (pp) {
        //console.log("user Found ");
        if (pp == null || pp == undefined) {
        } else {
          pp.socketId = socket.id;
          pp.save(function (socketResult) {
            //console.log(" Connected to Sockets");
          })
        }
      })
    }
    socket.on('user',function(user_id){
      console.log("Socket ID : ",user_id);
      if(user_id !=null ){
        user.findOne({ _id: user_id.user_id }).then(function (pp) {
          if (pp == null || pp == undefined) {
          } else {
            pp.socketId = socket.id;
            pp.save(function (socketResult) {
              console.log("User Connected to Sockets");
            })
          }
        })
      }
    })
    socket.on('disconnect', function () {
      if(socket.id !=null ){
        user.update({ socketId: socket.id }, { socketId: "12345" }).exec(function (error, socketFound) {
          if(process.env.DEBUG_LOGS == true || process.env.DEBUG_LOGS == 'true'){
            console.log(" disconnected" );
          }
        })
      }
    });
    socket
    .on('connect', function () {
      //console.log('user connected');
    });

    var chatId = "1234";
    var user11 = "";
    var user22 = "";
    var user1Socket;
    var user2Socket;
    var msgFrom;
    socket.on('startchat', function (msg) {
      console.log("Request : ",msg);
      user11 = ""+msg.myId;
      user22 = ""+msg.hisId;

      console.log("user1", user11);
      console.log("user2", user22);

      var comparison = user11.localeCompare(user22);


      console.log("comparison result", user11, user22, "comparison" ,comparison);
      console.log("message from user :",msg);
      if (user11>user220) {
        chatId = user11 + user22 + ""+msg.advert_id;
        console.log("I'm user 1", chatId);
      } else {
        chatId = user22 + user11 + ""+msg.advert_id;
        console.log("I'm user 2", chatId);
      }
      console.log("Start Chat chatId: ", chatId);
      socket.room = chatId;
      if (user1Socket == null || user1Socket == undefined) {
        user1Socket = socket.id;
      } else {
        user2Socket = socket.id;
      }
      socket.join(chatId);
    });
    app.get('/sendOfferAlert/:id/:message',function(req,res){
      socket.broadcast.to(req.params.id).emit("onAny",params.message);
      console.log("socket notification sent");
      res.status(200).send({message:"done"});
    })

    app.get('/sendMessageAlert/:id', function (req, res) {
      socket.broadcast.to(req.params.id).emit("onAny","You have recieved a new message.")
    })



    socket.on("room", function (msg) {
      console.log("Chatroom message : ",msg);
      console.log("User1Socket", user1Socket, "Socket.id", socket.id);
      if (socket.id === user1Socket) {
        msgFrom = user11;
      } else {
        msgFrom = user22;
      }
      chat
      .findOne({ chat_id: chatId }).populate('user2')
      .exec(function (error, result) {

        console.log("SSS Err", error, "Result", result);
        if (error) {
          console.log("Error in sockets saving chat ",error)
        } else if (!result) {
          var otherID = "";
          if (msg.myId == user11) {
            otherID = user22;
          } else {
            otherID = user11;
          }
          if(msg.myId !='' && msg.hisId!=''){
            new chat({ chat_id: chatId, user1: msg.myId, user2: msg.hisId,  dateTime: Date.now(), messageFrom: msg.myId, message: msg.text,advert_id:msg.advert_id })
            .save(function (error, chatAdded) {
              if (error) {
                console.log("Error in sockets saving chat ",error)
              } else {
                var userNotification = ""
                if (user11 == msg.myId) {
                  userNotification = user22;
                } else {
                  userNotification = user11;
                }
                user.findOne({ _id: msg.hisId }).then(function (notify) {
                  var message = "You have recieved a new message.";
                  if (notify.socketId == "12345") {
                    var urlRequest = { method: 'POST',
                      url: process.env.url+"/testnotification/" + notify._id + "/" + message,
                      headers:
                      { 'content-type': 'application/x-www-form-urlencoded',
                      'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                      'cache-control': 'no-cache' } }
                    request(urlRequest, function (error, response, body) {

                    });
                  } else {
                    socket.broadcast.to(notify.socketId).emit("onAny","You have recieved a new message.")
                  }
                })
                io
                .to(socket.room)
                .emit('room', { chat: chatAdded });
              }
            })
          }else{
            console.log("Message sending failed");
            socket.broadcast.to(notify.socketId).emit("onAny","Message sending failed,Please try again later.")
          }

        } else {
          if(msg.myId !='' && msg.hisId!=''){
            var otherID = "";
            if (msg.myId == result.user1) {
              otherID = result.user2;
            } else {
              otherID = result.user1;
            }
            new chat({ chat_id: chatId, user1: msg.myId, user2: otherID,  dateTime: Date.now(), messageFrom: msg.myId, message: msg.text ,advert_id:msg.advert_id})
            .save(function (error, chatAdded) {
              if (error) {
                console.log("Error in sockets saving chat ",error)
              } else {
                var userNotification = ""
                if (result.user1 == msg.myId) {
                  userNotification = result.user2;
                } else {
                  userNotification = result.user1;
                }
                User.findOne({ _id: msg.hisId }).then(function (notify) {
                  var message = "You have recieved a new message.";
                  console.log("Notify Result : ",notify);
                  if(notify){
                    if (notify.socketId == "12345") {
                      console.log("SocketID empty so sending push.");
                      //                socket.broadcast.to(notify.socketId).emit("onAny","You have recieved a new message.")
                      var urlRequest = { method: 'POST',
                        url: process.env.url+"/testnotification/" + notify._id + "/" + message,
                        headers:
                        { 'content-type': 'application/x-www-form-urlencoded',
                        'postman-token': 'f3b27335-41d1-8d80-df1b-668735631ebf',
                        'cache-control': 'no-cache' } }
                      request(urlRequest, function (error, response, body) {
                        io
                        .to(socket.room)
                        .emit('room', { chat: chatAdded });
                      });
                    } else {
                      console.log("SocketID Found.");
                      socket.broadcast.to(notify.socketId).emit("onAny","You have recieved a new message.");
                      io
                      .to(socket.room)
                      .emit('room', { chat: chatAdded });
                    }
                  }else{
                    console.log("SocketID Found.");
                  //  socket.broadcast.to(notify.socketId).emit("onAny","You have recieved a new message.");
                    io
                    .to(socket.room)
                    .emit('room', { chat: chatAdded });
                  }

                })

              }
            })
          }else{
            console.log("Message sending failed");
            socket.broadcast.to(notify.socketId).emit("onAny","Message sending failed,Please try again later.")
          }

        }
      })
    })
  });





cron.schedule('0 0 1 1 * *',function(){
  console.log("*****************************************************************");
  console.log("***************           CRON JOB STARTED        ***************");
  console.log("*****************************************************************");
  var rate = [];
  var count = 0;
  curr.find({}).then(function(c){
    c.forEach(function(k,p,l){
      if(k.currency!='USD'){
        client.convert('USD', k.currency, 1).then(response => {
          curr.findOne({currency:k.currency}).exec(function(error,cResult){
            if(error){
              console.log(error);
            }else{
              cResult.valueInUSD = response.value;
              rate[count] = response;
              count = count+1;
              cResult.save()
              if(p == l.length-1){
                currencyConversions.create({
                  currentTime : Date.now(),
                  rates : rate
                })
              }
            }
          })
        });
      }
    })
  })
})

cron.schedule('0 57 * * * *',function(){
  var options = { method: 'GET',
  url: 'http://staff.sofittech.com/',
  headers:
   { 'postman-token': '72478dc5-e816-e474-21b1-1ee8c0f5efc6',
     'cache-control': 'no-cache' } };
request(options, function (error, response, body) {
  if (error) throw new Error(error);
});
})


  cron.schedule('0 0 * * * *', function(){


    Advertisement.find({boosted:true,visible:true,sold:false,}).populate("user_id").exec(function(error,result){
      if(error){
        console.log("1",error);
      }else{
        result.forEach(function(i,idx,x){
          if(parseInt(i.boosts) > 1){
              User.findOne({_id:i.user_id._id}).exec(function(error,userResult){
                if(parseInt(userResult.boostCount)>0){
                  Advertisement.update({_id:i._id},{boosted:true,boosts:parseInt(i.boosts)-1},{multi:true});
                  user.update({_id:userResult._id},{boostCount:parseInt(userResult.boostCount)-1});
                }else{
                  Advertisement.update({_id:i._id},{boosted:false,boosts:0,boostStartingTime:0},{multi:true});
                }
              })
          }else if(parseInt(i.boosts) == 1){
            User.findOne({_id:i.user_id._id}).exec(function(error,userResult){
              if(parseInt(userResult.boostCount)>0){
                Advertisement.update({_id:i._id},{boosted:true,boosts:25},{multi:true});
                user.update({_id:userResult._id},{boostCount:parseInt(userResult.boostCount)-1});
              }else{
                Advertisement.update({_id:i._id},{boosted:false,boosts:0,boostStartingTime:0},{multi:true});
              }
            })
          }
        })
      }
    })

    Advertisement.update({createdAt: {$lte: new Date(Date.now()).getTime()-2592000000},isVerified:true,visible:true},{visible:false},{multi:true})

  });

  /*
  Cluster implementation Started
  */
  //
  // if (cluster.isMaster) {
  //   console.log(`Master ${process.pid} is running`);
  //
  //   // Fork workers.
  //   for (let i = 0; i < numCPUs; i++) {
  //     cluster.fork();
  //   }
  //
  //   //Check if work id is died
  //   cluster.on('exit', (worker, code, signal) => {
  //     console.log(`worker ${worker.process.pid} died`);
  //   });
  //
  // } else {
  //   // This is Workers can share any TCP connection
  //   // It will be initialized using express
  //   console.log(`Worker ${process.pid} started`);
  //
  //   app.get('/cluster', (req, res) => {
  //     let worker = cluster.worker.id;
  //     res.send(`Running on worker with id ==> ${worker}`);
  //   });
  //   app.use('/api', passport.authenticate('jwt', { session: false }), require('./routes/authenticated.js'));
  //   app.get('*', (req, res) => res.status(404).send({ error: 'page not found' }));
  //
  //   app.listen(port, function() {
  //     console.log('Your node is running on port 3000');
  //   });
  // }

  /*
  Cluster implementation ends here
  if getting any issue with cluster remove cluster implementation and un-comment below given implementation  at end===> http.listen(port, function () {
  */


  app.use(morgan('combined'));
  app.use('/', require('./routes/unauthenticated.js')); //routes which does't require token authentication
    app.use('/api', passport.authenticate('jwt', { session: false, url:"12321" }), require('./routes/authenticated.js'));
    app.get('*', (req, res) => res.status(404).send({ error: 'page not found' }));
  require('./config/passport')(passport);




  http.listen(port, function () {
    console.log('listening on *:', port);
  });

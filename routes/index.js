var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = function(app, io) {
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
      //console.log("Socket ID : ",user_id);
      if(user_id !=null ){
        user.findOne({ _id: user_id.user_id }).then(function (pp) {
          if (pp == null || pp == undefined) {
          } else {
            pp.socketID = socket.id;
            pp.save(function (socketResult) {
              ////console.log("User Connected to Sockets");
            })
          }
        })
      }
    })

    socket.on('disconnect', function () {
      if(socket.id !=null ){
        user.update({ socketId: socket.id }, { socketID: "12345" }).exec(function (error, socketFound) {
          //console.log(" disconnected" );
        })
      }
    });
    socket
    .on('connect', function () {
      console.log('user connected');
    });
    var chatId = "1234";
    var user11 = "";
    var user22 = "";
    var user1Socket;
    var user2Socket;
    var msgFrom;
    socket.on('startchat', function (msg) {
      ////console.log("Request : ",msg);
      user11 = ""+msg.myId;
      user22 = ""+msg.hisId;
      var comparison = msg.myId.localeCompare(msg.hisId);
      if (comparison > 0) {
        chatId = msg.myId + msg.hisId;
      } else {
        chatId = msg.hisId + msg.myId;
      }
      chat
      .findOne({ chat_id: chatId })
      .exec(function (error, result) {
        if (error) {
          ////console.log({ error: error });
        } else {
          if (!result) {
            new chat({ chat_id: chatId, user1: user11, user2: user22, msgFrom: socket.id })
            .save(function (error, result) {
              if (error) {
                ////console.log({ error: error });
              } else {
                socket.room = chatId;
                socket.join(chatId);
                ////console.log("Chat Room created as ",socket.room);
              }
            })
          } else {
            socket.room = chatId;
            if (user1Socket == null) {
              user1Socket = socket.id;
            } else {
              user2Socket = socket.id;
            }
            socket.join(chatId);
          }
        }
      })
    });

    app.get('/sendMessageAlert/:id', function (req, res) {
      socket.broadcast.to(req.params.id).emit("onAny","You have recieved a new message.")
    })
    socket.on("room", function (msg) {
      ////console.log("Chatroom message : ",msg);
      if (socket.id === user1Socket) {
        msgFrom = user11;
      } else {
        msgFrom = user22;
      }
      chat
      .findOne({ chat_id: chatId }).populate('user2')
      .exec(function (error, result) {
        if (error) {
          res
          .status(500)
          .send({ error: error });
        } else if (!result) {

        } else {
          var otherID = "";
          if (msg.myId == result.user1) {
            otherID = result.user2;
          } else {
            otherID = result.user1;
          }
          new chat({ chat_id: chatId, user1: msg.myId, user2: otherID,  dateTime: Date.now(), messageFrom: msg.myId, message: msg.text })
          .save(function (error, chatAdded) {
            if (error) {
              res
              .status(500)
              .send({ error: error });
            } else {
              var userNotification = ""
              if (result.user1 == msg.myId) {
                userNotification = result.user2;

              } else {
                userNotification = result.user1;
              }
              user.findOne({ _id: userNotification }).then(function (notify) {
                var message = "You have recieved a new message.";
                if (notify.socketID == "12345") {
                  var urlRequest = process.env.url+"/testnotification/" + notify._id + "/" + message + "/" + notify.socketID;
                  request(urlRequest, function (error, response, body) {
                  });
                } else {
                  socket.broadcast.to(notify.socketID).emit("onAny","You have recieved a new message.")
                }
              })
              io
              .to(socket.room)
              .emit('room', { chat: chatAdded });
            }
          })
        }
      })
    })
  });
}

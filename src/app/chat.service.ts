import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'https://celx-dev.herokuapp.com';
    private socket;

  constructor() { }

  ngOnInit(){
    this.socketConnection();
  }

  public startchat(myuserid,chathisid,chatadvertid){
    this.socket.emit('startchat',{myId:myuserid,hisId:chathisid,advert_id:chatadvertid});
    console.log("started");
  }

  public sendMessage(myuserid,chathisid,chatadvertid,chat_msg){
    console.log("myid",myuserid,"hisid",chathisid,"advertid",chatadvertid,"chatmessage",chat_msg)
    this.socket.emit('room',{myId:myuserid,hisId:chathisid,advert_id:chatadvertid,text:chat_msg});

    // socket.emit('add-message', message);
  }

  public socketConnection(){
    console.log("******************"+localStorage.getItem('userid')+"****************");
    console.log("connecting");
    this.socket.on('connect',function(){
      console.log("+++++++++Conected+++++++");
      this.socket.emit('user',{user_id:localStorage.getItem('userid')});
    })
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('room', (data) => {
        observer.next(data.chat);
        console.log(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}

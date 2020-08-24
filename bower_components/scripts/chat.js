'use strict';
function Chat(){
    let socket;
    this.OpenChat = function Start(){
      socket = new WebSocket("ws://localhost:3000");
      socket.onopen = function(event) {
        console.log('Соеденение c webSocket server установлено');
      }
      $('input#sendButton').click( function(event){
        let message = document.getElementById("messageInput").value;
            if(message){
                socket.send(message);
            }else{
                document.getElementById("messageInput").value = "Введите текст";
            }
        });

        socket.onmessage = function(res){
          console.log("Полученный ответ: " + res.data);
          $("ul#messagesList").append("<li>" + res.data + "</li>");
        }
        socket.onclose = (event) =>{
          if(event.wasClean){
            console.log('Соединение с вебсокет сервером успешно закрыто, код=' + event.code + ' причина=' + event.reason);
          }else{
            console.error('Соединение с вебсокет сервером оборвано по причине ' + event.message);
          }        
        }
        socket.onerror = (error) => {
          console.error('На вебсокет сервере произошла ошибка ' + error.message);
        }
    }
    this.CloseChat = function Stop(){
        if(socket){
            socket.close(1000, "клиент закрыл страничку с чатом");
        }        
    }
}
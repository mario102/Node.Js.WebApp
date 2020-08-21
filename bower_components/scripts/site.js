'use strict';
$(document).ready( function(){
    let oldlink = $("nav a.active")[0];//переменная в которой лежит html элемент с которого нужно убрать класс active

    $("nav a.nav-link").click( function(event){
        event.preventDefault();
        let newlink = this;//переменная в которой лежит html элемент которому нужно добавить класс active
        let adress = this.href;
        
        $(oldlink).removeClass("active");
        $(newlink).addClass("active");

        if(newlink.offsetLeft < oldlink.offsetLeft || newlink.offsetTop < oldlink.offsetTop){
          $("div#maincontent").animate({"left": "+=100%"}, "slow", function(){
            LoadAsync(adress, "right");
          });
        }else if (newlink.offsetLeft > oldlink.offsetLeft || newlink.offsetTop > oldlink.offsetTop){
          $("div#maincontent").animate({"left": "-=100%"}, "slow", function(){
            LoadAsync(adress, "left");
          });
        }

        oldlink = newlink;
    });
    CheckChat();
});
function LoadAsync(url, way){
  $.get(url, function(res, status, xhr){
      if(status != "success"){
        let msg = "Извините, но произошла ошибка: ";
        $("main").html(msg + xhr.status + " " + xhr.statusText);
      }
      /*Вычленяем title из полученного ответа*/
      let firstIndex = res.indexOf("<title>")+7;
	    let lastIndex = res.indexOf("</title>");
      let titleValue = res.slice(firstIndex, lastIndex);
      /*Вычленяем main из полученного ответа*/
      let forfirstmainindexstring = res.indexOf("<main>")+6;
      let forlastmainindexstring = res.indexOf("</main>");
      let main = res.slice(forfirstmainindexstring, forlastmainindexstring);
      
      /*Меняем тайтл в хэде и добавляем новую запись в историю помещений*/
      document.title = $("title").html(titleValue).text();
      /*Подставляем основной контент в main*/
      $("main").html(main);
      
      if(way == "right"){//анимация слайда слева направо
        $("div#maincontent").css("left","-100%");//прячем контент слева
        $("div#maincontent").animate({"left": "+=100%"}, "slow");
      }
      if(way == "left"){//анимация слайда справа налево
        $("div#maincontent").css("left","+100%");//прячем контент справа
        $("div#maincontent").animate({"left": "-=100%"}, "slow");
      }
      history.pushState(null, titleValue, url);
      CheckChat();
  })
}

function CheckChat(){
  if($('ul#messageList')){
    $('input#sendButton').click( function(event){
      let message = document.getElementById("messageInput").value;
      $.post("/chat", {Message: message}, function(res, status, xhr){
        if(status != "success"){
          let msg = "Извините, но произошла ошибка: ";
          $("main").html(msg + xhr.status + " " + xhr.statusText);
        }
        $("ul#messagesList").append("<li>" + res + "</li>");
      });
    });
  }
}
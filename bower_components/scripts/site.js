'use strict';
$(document).ready( function(){
    let oldlink;//переменная в которой лежит html элемент с которого нужно убрать класс active
    $("nav a").click( function(event){
        event.preventDefault();
        let newlink = this;//переменная в которой лежит html элемент которому нужно добавить класс active
        if(oldlink){
            $(oldlink).removeClass("active");
        }
        $(newlink).addClass("active");
        oldlink = newlink;
        LoadAsync(this.href)
    });
});
function LoadAsync(url){
  $.get(url, function(res, status, xhr){
      if(status != "success"){
        let msg = "Извините, но произошла ошибка: ";
        $("main").html(msg + xhr.status + " " + xhr.statusText);
      }
      let firstIndex = res.indexOf("<title>")+7;
	  let lastIndex = res.indexOf("</title>");
      let titleValue = res.slice(firstIndex, lastIndex);

      let forfirstmainindexstring = res.indexOf("<main>")+6;
      let forlastmainindexstring = res.indexOf("</main>");
      let main = res.slice(forfirstmainindexstring, forlastmainindexstring);
      
      console.debug("Контент в main: " + main);
      /*Меняем тайтл в хэде и добавляем новую запись в историю помещений*/
      document.title = $("title").html(titleValue).text();
      /*Подставляем основной контент в main*/
      $("main").html(main);
      history.pushState(null, titleValue, url);

  })
}
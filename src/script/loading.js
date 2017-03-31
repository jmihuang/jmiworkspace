    function loading(){

       // var percentComplete = Math.ceil(evt.loaded / evt.total)*100;
       $({ property: 0 }).animate({ property: 100 },{ // 動畫0% - 80%
               duration: 10000, //動畫持續時間
               step:function(){ //動畫完成前
                      $(".loading").css('width',  Math.round(this.property) +"%");
                      $('.progress').text(Math.round(this.property) +"%");
               },
              complete:function(){
                      $(".loading-wrapper").fadeOut(800);
              }
       });
    }
    
    loading();
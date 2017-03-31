     $(window).on('scroll',scrolling);

     function scrolling(){
            //nav 
            var scrollTop = $(document).scrollTop(); 
            console.log(scrollTop,$('#nav').height());      
           if(scrollTop>$('#nav').height()){         
               $('#nav').addClass('is-scroll');            
           }else{
                $('#nav').removeClass('is-scroll');
           }   
     }
         
    //漢堡點擊
    function bugerActive($this){
         if(!$('#nav').hasClass('is-active')){
            $('#nav').removeClass('is-scroll');
            $(window).off('scroll');
         }else{
             // $('#nav').addClass('is-scroll');
              $(window).on('scroll',scrolling);
         } 
         $this.classList.toggle('active');
         $('#hamber-bg').toggleClass( 'active');
         $('#nav').toggleClass( 'nav-burger is-active');
    }

    //Ajax

    function getJSON(url,data,callback){
       $.ajax({
         xhr: function()
           {
             var xhr = new window.XMLHttpRequest();
             //Download progress
             xhr.upload.addEventListener("progress", function(evt){
                   loading(evt);
             }, false);
             return xhr;
         },
         type: "GET",
         dataType: "json",
         url: './'+url, //Relative or absolute path to ajax-index.php file
         data: data,
         beforeSend: function( xhr ) {
             $('input,button,textarea').prop('disabled', true);
             console.log('disabled start');
         },
         success: function(rs) {
           console.log('success');
           callback(rs);
         },
         complete:function(){
           $('input,button,textarea').delay(800).prop('disabled', false);
         }
       });
    }


    function loading(evt){
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



    function dialog(msg){
        if($('#dialogbg').length){
           $('#dialogbg').fadeIn();
        }else{
          $('#dialog').css('display','block').wrap('<div id="dialogbg" class="dialogbg" style="display:none">').fadeIn();
        }
        $('#dialog').find('p').html(msg);
     }
     
     $(document).on('click','#dialog p,#dialogbg,#close-btn',function (event){
        $('#dialogbg').fadeOut();
        console.log('click');
     });


    var container = ".about-container";
    var num_li = $(container).length;
    var scrollTop = $(document).scrollTop();
    var n =  0;
    var w = window;
    var smallScreen= 601;
    var mediumScreen= 993;
    var largeScreen= 1201;

    $(window).on('load',init);
    $(window).on('resize scroll',scrollFn);
    function init(){
        var j = 0;
        while(j<num_li){
            $('#scroll-spy').append('<li></li>');
            j++;
        }
        $('#scroll-spy').append('<li>01</li>');
        $(container).eq(0).addClass('fadeInDown')
        scrollTag(0);
        scrollFn();
    }

    function scrollFn(){
        //scrollspy      
        var windowWidth = w.innerWidth;
        if(windowWidth>mediumScreen){
            //full sreen scroll 
            console.log('windowWidth>mediumScreen');
            $(window).mousewheel(function(e){    
                if(e.deltaY == -1){//scroll down
                    if(n<num_li-1){
                      n++;
                    }
                }else{
                    if(n>0){
                      n--;
                    }
                };
                scrollTag(n);
                $(container).eq(n).addClass('fadeInDown').siblings().removeClass('fadeInDown');
            });
        }else{
            $(document).off('scroll');
            console.log('!!!!windowWidth>mediumScreen');
            var scrollTop = $(document).scrollTop();
            var num = -1;
                  $(container).each(function (i){
                    console.log(scrollTop,$(this).position().top);
                    if(scrollTop>$(this).offset().top){
                        if(num < num_li){
                            num ++;
                        }
                    }
                  });
                if(scrollTop == 0){
                    num = 0;
                }
                scrollTag(num);
            $('#about-wrapper').addClass('fadeInDown');
        }

    }

    function scrollTag(n){
        
        $('#scroll-spy li').removeClass('active').eq(n).addClass('active');
        $('#scroll-spy li:last-child').html('').html('0'+(n+1));
    }
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
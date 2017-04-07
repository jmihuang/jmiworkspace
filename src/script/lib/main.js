     $(window).on('scroll',scrolling);

     function scrolling(){
            //nav 
           var scrollTop = $(document).scrollTop(); 
           console.log('scrolling');    
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
            $(window).trigger('scroll');
            console.log('close');
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

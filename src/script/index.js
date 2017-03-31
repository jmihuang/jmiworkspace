
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
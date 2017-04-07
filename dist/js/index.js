
    var container = ".about-container";
    var num_li = $(container).length;
    var scrollTop = $(document).scrollTop();
    var n =  0;
    var w = window;
    var smallScreen= 601;
    var mediumScreen= 993;
    var largeScreen= 1201;
    var windowWidth = w.innerWidth;

    $(window).on('load',init);
    $(window).on('resize scroll',scrollFn);
    function init(){
        var j = 0;
        if(windowWidth>mediumScreen){
            while(j<num_li){
                $('#scroll-spy').append('<li></li>');
                j++;
            }
            $('#scroll-spy').append('<li>01</li>');
            scrollTag(0);
        }
        $(container).eq(0).addClass('fadeInDown')
        scrollFn();
    }

    function scrollFn(){
        //scrollspy             
        if(windowWidth>mediumScreen){
            //full sreen scroll 
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
            $('#about-wrapper').addClass('fadeInDown');
        }

    }

    function scrollTag(n){
        
        $('#scroll-spy li').removeClass('active').eq(n).addClass('active');
        $('#scroll-spy li:last-child').html('').html('0'+(n+1));
    }
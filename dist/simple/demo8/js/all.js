// JavaScript Document

// changeItem
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}






// about sidebar hyperlink


$(function(){
		$('#floatMenu a').click(function(){
			var href = $(this).attr('href');
			$('html, body').animate({
				//scrollTop: 0	// 回 top
				scrollTop: $(href).position().top
			}, 1000);

			return false;
		});
	});



// about scorll menu

$(function (){
	var name = "#floatMenu";
	var menuYloc = null;
		var preheight=230;
		$(function(){
			$(name).css("top",preheight)

			$(window).scroll(function () { 
				offset = $(document).scrollTop()+20;
				if(offset<preheight){
				   offset=preheight;	
				}
				$(name).animate({top:offset+"px"},{duration:500,queue:false});
			});
		}); 	
			})


//top

$(function (){
	$(".top").click(function (){
		$("html,body").animate({scrollTop:0},900)
	})
})



//tag
$(function (){
  //先取tag的預設值
  var preshow=0;
  //eq(預設值)addClass(加入css)
  $(".tabs li").eq(preshow).addClass("mark1");
  $(".tab_content li").hide().eq(preshow).show();
  $(".tabs li").click(function(){
   //目前滑鼠選取到物件，取出href的值
   var dd = $(this).find('a').attr("href");
   //取出值為div的名字區塊，展現，其他的隱藏
   $(dd).show().siblings().hide();
   //之前tag有加屬性的先去除
   $(this).siblings().removeClass("mark1").removeClass("mark2").removeClass("mark3").removeClass("mark4");
   //選取的就加入active的屬性
   var no=$(this).index();

   if(no==0){
    $(this).addClass("mark1");
   }else if(no==1){
    $(this).addClass("mark2");
   }else if(no==2){
    $(this).addClass("mark3");
   }else if(no==3){
    $(this).addClass("mark4");
   }
   return false;
    
  });
  
 })

//game change pic
$(function (){
			var preset=0;
			$("#show_list li").eq(preset).addClass("no1");
			$("#BB li").hide().eq(preset).show();
			$("#show_list li").click(function (){
				var pp=$(this).find('a').attr("href")	;
				$(pp).fadeIn(200).siblings().hide();
				$(this).siblings().removeClass("no1").removeClass("no2").removeClass("no3").removeClass("no4").removeClass("no5").removeClass("no6");
				var list=$(this).index();
				if(list==0){
						$(this).addClass("no1");			
				}else if(list==1){
						$(this).addClass("no2");				
				}else if(list==2){
						$(this).addClass("no3");
				}else if(list==3){
						$(this).addClass("no4");
				}else if(list==4){
						$(this).addClass("no5");
				}else if(list==5){
						$(this).addClass("no6");
				}
				return false;})
			})



$(function(){
    //@Mr.Think***?量
    var $cur = 1;//初始化?示的版面
    var $i = 4;//每版?示?
    var $len = $("#show_list>li").length;//?算列表??度(??)
    var $pages = Math.ceil($len / $i);//?算展示版面?量
    var $w = $(".show_box").width();//取得展示?外??度
    var $showbox = $("#show_list");
    var $num = $('span.num li')
    var $pre = $("#pre_btn")
    var $next = $("#next_btn");
 	//@Mr.Think***向前??
    $pre.click(function(){
        if (!$showbox.is(':animated')) {  //判?展示?是否??
            if ($cur == 1) {   //在第一?版面?,再向前??到最后一?版面
                $showbox.animate({
                    left: '-=' + $w * ($pages - 1)
                }, 500); //改?left值,切??示版面,500(ms)?????,下同
                $cur = $pages; //初始化版面?最后一?版面
            }
            else { 
                $showbox.animate({
                    left: '+=' + $w
                }, 500); //改?left值,切??示版面
                $cur--; //版面累?
            }
            $num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //???的版面?字加上高亮?式,并移除同?元素的高亮?式
        }
    });
    //@Mr.Think***向后??
    $next.click(function(){
        if (!$showbox.is(':animated')) { //判?展示?是否??
            if ($cur == $pages) {  //在最后一?版面?,再向后??到第一?版面
                $showbox.animate({
                    left: 0
                }, 500); //改?left值,切??示版面,500(ms)?????,下同
                $cur = 1; //初始化版面?第一?版面
            }
            else {
                $showbox.animate({
                    left: '-=' + $w
                }, 500);//改?left值,切??示版面
                $cur++; //版面?累加
            }
            $num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //???的版面?字加上高亮?式,并移除同?元素的高亮?式
        }
    });
    //@Mr.Think***?字??事件
    $num.click(function(){
        if (!$showbox.is(':animated')) { //判?展示?是否??
            var $index = $num.index(this); //索引出?前??在列表中的位置值
            $showbox.animate({
                left: '-' + ($w * $index) 
            }, 500); //改?left值,切??示版面,500(ms)?????
            $cur = $index + 1; //初始化版面值,?一句可避免???到第三版?,??向后按?,出面空白版.index()取值是?0?始的,故加1
            $(this).addClass('numcur').siblings().removeClass('numcur'); //??前??加上高亮?式,并移除同?元素的高亮?式
        }
    });
})





//minizoom
$(function (){
 $(".stuff_pic").miniZoomPan({
			sW: 150,
			sH: 150,
			lW: 400,
			lH: 400,
			frameColor: "#ffbbd8",
			loaderContent: '<img src="images/spinner.gif" />'
		});
})

//另開視窗
function open1(){
	   window.open("game1.html","up1","width=550 height=450");
	   return false;
	}
function open2(){
	   window.open("game1.html","up2","width=400 height=300");
	   return false;
	}
function open3(){
	   window.open("game3.html","up3","width=500 height=600");
	   return false;
	}
function open4(){
	   window.open("game4.html","up4","width=500 height=400");
	   return false;
	}
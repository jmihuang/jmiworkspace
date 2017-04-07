var fooReveal = {
  delay    : 300,
  distance : '90px',
  easing   : 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  scale    : 1
};
var fooContainer = document.getElementById('showcaseDesign');

window.sr = ScrollReveal();


  //ajax
  getJSON('sites.json','',function (rs){
    var html = '';
        $.each(rs,function(i){ 
          html += '<li class="showcase-design showReveal col l4 m6 s12 clearfix">';
          html += '<div class="showcase-text">';  
          html += '<ul class="content content-text">';
          html += '<li class="case-img" onclick="window.open(\''+rs[i]['href']+'\', \'_blank\')">';
          html += '<img src="'+rs[i]['img-src']+'" target="_blank">';
          html += '<i class="case-view-t">view</i>';
          html += '</li>';
          html += '<li class="showcase-title heading-3">'+rs[i]['title']+'</li>';
          html += '<li class="case-desc"><span class="text-y">技    術:</span>'+rs[i]['skill']+'</li>'; 
          html += '</ul>';    
          html += '</li>';
        }); 
        $('#showcaseDesign').html(html);
      sr.reveal('.showReveal', fooReveal);
  });
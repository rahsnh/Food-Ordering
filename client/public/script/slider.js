var myVar;

function slideleft() {
	"use strict";
	$(".slider-slide-container").animate({marginLeft:'-200%'},150,function(){
		  $(this).css({marginLeft:'-100%'}).find('.slider-slide:first').appendTo('.slider-slide-container');
      });
}

function slideright() {
	"use strict";
	$(".slider-slide-container").animate({marginLeft:0},150,function(){
		  $(this).css({marginLeft:'-100%'}).find('.slider-slide:last').prependTo('.slider-slide-container');
      });
}

$(document).ready(function(){
	"use strict";
  $('.slider-arrow > span').click(function(ev){
    ev.preventDefault();
    var side = $(this).parent().hasClass('slider-arrow-left') ? 'left' : 'right';
    if (side === 'right') {
      slideleft();      
    } else {
        slideright();
    }
  });
	$(".slider-container").on("swipeleft", slideleft);
	$(".slider-container").on("swiperight", slideright);
	$(".ui-loader").hide();
	myVar = setInterval(slideleft, 5000);
});

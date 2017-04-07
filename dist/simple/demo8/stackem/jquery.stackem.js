/**
 * jQuery.stackem - stack your html elements !
 * Copyright (c) 2009 Amin M Lahir
 * Version: 1.01 (14-SEP-2009)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($){

    // Definition
    jQuery.fn.stackem = function(options){
    
        //default options
        var defaults = {
			//basics
			stackSpacing: 3, //distance items edges in pixels when stacked (top & left edge)
			stackMax: null, //no. of items displayed when stacked
			spreadSpacing: 10, //distance in pixels between each item when spreaded (margin right & bottom)
			spreadItemsPerRow: 3, //no. of items displayed in a row when spreaded
			spreadDuration:500,
			zIndex:100 //items z-index begins from this value
        };
        
        //setup options
        var opts = jQuery.extend({}, defaults, options);
		
		//private variables
        var $stacks = $(this); //handle to stacks on DOM
        var totalStacks = $stacks.length; //number of stacks
        var setWidth = 0;
		var setHeight = 0;

        //global methods
        jQuery.stackem = {
            stack: function(index, stackObjDOM, pageload){
                var $activeStack_m = stackObjDOM.clone(true);// get a handle on the selected stack in memory
                //drill items and set css styles
                $activeStack_m.addClass("stacked").find(".item").each(function(i){
					$this = $(this);
                    $this.removeClass("spread").css({
                        "top": i * opts.stackSpacing + "px",
                        "left": i * opts.stackSpacing + "px",
                        "z-index": opts.zIndex + i
                    });
					if(opts.stackMax && i >= opts.stackMax)
					//max stack is set, limit stacked items accordingly
						$this.css({"display":"none"});
                });
				//stackObjDOM.animate({'width':setWidth+'px','height':setHeight+'px'},"slow"); //to be worked on next
                stackObjDOM.replaceWith($activeStack_m);//replace stack on DOM with corresponding edited stack from memory	
				if(!pageload)
					$activeStack_m.css('overflow','visible').width(setWidth).height(setHeight);
			},
            spread: function(index, stackObjDOM) {
				setWidth = stackObjDOM.css('width'); //get width from css 
				setHeight = stackObjDOM.css('height');	//get height from css	
                var $activeStack_m = stackObjDOM.clone(true);//get a handle on the selected stack in memory
                //drill items
				var $itemsInStack_m = $activeStack_m.removeClass("stacked").find(".item");
				var top = 0;
				var left = 0;
				var $itemsInStack_dom = stackObjDOM.find(".item");
                $itemsInStack_m.each(function(i){
					$item = $(this);
					//store current item dimensions			
					//So elements on DOM are used, to get width & height
					var itemWidth = $itemsInStack_dom.eq(i).outerWidth();
					var itemHeight = $itemsInStack_dom.eq(i).outerHeight();
					if((i>=opts.spreadItemsPerRow) && (i % opts.spreadItemsPerRow == 0)) {
						//current item is first item on new row
						top += itemHeight+opts.spreadSpacing;
						left = 0;
					}
					$item.addClass("spread").css({'top':top+'px','left':left+'px','position':'absolute','display':'block'});	
                    left += itemWidth+opts.spreadSpacing;
                });		
                stackObjDOM.replaceWith($activeStack_m);//replace stack on DOM with corresponding edited stack in memory
				$activeStack_m.css('overflow','hidden');
				//resize stack dimensions
				var activeStackWidth = 0;
				var bestStackWidth = 0;					
				var activeStackHeight = $itemsInStack_m.outerHeight();
				$itemsInStack_m.each(function(i) {
					$item = $(this);
					activeStackWidth += $item.outerWidth()+opts.spreadSpacing;		
					if((i>0) && (i % opts.spreadItemsPerRow == 0)) { 
						//current item is on new row but not on first row
						activeStackWidth -= $item.outerWidth()+ (2*opts.spreadSpacing);
						bestStackWidth = Math.max(bestStackWidth,activeStackWidth);
						activeStackWidth = $item.outerWidth() + opts.spreadSpacing; //reset dynamic width to width of first item in the row
						activeStackHeight += $item.outerHeight()+opts.spreadSpacing;
					}
					if(i < opts.spreadItemsPerRow)
						bestStackWidth = activeStackWidth-opts.spreadSpacing;
				});
				$activeStack_m.animate({'width':bestStackWidth+'px','height':activeStackHeight+'px'},opts.spreadDuration);
			}	
        };
			
		$stacks.each(function(index) {
			var $thisStack = $(this);			
			$thisStack.css("z-index",opts.zIndex+totalStacks-index);
			$thisStack.click(function(){
				if ($(this).hasClass("stacked"))
					jQuery.stackem.spread(index, $(this));
				else
					jQuery.stackem.stack(index, $(this), false);
			})
			jQuery.stackem.stack(index,$thisStack, true);
		});
 
    };
    
    })(jQuery)

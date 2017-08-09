
$(function(){
	// header animation and video popup
	(function(){
		var $swp1 = $("#header").find($(".swiper1")).eq(0);
			$swp2 = $("#header").find($(".swiper2")).eq(0),
			$swp3 = $("#header").find($(".swiper3")).eq(0),
			$swp4 = $("#header").find($(".swiper4")).eq(0),
			$obj = $("#header").find($("object")),
			$videoBox = $(".video"),
			$video = $("#video"),
			$close = $(".video .close"),
			$vBtn = $("#header").find($(".videoButton"));
		setTimeout(function(){
			$obj[0].onload=function(){
				$(this).css({"opacity" : 1});
			}
		},1500)
		$swp1.delay(500).animate({
			left: 20,
			opacity: 1
		},1500)
		$swp2.delay(500).animate({
			right: 30,
			opacity: 1
		},1500)
		$swp3.animate({
			top: 85,
			opacity: 1
		},1000)
		$swp4.animate({
			top: 640,
			opacity: 1
		},1000)
		$vBtn.click(function(){
			$(document.body).addClass("noScroll");//it is better for user to scroll window when watching video
			$videoBox.eq(0).css({"z-index": 999});
			$videoBox.eq(0).show();
			$video.show();
			$video[0].play();
		})
		$close.eq(0).click(function(){
			$(document.body).removeClass("noScroll");
			$videoBox.eq(0).hide();
			$video.hide();
			$video[0].pause();
		})
	})();

	//newInfo content popup
	(function (){
		var $newInfo = $("#newInfo"),
			$conPop = $newInfo.find($(".contentPopup")),
			$conLi = $newInfo.find($(".contentPopup .content .conList")),
			$mainLi = $newInfo.find($(".main .niList")),
			$len = $mainLi.length,
			$close = $newInfo.find($(".contentPopup .content .conList .close"));
			
		for(var i=0;i<$len;i++){
			$mainLi[i].index = i;
			$mainLi.eq(i).click(function(){
				var index = $(this)[0].index;
				$(document.body).addClass("noScroll");
				$conPop.eq(0).show();
				$conLi.eq(index).show();
				//list toggle
				var $left = $newInfo.find($(".contentPopup .left")),
			  		$right = $newInfo.find($(".contentPopup .right"));
				$left.click(function(){
					if(index==0){index = 6}
					index--;
					$conLi.hide();
					$conLi.eq(index).show();
				})
				$right.click(function(){
					if(index==5){index = -1}
					index++;
					$conLi.hide();
					$conLi.eq(index).show();
				})
				$close.click(function(){
					$(document.body).removeClass("noScroll");
					$conPop.eq(0).hide();
					$conLi.eq(index).hide();
				})
			})
		}
		//customized scrollbar
		var $newInfo = $("#newInfo"),
			$txtBox = $newInfo.find($(".contentPopup .txtBox"));
		$txtBox.each(function(){
			var $txt = $(this).find($(".txt")),
				$scrollBox = $(this).find($(".scrollBox")),
				$scrollBar = $(this).find($(".scrollBox .scrollBar")),
				topMax = $scrollBox.height() - $scrollBar.height(),
				topMin = 0;
			$scrollBar.mousedown(function(e){
				var by = e.pageY,
					$This = $(this),
					$top = $(this).position().top;
					txtBoxTop = $txtBox.height();
					txtTop = $txt.height();
				$(document).mousemove(function(e){
					var ay = e.pageY;
					var t = ay-by + $top;
					t = Math.max(t,topMin);
					t = Math.min(t,topMax);
					tb = (txtBoxTop-txtTop)*t/topMax;
					$This.css({top:t});
					$txt.css({top:tb});
				}).mouseup(function(){
					$(document).off("mousemove").off("mouseup");
				})
				return false;
			})
			//mousewheel to scroll
			$(this).mousewheel(function(e,d){
				var t = $scrollBar.position().top;
				txtBoxTop = $txtBox.height();
				txtTop = $txt.height();
				if(d>0){
					t = t + 10;
				}else{
					t = t - 10;
				}
				t = Math.max(t,topMin);
				t = Math.min(t,topMax);
				tb = (txtBoxTop-txtTop)*t/topMax;
				$scrollBar.css({top:t});
				$txt.css({top:tb});
				return false;
			})
			//click to scroll
			$scrollBox.click(function(e){
				txtBoxTop = $txtBox.height();
				txtTop = $txt.height();
				if(e.target === this){
					var t = e.pageY - $scrollBox.offset().top - $scrollBar.height()/2;
					t = Math.max(t,topMin);
					t = Math.min(t,topMax);
					tb = (txtBoxTop-txtTop)*t/topMax;
					$scrollBar.css({top:t});
					$txt.css({top:tb});
				}
			})
			//scrollBox show and hide
			$(this).mouseenter(function(){
				$scrollBox.show();
			})
			$(this).mouseleave(function(){
				$scrollBox.hide();
			})
		})
		
	})();

	//mousewheel delay to show
	(function(){
		var $newInfo = $("#newInfo"),
			$gameChar = $("#gameChar"),
			arr = [],
			$title1 = $newInfo.find($(".main .title")),
			$niList = $newInfo.find($(".main .niList")),
			$title2 = $gameChar.find($(".title")),
			$carousel = $gameChar.find($(".carousel .wrap"));
		init($title1,$niList,$title2,$carousel);
		$(window).scroll(function(){
			var sTop = $(document).scrollTop() + $(window).height();
			for (var i=arr.length-1;i>=0;i--){
				var cTop = $(arr[i]).offset().top;
				if(sTop >= cTop){
					$(arr[i]).animate({
						top: 0,
						opacity: 1
					},($(arr[i]).index()%3)*500+500)
					arr.splice(i,1);
				}
			}
		})

		function init(){
			for(var i=0;i<arguments.length;i++){
				arguments[i].each(function(){
					this.style.top = 130 + "px";
					$(this).css("opacity",0);
					arr.push(this);
				})
			}
		}

	})();

	//gameChar carousel
	(function(){
		var $gameChar = $("#gameChar"),
			$left = $("#gameChar").find($(".carousel .left")),
			$right = $("#gameChar").find($(".carousel .right")),
			$pic = $("#gameChar").find($(".carousel .wrap .pic")),
			index = 0;
			$i = $pic.find($("i"));
		$pic.click(function(){
			if($(this).index() !== index){
				index = $(this).index();
				tog();
			}
		})
		$left.click(function(){
			index = index == 4?0:index+1;
			tog();
		})
		$right.click(function(){
			index = index == 0?4:index-1;
			tog();
		})
		function tog(){
			var lastIndex = index == 0?4:index-1;
			var nextIndex = index == 4?0:index+1;
			$i.css({
				width: 0,
				height: 0
			})
			$pic.removeClass("lSide mid rSide");
			$pic.eq(lastIndex).addClass("lSide");
			$pic.eq(index).addClass("mid");
			var $top = $pic.eq(index).find($(".top")),
                $right = $pic.eq(index).find($(".right")),
                $bottom = $pic.eq(index).find($(".bottom")),
                $left = $pic.eq(index).find($(".left"));
            $top.animate({width:744},300);
            $right.delay(300).animate({height:409},200);
            $bottom.delay(500).animate({width:744},300);
            $left.delay(800).animate({height:409},200);
			$pic.eq(nextIndex).addClass("rSide");
		}
	})();
})



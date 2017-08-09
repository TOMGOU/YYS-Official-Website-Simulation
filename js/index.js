// header part
(function(){
	var $header = $("#header"),
		$log = $header.find($(".log")),
		$yys = $("#slide").find($(".yys"));
	$(window).scroll(tansform);
	function tansform(){
		if($(document).scrollTop()){
			$header.addClass("active");
			$log.addClass("hide");
			$yys.addClass("scale");
		}else{
			$header.removeClass("active");
			$log.removeClass("hide");
			$yys.removeClass("scale");
		}
	}
})();
// slide part
 (function(){
 	var $slide = $("#slide"),
 		$btn = $slide.find($(".slideBox .btn")),
 		$slide1 = $slide.find($(".slideBox .slide1")),
 		$slide2 = $slide.find($(".slideBox .slide2")),
 		$role1 = $slide1.find($(".left")),
 		$role2 = $slide1.find($(".right")),
 		$role3 = $slide2.find($(".left")),
 		$role4 = $slide2.find($(".right")),
 		mark = true;
 		$role1.animate({
			left: 168
		})
		$role2.animate({
			left: 464
		})
 		$btn.click(function(){
 			if(mark){
 				$slide1.finish();
 				$slide1.animate({
	 				opacity: 0
	 			},1000)
	 			$slide2.delay(1000).animate({
	 				opacity: 1
	 			},1000)
	 			$role3.delay(1000).animate({
	 				left: 128
	 			},1000)
	 			$role4.delay(1000).animate({
	 				left: 365
	 			})
	 			$role1.animate({
	 				left: 316
	 			})
	 			$role2.animate({
	 				left: 316
	 			})
	 			mark = !mark;
 			}else{
	 			$slide2.finish();
 				$slide1.delay(1000).animate({
	 				opacity: 1
	 			},1000)
	 			$slide2.animate({
	 				opacity: 0
	 			},1000)
	 			$role1.delay(1000).animate({
	 				left: 168
	 			},1000)
	 			$role2.delay(1000).animate({
	 				left: 464
	 			},1000)
	 			$role3.animate({
	 				left: 245.5
	 			})
	 			$role4.animate({
	 				left: 245.5
	 			})
	 			mark = !mark;
 			}
 		})
 })();

 // gameInfo part
 (function(){
 	var $gameInfo = $("#gameInfo"),
 		$close = $gameInfo.find($(".gameCalendar .download .close")),
 		$scan = $gameInfo.find($(".gameCalendar .download .scan")),
 		$download = $gameInfo.find($(".gameCalendar .download")),
 		$li = $gameInfo.find($(".gameCalendar .main ul li")),
 		//carousel
 		$carousel = $gameInfo.find($(".carousel")),
 		$pic = $gameInfo.find($(".carousel .picBox .pic")),
 		$btn = $gameInfo.find($(".carousel .btnBox .btn")),
 		$picBox = $gameInfo.find($(".carousel .picBox")),
 		length = $pic.length,
 		index = 0,
 		timer = null,
 		//tab control
 		$tabs = $gameInfo.find($(".tab .tabBox .tabs")),
 		$con = $gameInfo.find($(".tab .content")),
 		$liDom = $gameInfo.find($(".tab .content .list"));
	//stretch and shrinkage
 	$close.click(function(){
 		$download.removeClass("stretch").addClass("shrinkage");
 	})
 	$scan.click(function(){
 		$download.removeClass("shrinkage").addClass("stretch");
 	})
 	//hover show for game calendar
 	$li.hover(function(){
 		$(this).finish().addClass("pos");
 	},function(){
 		$(this).finish().delay(400).queue(function(){
 			$(this).removeClass("pos");
 		})
 	})
 	//carousel with gap
 	/***********process oriented coding***********/
 // 	$btn.mouseenter(function(){
 // 		index = $(this).index();
 // 		show($(this));
 // 	})
 // 	autoplay();
 // 	$carousel.mouseenter(function(){
 // 		clearInterval(timer);
 // 	});
 // 	$carousel.mouseleave(function(){
 // 		autoplay();
 // 	});
 // 	function show(obj){
 // 		obj.addClass("on").siblings().removeClass("on");
 // 		$picBox.finish().animate({
 // 			left: -$pic.width()*index
 // 		},500)
 // 	}
 // 	function autoplay(){
 // 		timer=setInterval(function(){
 // 			index++;
	//  		index %= length;
	//  		show($btn.eq(index));
 // 		},3000)
 // 	}

 // 	//tab control
 	/**********process oriented coding**********/
 // 	$tabs.hover(function(){
 // 		var index = $(this).index();
 // 		$(this).addClass("on").siblings().removeClass("on");
 // 		$con.finish().animate({
 // 			left: -$liDom.width()*index
 // 		},500);
 // 	})
 })();

/**********object oriented coding**********/
// * 占用全局变量  Semiauto（半自动）和Auto（自动轮播）
// * 启动函数  .exec()
(function(win){
	function Semiauto($ul,$li,$tab){
		this.$ul = $ul;
		this.$tab = $tab;
		this.width = $li.width();
		this.index = 0;
	}
	Semiauto.prototype = {
		exec: function(){
			this.addEvent();
		},
		addEvent: function(){
			var This = this;
			this.$tab.mouseenter(function(){
				This.index = This.$tab.index($(this));
				$(this).addClass("on").siblings().removeClass("on");
				This.$ul.finish().animate({
					left: -This.width*This.index
				},500)
			})
		}
	};
	//inhert and extend
	function Auto($ul,$li,$tab,$box){
		Semiauto.call(this,$ul,$li,$tab);
		this.$box = $box;
		this.timer = null;
		this.len = $li.length;
	}
	//prototype inhert
	function Fn(){};
	Fn.prototype = Semiauto.prototype;
	Auto.prototype = new Fn();
	//extend
	Auto.prototype.doit = Auto.prototype.exec;
	Auto.prototype.exec = function(){
		this.doit();
		this.autoplay();
		this.clear();
	}
	Auto.prototype.autoplay = function(){
		var This = this;
		this.timer=setInterval(function(){
 			This.index++;
	 		This.index %= This.len;
	 		This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
	 		This.$ul.finish().animate({
	 			left: -This.width*This.index
	 		})
 		},3000)
	}
	Auto.prototype.clear = function(){
		var This = this;
		this.$box.hover(function(){
			clearInterval(This.timer);
		},function(){
			This.autoplay();
		});
	}
	win.Semiauto = Semiauto;
	win.Auto = Auto;
})(window);
//carousel with gap
(function(){
	var $gameInfo = $("#gameInfo"),
		$carousel = $gameInfo.find($(".carousel")),
 		$pic = $gameInfo.find($(".carousel .picBox .pic")),
 		$btn = $gameInfo.find($(".carousel .btnBox .btn")),
 		$picBox = $gameInfo.find($(".carousel .picBox")),
 		aBanner = new Auto($picBox,$pic,$btn,$picBox);
 	aBanner.exec();
})();
//tab control
(function(){
	var $gameInfo = $("#gameInfo"),
		$tabs = $gameInfo.find($(".tab .tabBox .tabs")),
 		$con = $gameInfo.find($(".tab .content")),
 		$liDom = $gameInfo.find($(".tab .content .list")),
 		$ol = $gameInfo.find($(".tab .content .list .listBox")),
 		count=[0,0,0,0,0],
 		saTab = new Semiauto($con,$liDom,$tabs);
 	saTab.exec();
 	$ol.each(function(i){
 		for(var j=0,len=newData.length;j<len;j++){
 			if(!i || newData[j].typeX == i-1){
 				$ol.eq(i).append($('<li>'+
		    					'<a class="fl" href="javascript:void(0)">'+
		    					newData[j].title
		    					+'</a>'+
		    					'<span class="fr">'+newData[j].time+'</span>'+
	    					'</li>'));
	    		count[i]++;
 				if(count[i] == 5) break;
 			}
 		}
 		
 	})
})();
//shishen tab
(function(){
	var $gameInfo = $("#gameInfo"),
		$a = $gameInfo.find($(".shishen .tabs>a")),
		$btn = $gameInfo.find($(".shishen .content .btn")),
		$picContainer = $gameInfo.find(".shishen .shishenBox .picShowWrap .picContainer"),
		$box = $gameInfo.find($(".content .box"));
	$a.click(function(){
		var index = $(this).index('.shishen .tabs>a');
		$(this).addClass("on").siblings().removeClass("on");
		$box.eq(index).addClass("on").siblings().removeClass("on");
		console.log(index);
	})
	$btn.click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$picContainer.eq(index).addClass("on").siblings().removeClass("on");
	})
})();

//shishen pics generation automatically with shishenData.js from offical website
(function(){
	var $gameInfo = $("#gameInfo"),
		$rUl = $gameInfo.find(".shishen .shishenBox .picShowWrap .picContainer .rUl");
		var count = [[0,null],[0,null],[0,null],[0,null],[0,null]];
		var arr=["SSR","SR","R","N"];
		for(var j=0,length=shishenData.length;j<length;j++){
			var str = shishenData[j].isNew?"<i class='new'></i>":"";
			for(var i=0;i<5;i++){
				if(!i || shishenData[j].level === arr[i-1]){
					count[i][0]++;
					if(count[i][0]%2){
						count[i][1] = $("<ul class='double fl'></ul>");
						$rUl.eq(i).append(count[i][1]);
					}
					var $li = $("<li class='pic'><a href='javascript:void(0)'><span class='mask'></span><span class='textContainer'><em>" +shishenData[j].name+ "</em></span><img src='img/index/content/shishen/" +shishenData[j].id+ ".png'>"+str+"</a></li>");
					var $clone = $li.clone();
					i==0?count[i][1].append($li):count[i][1].append($clone);
				}
			}
		}

})();
//shishen pics previous and next button
(function(){
	var $gameInfo = $("#gameInfo"),
		$prev = $gameInfo.find(".shishen .content .shishenBox .prev"),
		$next = $gameInfo.find(".shishen .content .shishenBox .next"),
		$rUl = $gameInfo.find(".shishen .content .shishenBox .picContainer .rUl"),
		$picContainer = $gameInfo.find(".shishen .content .shishenBox .picShowWrap .picContainer"),
		index = 0,
		width = $picContainer.width()+1;
	$next.each(function(i){
		var num = Math.ceil($picContainer.eq(i).find(".double").length/6);
		index==num-1?$next.eq(i).hide():$next.eq(i).show();
		index==0?$prev.eq(i).hide():$prev.eq(i).show();
		$next.eq(i).click(function(){
			index++;
			index==num-1?$next.eq(i).hide():$next.eq(i).show();
			index==0?$prev.eq(i).hide():$prev.eq(i).show();
			$rUl.eq(i).finish().animate({
				left: -width*index
			},500);
		});
	});
	$prev.each(function(i){
		var num = Math.ceil($picContainer.eq(i).find(".double").length/6);
		index==num-1?$next.eq(i).hide():$next.eq(i).show();
		index==0?$prev.eq(i).hide():$prev.eq(i).show();
		$prev.eq(i).click(function(){
			index--;
			index==num-1?$next.eq(i).hide():$next.eq(i).show();
			index==0?$prev.eq(i).hide():$prev.eq(i).show();
			$rUl.eq(i).finish().animate({
				left: -width*index
			},500);
		});
	});
})();
//role tab
(function(){
	var $gameInfo = $("#gameInfo"),
		$hero = $gameInfo.find($(".shishen .content .rolesBox .roleBtn .hero")),
		$rolePic = $gameInfo.find($(".shishen .content .rolesBox .roleWrap .rolePic")),
		index = 0;
	$hero.click(function(){
		index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$rolePic.eq(index).addClass("on").siblings().removeClass("on");
	})
})();
// strategy part
(function(){
	var $strategy = $("#strategy"),
		$btn = $strategy.find(".btnBox span"),
		$imgBox = $strategy.find(".imgBox"),
		$img = $strategy.find(".imgBox a"),
		$tabs = $strategy.find(".right .topbar .tabs"),
		$ul = $strategy.find(".right .content .container ul"),
		$container = $strategy.find(".right .content .container"),
		aTab = new Auto($imgBox,$img,$btn,$imgBox),
		saTab = new Semiauto($container,$ul,$tabs),
		arr = ["新手","式神","斗技","玩法","御魄","高阶"],
		count=[0,0,0,0,0];
	aTab.exec();
	saTab.exec();
	$ul.each(function(i){
		for(var j=0,len=strategyData.length;j<len;j++){
			var data = strategyData[j].type;
			if(!i || new RegExp(i-1).test(data)){
				var length = data.length;
				var num = parseInt(data[length-1]);
				var name = !i?arr[num]:arr[i-1];
				$(this).append("<li class='fl'><a href='javascript:void(0)''><p>【"+name+"】"+strategyData[j].title+" </p><em>作者："+strategyData[j].author+"</em></a></li>");
				count[i]++;
				if(count[i] == 10) break;
			}
		}
	})
})();

//division tab control
(function(){
	var $division = $("#division"),
		$tabs = $division.find($(".topbar .wrap li")),
		$picBox = $division.find($(".content .picBox")),
		$ul = $division.find($(".content .picBox ul")),
		saTab = new Semiauto($picBox,$ul,$tabs);
	saTab.exec();
	$ul.each(function(i){
		for(var j=0,len=divisionData.length;j<len;j++){
			if(divisionData[j].type == i){
				$ul.eq(i).append('<li class="fl">'+
			    					'<a href="javascript:void(0)">'+
			    						'<img src='+divisionData[j].url+'>'+
			    						'<span><i></i></span>'+
			    					'</a>'+
			    					'<p>'+divisionData[j].title+'</p>'+
			    				'</li>');
			}
		}
	})
})();
//click to come back to the top
(function(){
	var $contact = $("#contact"),
		$goTop = $contact.find($(".goTop"));
	$goTop.click(function(){
		$("body,html").animate({
			scrollTop: 0	
		},1000);
	})
})();

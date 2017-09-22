window.onload = function(){
	// 顶部通栏
	hearder();
	// 倒计时
	lastTime();
	//轮播图
	banner();

};

function hearder(){
	var jd_header = document.querySelector(".jd_header");
	var jd_nav = document.querySelector(".jd_nav");
	var maxDistance = jd_nav.offsetTop + jd_nav.offsetHeight;

	window.onscroll = function(){
		 var scrollHeight = window.document.body.scrollTop;

		 var percentage = scrollHeight / maxDistance;
		 percentage = percentage > 1 ? 1 :percentage;
		 console.log(percentage);
		 jd_header.style.backgroundColor = "rgba(201,21,35,"+percentage+")";
	};
}

function lastTime(){
	var totalHour = 5;
	var totalSec = totalHour * 60 * 60;
	var Tli = document.querySelectorAll(".main_content:nth-child(1) .content_top li");

	var timeA = setInterval(function(){
			if(totalSec <= 0){
				clearInterval(timeA);
				return;
			}

			totalSec--;
			var h = Math.floor(totalSec / 3600);
			var m = Math.floor(totalSec %3600 /60);
			var s = totalSec %60;

			Tli[0].innerHTML = Math.floor(h/10);
			Tli[1].innerHTML = h%10;
			Tli[3].innerHTML = Math.floor(m/10);
			Tli[4].innerHTML = m%10;
			Tli[6].innerHTML = Math.floor(s/10);
			Tli[7].innerHTML = s%10;

		},1000);

}
function banner(){
		var width = document.body.offsetWidth;
		
		var ul = document.querySelector(".banner_images");
		var indexLi = document.querySelectorAll(".banner_index li");
		var index = 1;
		var timeB = setInterval(function(){
			index++;
			ul.style.transition = "all 0.5s";
			ul.style.transform = "translateX("+(-index*width)+"px)";
		},2300);

		ul.addEventListener("webkitTransitionEnd",function(){
			if(index > 8 ){
				index = 1;
			}else if(index < 1){
				index = 8;
			}
			ul.style.transition = "";
			ul.style.transform = "translateX("+(-index*width)+"px)";
			for(var i = 0 ; i < indexLi.length ; i++){
				indexLi[i].classList.remove("current");
			}
			indexLi[index-1].classList.add("current");
		});

		var startX = 0;
		var moveX = 0;
		ul.addEventListener("touchstart",function(e){
				clearInterval(timeB);
				ul.style.transition = '';
				startX = e.touches[0].clientX;
		});
		ul.addEventListener("touchmove",function(e){
			moveX = e.touches[0].clientX - startX;
			ul.style.transform = "translateX("+(moveX-index*width)+"px)";
		});
		ul.addEventListener("touchend",function(){
			var distance = width/3;
			if(Math.abs(moveX) > distance){
				if(moveX > 0){
					index--;
				}else{
					index++;
				}
				ul.style.transition = "all 0.5s";
				ul.style.transform = "translateX("+(-index*width)+"px)";
			}else{
				ul.style.transition = "all 0.5s";
				ul.style.transform = "translateX("+(-index*width)+"px)";
			}
			//注意别加var
			timeB = setInterval(function(){
				index++;
				ul.style.transition = "all 0.5s";
				ul.style.transform = "translateX("+(-index*width)+"px)";
			},2300);

		});
}
